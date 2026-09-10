"""
Generate training dataset from database.

Exports projects with ground truth labels for supervised learning.
"""
import sys
import argparse
from pathlib import Path
from datetime import datetime
import pandas as pd
from sqlalchemy.orm import Session

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.db.session import SessionLocal
from app.db.models import Project, ProjectUpdate, RiskScore
from app.core.logging import get_logger

logger = get_logger(__name__)


class TrainingDataGenerator:
    """Generate labeled training data from database."""
    
    MIN_PROJECTS = 100
    MIN_PER_CLASS = 20
    MAX_MISSING_RATE = 0.3
    
    def __init__(self, db: Session):
        self.db = db
    
    def export_projects(self, output_path: Path, validate: bool = True) -> pd.DataFrame:
        """
        Export projects with labels.
        
        Args:
            output_path: Path to save CSV
            validate: Whether to validate dataset quality
        
        Returns:
            DataFrame with projects and labels
        """
        logger.info("Exporting training data from database...")
        
        # Query all projects with latest updates
        projects = self.db.query(Project).filter(Project.is_active == True).all()
        
        if len(projects) < self.MIN_PROJECTS:
            raise ValueError(
                f"Insufficient data: Found {len(projects)} projects, "
                f"need at least {self.MIN_PROJECTS} for training."
            )
        
        # Build dataset
        data = []
        for project in projects:
            # Get latest update
            latest_update = self.db.query(ProjectUpdate).filter(
                ProjectUpdate.project_id == project.id
            ).order_by(ProjectUpdate.reported_date.desc()).first()
            
            if not latest_update:
                continue
            
            # Get risk labels (if available)
            risk_score = self.db.query(RiskScore).filter(
                RiskScore.project_id == project.id
            ).order_by(RiskScore.scored_at.desc()).first()
            
            row = {
                'code': project.code,
                'name': project.name,
                'sector': project.sector,
                'state': project.state,
                'ministry': project.ministry,
                'implementing_agency': project.implementing_agency,
                'sanctioned_cost_cr': project.sanctioned_cost_cr,
                'start_date': project.start_date,
                'expected_completion': project.expected_completion,
                'expenditure_cr': latest_update.expenditure_cr,
                'physical_progress': latest_update.physical_progress,
                'expected_progress': latest_update.expected_progress,
                'reported_date': latest_update.reported_date,
                'created_at': project.created_at,
            }
            
            # Add labels if available
            # NOTE: These need to be actual ground truth, not predicted values
            if risk_score:
                row['cost_risk_label'] = None  # PLACEHOLDER - needs real labels
                row['time_risk_label'] = None  # PLACEHOLDER - needs real labels
                row['execution_risk_label'] = None  # PLACEHOLDER - needs real labels
            else:
                row['cost_risk_label'] = None
                row['time_risk_label'] = None
                row['execution_risk_label'] = None
            
            data.append(row)
        
        df = pd.DataFrame(data)
        
        # Check for labels
        has_cost_labels = df['cost_risk_label'].notna().sum()
        has_time_labels = df['time_risk_label'].notna().sum()
        has_execution_labels = df['execution_risk_label'].notna().sum()
        
        logger.info(
            f"Exported {len(df)} projects",
            extra={
                'cost_labels': has_cost_labels,
                'time_labels': has_time_labels,
                'execution_labels': has_execution_labels,
            }
        )
        
        # Validate if requested
        if validate:
            self._validate_dataset(df)
        
        # Save
        output_path.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(output_path, index=False)
        logger.info(f"Saved training data to {output_path}")
        
        return df
    
    def _validate_dataset(self, df: pd.DataFrame):
        """Validate dataset quality."""
        logger.info("Validating dataset quality...")
        
        issues = []
        
        # Check size
        if len(df) < self.MIN_PROJECTS:
            issues.append(f"Only {len(df)} projects, need {self.MIN_PROJECTS}+")
        
        # Check for labels
        label_cols = ['cost_risk_label', 'time_risk_label', 'execution_risk_label']
        for col in label_cols:
            labeled = df[col].notna().sum()
            if labeled == 0:
                issues.append(f"No labels for {col}")
            elif labeled < self.MIN_PROJECTS:
                issues.append(f"Only {labeled} labels for {col}, need {self.MIN_PROJECTS}+")
            
            # Check class distribution
            if labeled > 0:
                class_counts = df[col].value_counts()
                for cls, count in class_counts.items():
                    if count < self.MIN_PER_CLASS:
                        issues.append(
                            f"{col} class '{cls}' has only {count} examples, "
                            f"need {self.MIN_PER_CLASS}+"
                        )
        
        # Check missing values
        feature_cols = [
            'sanctioned_cost_cr', 'expenditure_cr',
            'physical_progress', 'expected_progress'
        ]
        for col in feature_cols:
            missing_rate = df[col].isna().sum() / len(df)
            if missing_rate > self.MAX_MISSING_RATE:
                issues.append(
                    f"{col} has {missing_rate:.1%} missing values, "
                    f"max allowed {self.MAX_MISSING_RATE:.1%}"
                )
        
        # Check duplicates
        if df['code'].duplicated().any():
            issues.append(f"Found {df['code'].duplicated().sum()} duplicate project codes")
        
        if issues:
            error_msg = "Dataset validation FAILED:\n" + "\n".join(f"  - {issue}" for issue in issues)
            logger.error(error_msg)
            raise ValueError(error_msg)
        
        logger.info("✅ Dataset validation PASSED")


def main():
    parser = argparse.ArgumentParser(description="Generate training dataset")
    parser.add_argument(
        '--output',
        type=Path,
        default=Path('datasets/projects_v1.0.0.csv'),
        help='Output CSV path'
    )
    parser.add_argument(
        '--validate',
        action='store_true',
        help='Validate dataset quality'
    )
    parser.add_argument(
        '--min-projects',
        type=int,
        default=100,
        help='Minimum number of projects required'
    )
    
    args = parser.parse_args()
    
    # Update minimum if specified
    TrainingDataGenerator.MIN_PROJECTS = args.min_projects
    
    # Generate dataset
    db = SessionLocal()
    try:
        generator = TrainingDataGenerator(db)
        df = generator.export_projects(args.output, args.validate)
        
        print(f"\n✅ Exported {len(df)} projects to {args.output}")
        print(f"\nLabel Coverage:")
        print(f"  Cost Risk: {df['cost_risk_label'].notna().sum()} / {len(df)}")
        print(f"  Time Risk: {df['time_risk_label'].notna().sum()} / {len(df)}")
        print(f"  Execution Risk: {df['execution_risk_label'].notna().sum()} / {len(df)}")
        
        if df[['cost_risk_label', 'time_risk_label', 'execution_risk_label']].isna().all().all():
            print("\n⚠️  WARNING: No ground truth labels found!")
            print("   ML model training requires labeled data.")
            print("   Please add labels to the database before training.")
            sys.exit(1)
        
    except ValueError as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Failed to generate training data: {e}", exc_info=True)
        print(f"\n❌ Failed: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == '__main__':
    main()
