"""
Train Time Risk Model using XGBoost.

Predicts likelihood of schedule delays based on project features.
"""
import sys
import argparse
import json
from pathlib import Path
from datetime import datetime
import time
import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import (
    classification_report, confusion_matrix,
    precision_recall_fscore_support, roc_auc_score,
    average_precision_score, log_loss
)
import xgboost as xgb

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.logging import get_logger

logger = get_logger(__name__)


class TimeRiskModelTrainer:
    """Train and evaluate time risk prediction model."""
    
    LABEL_COL = 'time_risk_label'
    CLASS_NAMES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    
    def __init__(self, random_seed: int = 42):
        self.random_seed = random_seed
        self.model = None
        self.preprocessor = None
        self.feature_cols = None
        self.metadata = {}
        
        np.random.seed(random_seed)
    
    def load_data(self, data_path: Path, preprocessor_path: Path):
        """Load features and preprocessor."""
        logger.info(f"Loading data from {data_path}...")
        df = pd.read_csv(data_path)
        
        # Check for labels
        if self.LABEL_COL not in df.columns:
            raise ValueError(f"Missing label column: {self.LABEL_COL}")
        
        # Remove rows with missing labels
        df_labeled = df[df[self.LABEL_COL].notna()].copy()
        
        if len(df_labeled) == 0:
            raise ValueError(f"No labeled data found for {self.LABEL_COL}")
        
        logger.info(f"Found {len(df_labeled)} labeled samples")
        
        # Load preprocessor
        with open(preprocessor_path, 'rb') as f:
            self.preprocessor = pickle.load(f)
        
        self.feature_cols = self.preprocessor.get_feature_names()
        
        return df_labeled
    
    def prepare_splits(self, df: pd.DataFrame, test_size: float = 0.15, val_size: float = 0.15):
        """Split data into train/val/test sets."""
        logger.info("Splitting data...")
        
        # Get features and labels
        X = df[self.feature_cols].values
        y = df[self.LABEL_COL].values
        
        # Convert labels to numeric
        label_map = {name: idx for idx, name in enumerate(self.CLASS_NAMES)}
        y_numeric = np.array([label_map[label] for label in y])
        
        # Train + val / test split
        X_temp, X_test, y_temp, y_test = train_test_split(
            X, y_numeric,
            test_size=test_size,
            stratify=y_numeric,
            random_state=self.random_seed
        )
        
        # Train / val split
        val_size_adjusted = val_size / (1 - test_size)
        X_train, X_val, y_train, y_val = train_test_split(
            X_temp, y_temp,
            test_size=val_size_adjusted,
            stratify=y_temp,
            random_state=self.random_seed
        )
        
        logger.info(
            f"Split: Train={len(X_train)}, Val={len(X_val)}, Test={len(X_test)}"
        )
        
        # Store class distribution
        self.metadata['class_distribution'] = {
            self.CLASS_NAMES[i]: int((y_numeric == i).sum())
            for i in range(len(self.CLASS_NAMES))
        }
        
        return X_train, X_val, X_test, y_train, y_val, y_test
    
    def train(self, X_train, y_train, X_val, y_val):
        """Train XGBoost model."""
        logger.info("Training XGBoost time risk model...")
        
        start_time = time.time()
        
        # Hyperparameters
        params = {
            'objective': 'multi:softprob',
            'num_class': len(self.CLASS_NAMES),
            'max_depth': 6,
            'learning_rate': 0.1,
            'n_estimators': 100,
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'random_state': self.random_seed,
            'eval_metric': 'mlogloss',
        }
        
        # Train model
        self.model = xgb.XGBClassifier(**params)
        
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_val, y_val)],
            verbose=False
        )
        
        training_duration = time.time() - start_time
        
        logger.info(f"Training completed in {training_duration:.1f}s")
        
        # Store metadata
        self.metadata['hyperparameters'] = params
        self.metadata['training_duration_seconds'] = round(training_duration, 2)
        
        return self.model
    
    def evaluate(self, X_test, y_test):
        """Evaluate model on test set."""
        logger.info("Evaluating model...")
        
        # Predictions
        y_pred = self.model.predict(X_test)
        y_pred_proba = self.model.predict_proba(X_test)
        
        # Metrics
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_test, y_pred, average='macro', zero_division=0
        )
        
        # Multi-class ROC-AUC (one-vs-rest)
        try:
            roc_auc = roc_auc_score(y_test, y_pred_proba, multi_class='ovr', average='macro')
        except:
            roc_auc = None
        
        # PR-AUC (per-class average)
        try:
            pr_auc_scores = []
            for i in range(len(self.CLASS_NAMES)):
                y_true_binary = (y_test == i).astype(int)
                pr_auc = average_precision_score(y_true_binary, y_pred_proba[:, i])
                pr_auc_scores.append(pr_auc)
            pr_auc = np.mean(pr_auc_scores)
        except:
            pr_auc = None
        
        # Accuracy
        accuracy = (y_pred == y_test).mean()
        
        # Log loss (calibration)
        logloss = log_loss(y_test, y_pred_proba)
        
        # Per-class metrics
        per_class_metrics = {}
        for i, class_name in enumerate(self.CLASS_NAMES):
            mask = y_test == i
            if mask.sum() > 0:
                class_precision = (y_pred[mask] == i).mean()
                class_recall = (y_pred == i).sum() / mask.sum() if mask.sum() > 0 else 0
                class_f1 = 2 * (class_precision * class_recall) / (class_precision + class_recall) if (class_precision + class_recall) > 0 else 0
                
                per_class_metrics[class_name] = {
                    'precision': round(float(class_precision), 4),
                    'recall': round(float(class_recall), 4),
                    'f1': round(float(class_f1), 4),
                    'support': int(mask.sum())
                }
        
        # Feature importance
        feature_importance = dict(zip(
            self.feature_cols,
            [round(float(x), 4) for x in self.model.feature_importances_]
        ))
        
        # Sort by importance
        feature_importance = dict(
            sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
        )
        
        metrics = {
            'test_accuracy': round(float(accuracy), 4),
            'test_precision_macro': round(float(precision), 4),
            'test_recall_macro': round(float(recall), 4),
            'test_f1_macro': round(float(f1), 4),
            'test_roc_auc': round(float(roc_auc), 4) if roc_auc else None,
            'test_pr_auc': round(float(pr_auc), 4) if pr_auc else None,
            'test_log_loss': round(float(logloss), 4),
            'per_class': per_class_metrics
        }
        
        self.metadata['metrics'] = metrics
        self.metadata['feature_importance'] = feature_importance
        
        logger.info(f"Test Accuracy: {accuracy:.3f}")
        logger.info(f"Test F1 (macro): {f1:.3f}")
        logger.info(f"Test ROC-AUC: {roc_auc:.3f}" if roc_auc else "Test ROC-AUC: N/A")
        
        return metrics
    
    def save_model(self, output_path: Path, metadata_path: Path):
        """Save trained model and metadata."""
        logger.info(f"Saving model to {output_path}...")
        
        # Prepare model artifact
        model_artifact = {
            'model': self.model,
            'feature_engineering': self.preprocessor,
            'metadata': {
                'version': '1.0.0',
                'model_type': 'time_risk',
                'framework': 'xgboost',
                'framework_version': xgb.__version__,
                'trained_at': datetime.utcnow().isoformat() + 'Z',
                'random_seed': self.random_seed,
                'python_version': sys.version.split()[0],
            }
        }
        
        # Save model
        with open(output_path, 'wb') as f:
            pickle.dump(model_artifact, f)
        
        # Save metadata
        full_metadata = {
            **model_artifact['metadata'],
            **self.metadata
        }
        
        with open(metadata_path, 'w') as f:
            json.dump(full_metadata, f, indent=2)
        
        logger.info(f"Model saved successfully")
        logger.info(f"Metadata saved to {metadata_path}")


