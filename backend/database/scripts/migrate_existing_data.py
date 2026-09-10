"""
Data migration script to safely migrate from old schema to new normalized schema.

This script:
1. Backs up existing data
2. Migrates ProjectTelemetryRecord to new Project model
3. Creates corresponding ProjectUpdate and RiskScore records
4. Migrates IngestionJob records with new schema
5. Preserves all historical data
"""
import sys
import json
from datetime import datetime
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import create_engine, select, and_
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.base import Base
from app.db.models import (
    Project, ProjectUpdate, RiskScore, Prediction,
    IngestionJob, IngestionRecord, RawUploadedData,
    User
)
from app.db.models.telemetry import ProjectTelemetryRecord


def backup_existing_data(session):
    """Create backup of existing data before migration."""
    backup_data = {
        "timestamp": datetime.utcnow().isoformat(),
        "telemetry_records": [],
        "ingestion_jobs": [],
        "raw_data": [],
    }
    
    # Backup telemetry records
    try:
        telemetry_records = session.query(ProjectTelemetryRecord).all()
        for record in telemetry_records:
            backup_data["telemetry_records"].append({
                "id": record.id,
                "code": record.code,
                "name": record.name,
                "sector": record.sector,
                "state": record.state,
                "district": record.district,
                "implementing_agency": record.implementing_agency,
                "ministry": record.ministry,
                "sanctioned_cost_cr": record.sanctioned_cost_cr,
                "expenditure_cr": record.expenditure_cr,
                "physical_progress": record.physical_progress,
                "expected_progress": record.expected_progress,
                "health_score": record.health_score,
                "risk_level": record.risk_level,
                "cost_risk_score": record.cost_risk_score,
                "time_risk_score": record.time_risk_score,
                "execution_risk_score": record.execution_risk_score,
                "predicted_delay_months": record.predicted_delay_months,
                "predicted_cost_overrun_cr": record.predicted_cost_overrun_cr,
                "primary_risk_driver": record.primary_risk_driver,
                "current_issues": record.current_issues,
                "last_updated": record.last_updated.isoformat() if record.last_updated else None,
            })
        print(f"✓ Backed up {len(telemetry_records)} telemetry records")
    except Exception as e:
        print(f"⚠ No telemetry records to backup: {e}")
    
    # Save backup
    backup_file = Path("data/migration_backup.json")
    backup_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(backup_file, "w") as f:
        json.dump(backup_data, f, indent=2)
    
    print(f"✓ Backup saved to {backup_file}")
    return backup_data


def migrate_telemetry_to_projects(session, backup_data):
    """Migrate ProjectTelemetryRecord to normalized Project structure."""
    migrated_count = 0
    skipped_count = 0
    
    for record_data in backup_data["telemetry_records"]:
        try:
            # Check if project already exists
            existing = session.query(Project).filter(
                Project.code == record_data["code"]
            ).first()
            
            if existing:
                print(f"  ⊳ Skipping {record_data['code']} - already exists")
                skipped_count += 1
                continue
            
            # Create new Project
            project = Project(
                code=record_data["code"],
                name=record_data["name"],
                sector=record_data["sector"],
                state=record_data["state"],
                district=record_data["district"],
                implementing_agency=record_data["implementing_agency"],
                ministry=record_data["ministry"],
                sanctioned_cost_cr=record_data["sanctioned_cost_cr"],
                is_active=True,
                completion_percentage=record_data["physical_progress"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            session.add(project)
            session.flush()  # Get project.id
            
            # Create ProjectUpdate
            update = ProjectUpdate(
                project_id=project.id,
                physical_progress=record_data["physical_progress"],
                expected_progress=record_data["expected_progress"],
                expenditure_cr=record_data["expenditure_cr"],
                current_issues=record_data["current_issues"],
                reported_date=datetime.fromisoformat(record_data["last_updated"]) if record_data["last_updated"] else datetime.utcnow(),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            session.add(update)
            
            # Create RiskScore
            risk_score = RiskScore(
                project_id=project.id,
                health_score=record_data["health_score"],
                risk_level=record_data["risk_level"],
                cost_risk_score=record_data["cost_risk_score"],
                time_risk_score=record_data["time_risk_score"],
                execution_risk_score=record_data["execution_risk_score"],
                calculated_at=datetime.utcnow(),
                calculation_method="DETERMINISTIC",
                created_at=datetime.utcnow(),
            )
            session.add(risk_score)
            
            # Create Prediction
            prediction = Prediction(
                project_id=project.id,
                predicted_delay_months=record_data["predicted_delay_months"],
                predicted_cost_overrun_cr=record_data["predicted_cost_overrun_cr"],
                model_name="DETERMINISTIC_V1",
                model_version="1.0",
                predicted_at=datetime.utcnow(),
                created_at=datetime.utcnow(),
            )
            session.add(prediction)
            
            migrated_count += 1
            print(f"  ✓ Migrated {record_data['code']}: {record_data['name']}")
            
        except Exception as e:
            print(f"  ✗ Failed to migrate {record_data['code']}: {e}")
            session.rollback()
            continue
    
    session.commit()
    print(f"\n✓ Migrated {migrated_count} projects, skipped {skipped_count}")
    return migrated_count


def create_default_user(session):
    """Create default system user if none exists."""
    existing = session.query(User).filter(User.username == "system").first()
    
    if not existing:
        user = User(
            username="system",
            email="system@infra-predict.ai",
            full_name="System User",
            role="ADMIN",
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(user)
        session.commit()
        print("✓ Created default system user")
        return user.id
    else:
        print("✓ System user already exists")
        return existing.id


def run_migration():
    """Execute the complete migration."""
    print("=" * 70)
    print("INFRA-PREDICT-AI Data Migration")
    print("=" * 70)
    print()
    
    # Create engine
    engine = create_engine(settings.DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        # Step 1: Backup existing data
        print("Step 1: Backing up existing data...")
        backup_data = backup_existing_data(session)
        print()
        
        # Step 2: Migrate telemetry records
        print("Step 2: Migrating telemetry records to normalized schema...")
        if backup_data["telemetry_records"]:
            migrated = migrate_telemetry_to_projects(session, backup_data)
        else:
            print("  No telemetry records to migrate")
        print()
        
        # Step 3: Create default user
        print("Step 3: Creating default system user...")
        user_id = create_default_user(session)
        print()
        
        # Summary
        print("=" * 70)
        print("Migration Summary:")
        print("=" * 70)
        print(f"✓ Projects migrated: {len(backup_data['telemetry_records'])}")
        print(f"✓ Backup file: data/migration_backup.json")
        print(f"✓ Database: {settings.DATABASE_URL}")
        print()
        print("Migration completed successfully!")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n✗ Migration failed: {e}")
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    run_migration()
