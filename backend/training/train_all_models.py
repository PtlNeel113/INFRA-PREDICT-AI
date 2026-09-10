"""
Complete end-to-end training pipeline orchestrator.

Runs all steps: data export → feature generation → model training → evaluation
"""
import sys
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.logging import get_logger

logger = get_logger(__name__)


def run_command(cmd, description):
    """Run a command and check for errors."""
    logger.info(f"Running: {description}...")
    print(f"\n{'='*60}")
    print(f"{description}")
    print(f"{'='*60}\n")
    
    result = subprocess.run(cmd, shell=True)
    
    if result.returncode != 0:
        raise RuntimeError(f"{description} failed with exit code {result.returncode}")
    
    logger.info(f"✅ {description} completed successfully")


def main():
    parser = argparse.ArgumentParser(description="Train all risk models end-to-end")
    parser.add_argument(
        '--seed',
        type=int,
        default=42,
        help='Random seed for reproducibility'
    )
    parser.add_argument(
        '--validate',
        action='store_true',
        help='Validate data and features'
    )
    parser.add_argument(
        '--output-dir',
        type=Path,
        default=Path('../models/'),
        help='Output directory for models'
    )
    parser.add_argument(
        '--skip-data-generation',
        action='store_true',
        help='Skip data and feature generation (use existing)'
    )
    
    args = parser.parse_args()
    
    try:
        start_time = datetime.utcnow()
        
        print(f"\n🚀 Starting Complete Training Pipeline")
        print(f"   Seed: {args.seed}")
        print(f"   Validation: {args.validate}")
        print(f"   Output: {args.output_dir}")
        
        # Step 1: Generate training data
        if not args.skip_data_generation:
            run_command(
                f"python generate_training_data.py --output datasets/projects_v1.0.0.csv"
                + (" --validate" if args.validate else ""),
                "Step 1: Generate Training Data"
            )
            
            # Step 2: Generate features
            run_command(
                f"python generate_features.py --input datasets/projects_v1.0.0.csv"
                + (" --validate" if args.validate else ""),
                "Step 2: Generate Features"
            )
        else:
            print("\n⏭️  Skipping data and feature generation (using existing)")
        
        # Step 3: Train cost risk model
        run_command(
            f"python train_cost_model.py --data datasets/projects_v1.0.0_features.csv"
            f" --output {args.output_dir}/cost_risk_model.pkl"
            f" --metadata {args.output_dir}/cost_risk_metadata.json"
            f" --seed {args.seed}",
            "Step 3: Train Cost Risk Model"
        )
        
        # Step 4: Train time risk model
        run_command(
            f"python train_time_model.py --data datasets/projects_v1.0.0_features.csv"
            f" --output {args.output_dir}/time_risk_model.pkl"
            f" --metadata {args.output_dir}/time_risk_metadata.json"
            f" --seed {args.seed}",
            "Step 4: Train Time Risk Model"
        )
        
        # Step 5: Train execution risk model
        run_command(
            f"python train_execution_model.py --data datasets/projects_v1.0.0_features.csv"
            f" --output {args.output_dir}/execution_risk_model.pkl"
            f" --metadata {args.output_dir}/execution_risk_metadata.json"
            f" --seed {args.seed}",
            "Step 5: Train Execution Risk Model"
        )
        
        # Step 6: Evaluate models
        run_command(
            f"python evaluate_models.py --models {args.output_dir}"
            " --output evaluation_report.json",
            "Step 6: Evaluate All Models"
        )
        
        end_time = datetime.utcnow()
        duration = (end_time - start_time).total_seconds()
        
        print(f"\n{'='*60}")
        print(f"🎉 Training Pipeline Complete!")
        print(f"{'='*60}")
        print(f"\nDuration: {duration:.1f} seconds")
        print(f"Models saved to: {args.output_dir}")
        print(f"Evaluation report: evaluation_report.json")
        print(f"\nNext steps:")
        print(f"  1. Review evaluation_report.json")
        print(f"  2. Copy models to ../models/ directory")
        print(f"  3. Restart the application")
        print(f"  4. Models will automatically be used for predictions")
        
    except RuntimeError as e:
        print(f"\n❌ Pipeline failed: {e}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
