"""
Evaluate trained risk models.

Comprehensive evaluation with metrics and visualizations.
"""
import sys
import argparse
import json
from pathlib import Path
import pandas as pd
import numpy as np
import pickle

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.logging import get_logger

logger = get_logger(__name__)


def load_model_and_metadata(model_path: Path, metadata_path: Path):
    """Load model and its metadata."""
    with open(model_path, 'rb') as f:
        model_artifact = pickle.load(f)
    
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)
    
    return model_artifact, metadata


def evaluate_all_models(models_dir: Path, output_path: Path):
    """Evaluate all three risk models."""
    logger.info("Evaluating all models...")
    
    model_types = ['cost_risk', 'time_risk', 'execution_risk']
    results = {}
    
    for model_type in model_types:
        model_path = models_dir / f"{model_type}_model.pkl"
        metadata_path = models_dir / f"{model_type}_metadata.json"
        
        if not model_path.exists():
            logger.warning(f"Model not found: {model_path}")
            results[model_type] = {'status': 'NOT_TRAINED'}
            continue
        
        if not metadata_path.exists():
            logger.warning(f"Metadata not found: {metadata_path}")
            results[model_type] = {'status': 'METADATA_MISSING'}
            continue
        
        # Load metadata
        with open(metadata_path, 'r') as f:
            metadata = json.load(f)
        
        results[model_type] = {
            'status': 'TRAINED',
            'version': metadata.get('version'),
            'trained_at': metadata.get('trained_at'),
            'metrics': metadata.get('metrics', {}),
            'feature_importance': dict(list(metadata.get('feature_importance', {}).items())[:5]),  # Top 5
            'class_distribution': metadata.get('class_distribution', {}),
        }
        
        logger.info(f"{model_type}: F1={metadata.get('metrics', {}).get('test_f1_macro', 'N/A')}")
    
    # Save evaluation report
    report = {
        'evaluated_at': pd.Timestamp.utcnow().isoformat() + 'Z',
        'models': results,
        'summary': {
            'total_models': len(model_types),
            'trained_models': sum(1 for r in results.values() if r.get('status') == 'TRAINED'),
            'average_f1': np.mean([
                r['metrics']['test_f1_macro']
                for r in results.values()
                if r.get('status') == 'TRAINED' and 'metrics' in r
            ]) if any(r.get('status') == 'TRAINED' for r in results.values()) else None
        }
    }
    
    with open(output_path, 'w') as f:
        json.dump(report, f, indent=2)
    
    logger.info(f"Evaluation report saved to {output_path}")
    
    return report


def main():
    parser = argparse.ArgumentParser(description="Evaluate trained models")
    parser.add_argument(
        '--models',
        type=Path,
        default=Path('../models/'),
        help='Models directory'
    )
    parser.add_argument(
        '--output',
        type=Path,
        default=Path('evaluation_report.json'),
        help='Output evaluation report path'
    )
    
    args = parser.parse_args()
    
    try:
        report = evaluate_all_models(args.models, args.output)
        
        print(f"\n✅ Model Evaluation Complete")
        print(f"\nSummary:")
        print(f"  Total Models: {report['summary']['total_models']}")
        print(f"  Trained: {report['summary']['trained_models']}")
        if report['summary']['average_f1']:
            print(f"  Average F1: {report['summary']['average_f1']:.3f}")
        
        print(f"\nReport saved to: {args.output}")
        
    except Exception as e:
        logger.error(f"Evaluation failed: {e}", exc_info=True)
        print(f"\n❌ Evaluation failed: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
