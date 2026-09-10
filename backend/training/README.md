# Model Training Pipeline

## Overview

This directory contains the complete, reproducible training pipeline for the three risk prediction models:
- Cost Risk Model
- Time Risk Model
- Execution Risk Model

## Current Status

⚠️ **TRAINING DATA REQUIRED**

The current database contains only **5 demo projects** with no ground-truth labels for supervised learning.

### What's Missing

To train production-grade ML models, you need:

1. **Historical Projects with Outcomes** (minimum 500-1000 projects)
   - Completed or significantly progressed projects
   - Known final cost vs. sanctioned cost
   - Known final completion date vs. expected date
   - Documented execution challenges

2. **Ground Truth Labels**
   - **Cost Risk Label**: Did the project exceed budget by >10%, >25%, >50%?
   - **Time Risk Label**: Was the project delayed by >3 months, >6 months, >12 months?
   - **Execution Risk Label**: Were there major execution issues, contractor changes, quality problems?

3. **Sufficient Features**
   - Project metadata at the time of assessment
   - Historical progress and expenditure trends
   - Environmental/contextual factors

### Training Data Requirements

```python
Minimum Dataset Size:
- Total projects: 1000+
- Projects per risk class:
  - LOW: 400+ examples
  - MEDIUM: 300+ examples  
  - HIGH: 200+ examples
  - CRITICAL: 100+ examples

Feature Quality:
- < 20% missing values per feature
- Sufficient variance across classes
- No data leakage (future info in past assessments)
```

## Pipeline Structure

```
training/
├── README.md                      # This file
├── datasets/                      # Training datasets
│   ├── .gitignore                # Ignore actual data files
│   └── README.md                 # Dataset documentation
├── generate_training_data.py     # Export DB → labeled dataset
├── generate_features.py          # Feature engineering
├── train_cost_model.py          # Cost risk model training
├── train_time_model.py          # Time risk model training
├── train_execution_model.py     # Execution risk model training
├── evaluate_models.py           # Model evaluation
└── train_all_models.py          # Complete pipeline orchestration
```

## Usage

### Step 1: Generate Training Dataset

```bash
# Export labeled data from database
python training/generate_training_data.py \
  --output datasets/projects_v1.0.0.csv \
  --validate

# This will fail if insufficient labeled data
```

### Step 2: Generate Features

```bash
# Extract and validate features
python training/generate_features.py \
  --input datasets/projects_v1.0.0.csv \
  --output datasets/features_v1.0.0.csv \
  --validate
```

### Step 3: Train Individual Models

```bash
# Train cost risk model
python training/train_cost_model.py \
  --data datasets/features_v1.0.0.csv \
  --output ../models/cost_risk_model.pkl \
  --seed 42

# Train time risk model
python training/train_time_model.py \
  --data datasets/features_v1.0.0.csv \
  --output ../models/time_risk_model.pkl \
  --seed 42

# Train execution risk model
python training/train_execution_model.py \
  --data datasets/features_v1.0.0.csv \
  --output ../models/execution_risk_model.pkl \
  --seed 42
```

### Step 4: Evaluate Models

```bash
# Comprehensive evaluation
python training/evaluate_models.py \
  --models ../models/ \
  --test-data datasets/features_v1.0.0_test.csv \
  --output evaluation_report.json
```

### Or: Run Complete Pipeline

```bash
# Train all models end-to-end
python training/train_all_models.py \
  --seed 42 \
  --validate \
  --output-dir ../models/
```

## Model Artifacts

Each trained model produces:

```
models/
├── cost_risk_model.pkl           # Trained XGBoost model + preprocessor
├── cost_risk_metadata.json       # Training metadata
├── time_risk_model.pkl
├── time_risk_metadata.json
├── execution_risk_model.pkl
└── execution_risk_metadata.json
```

### Metadata Format

```json
{
  "model_type": "cost_risk",
  "version": "1.0.0",
  "framework": "xgboost",
  "framework_version": "2.0.3",
  "trained_at": "2026-09-09T12:00:00Z",
  "training_duration_seconds": 45.2,
  "dataset": {
    "version": "v1.0.0",
    "total_samples": 1500,
    "train_samples": 1050,
    "val_samples": 225,
    "test_samples": 225,
    "class_distribution": {
      "LOW": 450,
      "MEDIUM": 525,
      "HIGH": 375,
      "CRITICAL": 150
    }
  },
  "features": {
    "version": "v1.0.0",
    "numerical": 8,
    "categorical": 4,
    "total": 12
  },
  "hyperparameters": {
    "max_depth": 6,
    "learning_rate": 0.1,
    "n_estimators": 100,
    "objective": "multi:softprob",
    "num_class": 4
  },
  "metrics": {
    "test_accuracy": 0.82,
    "test_f1_macro": 0.79,
    "test_roc_auc": 0.88,
    "test_pr_auc": 0.85,
    "per_class": {
      "LOW": {"precision": 0.85, "recall": 0.88, "f1": 0.86},
      "MEDIUM": {"precision": 0.80, "recall": 0.82, "f1": 0.81},
      "HIGH": {"precision": 0.78, "recall": 0.75, "f1": 0.76},
      "CRITICAL": {"precision": 0.72, "recall": 0.68, "f1": 0.70}
    }
  },
  "feature_importance": {
    "cost_overrun_pct": 0.25,
    "expenditure_ratio": 0.18,
    "progress_gap": 0.15,
    "..."
  },
  "random_seed": 42,
  "python_version": "3.13.14"
}
```

## Data Leakage Prevention

✅ **Temporal Separation**: Test data is from time periods after training data  
✅ **No Future Information**: Features use only data available at prediction time  
✅ **No Label Leakage**: Target variable not used in feature engineering  
✅ **Proper Splitting**: Stratified split before any preprocessing  
✅ **Preprocessing on Train**: Fit encoders/imputers only on training data

## Reproducibility

All scripts use:
- Fixed random seeds (`--seed 42`)
- Versioned datasets (`v1.0.0`)
- Versioned features (`v1.0.0`)
- Saved preprocessing artifacts
- Pinned dependencies (see requirements.txt)

## Next Steps

1. **Collect Real Data**: Import historical project data with outcomes
2. **Label Data**: Create ground truth labels for cost/time/execution risk
3. **Validate Data**: Run `generate_training_data.py --validate`
4. **Train Models**: Run `train_all_models.py`
5. **Deploy Models**: Copy `.pkl` files to `models/` directory
6. **Monitor Performance**: Track prediction accuracy over time

## Limitations

⚠️ **Current Implementation**: Uses deterministic fallback rules  
✅ **After Training**: Will use ML models for predictions  
📊 **Minimum Data**: Requires 1000+ labeled projects for production quality  
🔄 **Retraining**: Recommended every 3-6 months with new data