def main():
    parser = argparse.ArgumentParser(description="Train time risk model")
    parser.add_argument(
        '--data',
        type=Path,
        required=True,
        help='Input features CSV'
    )
    parser.add_argument(
        '--preprocessor',
        type=Path,
        default=Path('datasets/preprocessor_v1.0.0.pkl'),
        help='Fitted preprocessor path'
    )
    parser.add_argument(
        '--output',
        type=Path,
        default=Path('../models/time_risk_model.pkl'),
        help='Output model path'
    )
    parser.add_argument(
        '--metadata',
        type=Path,
        default=Path('../models/time_risk_metadata.json'),
        help='Output metadata path'
    )
    parser.add_argument(
        '--seed',
        type=int,
        default=42,
        help='Random seed for reproducibility'
    )
    
    args = parser.parse_args()
    
    try:
        trainer = TimeRiskModelTrainer(random_seed=args.seed)
        
        # Load data
        df = trainer.load_data(args.data, args.preprocessor)
        
        # Prepare splits
        X_train, X_val, X_test, y_train, y_val, y_test = trainer.prepare_splits(df)
        
        # Train
        trainer.train(X_train, y_train, X_val, y_val)
        
        # Evaluate
        metrics = trainer.evaluate(X_test, y_test)
        
        # Save
        trainer.save_model(args.output, args.metadata)
        
        print(f"\n✅ Time Risk Model trained successfully!")
        print(f"\nTest Metrics:")
        print(f"  Accuracy: {metrics['test_accuracy']:.3f}")
        print(f"  F1 (macro): {metrics['test_f1_macro']:.3f}")
        print(f"  ROC-AUC: {metrics['test_roc_auc']:.3f}" if metrics['test_roc_auc'] else "  ROC-AUC: N/A")
        print(f"\nModel saved to: {args.output}")
        
    except Exception as e:
        logger.error(f"Training failed: {e}", exc_info=True)
        print(f"\n❌ Training failed: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
