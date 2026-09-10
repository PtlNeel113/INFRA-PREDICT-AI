"""
Generate engineered features from raw project data.

Applies the FeatureEngineering pipeline and saves features for training.
"""
import sys
import argparse
from pathlib import Path
import pandas as pd
import pickle

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.ml.features import FeatureEngineering
from app.core.logging import get_logger

logger = get_logger(__name__)


def generate_features(
    input_path: Path,
    output_path: Path,
    preprocessor_path: Path,
    validate: bool = True,
):
    """
    Generate features from raw project data.
    
    Args:
        input_path: Path to raw projects CSV
        output_path: Path to save features CSV
        preprocessor_path: Path to save fitted preprocessor
        validate: Whether to validate features
    """
    logger.info(f"Loading raw data from {input_path}...")
    df = pd.read_csv(input_path)
    
    # Parse dates
    date_cols = ['start_date', 'expected_completion', 'reported_date', 'created_at']
    for col in date_cols:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')
    
    logger.info(f"Loaded {len(df)} projects")
    
    # Initialize feature engineering
    fe = FeatureEngineering()
    
    # Extract and validate features
    logger.info("Extracting features...")
    features = fe.extract_features(df)
    
    if validate:
        logger.info("Validating extracted features...")
        fe.validate_extracted_features(features)
    
    # Fit and transform
    logger.info("Fitting preprocessor and transforming features...")
    processed = fe.fit_transform(features)
    
    if validate:
        logger.info("Validating processed features...")
        fe.validate_processed_features(processed)
    
    # Add labels back
    label_cols = ['cost_risk_label', 'time_risk_label', 'execution_risk_label']
    for col in label_cols:
        if col in df.columns:
            processed[col] = df[col].values
    
    # Save features
    output_path.parent.mkdir(parents=True, exist_ok=True)
    processed.to_csv(output_path, index=False)
    logger.info(f"Saved features to {output_path}")
    
    # Save preprocessor
    preprocessor_path.parent.mkdir(parents=True, exist_ok=True)
    with open(preprocessor_path, 'wb') as f:
        pickle.dump(fe, f)
    logger.info(f"Saved preprocessor to {preprocessor_path}")
    
    # Print feature summary
    feature_cols = fe.get_feature_names()
    numerical_features = [f for f in feature_cols if f not in [
        'sector', 'state', 'implementing_agency', 'ministry'
    ]]
    categorical_features = [f for f in feature_cols if f not in numerical_features]
    
    print(f"\n✅ Generated {len(feature_cols)} features")
    print(f"   Numerical: {len(numerical_features)}")
    print(f"   Categorical: {len(categorical_features)}")
    print(f"\nFeatures saved to: {output_path}")
    print(f"Preprocessor saved to: {preprocessor_path}")
    
    return processed


def main():
    parser = argparse.ArgumentParser(description="Generate training features")
    parser.add_argument(
        '--input',
        type=Path,
        required=True,
        help='Input raw projects CSV'
    )
    parser.add_argument(
        '--output',
        type=Path,
        default=None,
        help='Output features CSV (default: <input>_features.csv)'
    )
    parser.add_argument(
        '--preprocessor',
        type=Path,
        default=None,
        help='Output preprocessor path (default: datasets/preprocessor_v1.0.0.pkl)'
    )
    parser.add_argument(
        '--validate',
        action='store_true',
        help='Validate feature quality'
    )
    
    args = parser.parse_args()
    
    # Set defaults
    if args.output is None:
        args.output = args.input.parent / f"{args.input.stem}_features.csv"
    
    if args.preprocessor is None:
        args.preprocessor = Path('datasets/preprocessor_v1.0.0.pkl')
    
    try:
        generate_features(
            args.input,
            args.output,
            args.preprocessor,
            args.validate
        )
    except Exception as e:
        logger.error(f"Failed to generate features: {e}", exc_info=True)
        print(f"\n❌ Failed: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
