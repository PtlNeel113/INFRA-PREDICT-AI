"""
Database connectivity, migration, and CRUD tests.
"""
import pytest
from datetime import datetime
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

from app.db.models import (
    Project, ProjectUpdate, RiskScore, Prediction,
    User, AuditLog, IngestionJob
)
from app.db.base import Base


def test_database_connection(db):
    """Test database connection is established."""
    assert db is not None
    result = db.execute(select(1)).scalar()
    assert result == 1


def test_create_project(db):
    """Test creating a new project."""
    project = Project(
        code="TEST-001",
        name="Test Infrastructure Project",
        sector="Roads & Highways",
        state="Maharashtra",
        implementing_agency="NHAI",
        sanctioned_cost_cr=100.0,
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    db.add(project)
    db.commit()
    db.refresh(project)
    
    assert project.id is not None
    assert project.code == "TEST-001"


def test_duplicate_project_code_prevention(db):
    """Test that duplicate project codes are prevented."""
    project1 = Project(
        code="DUP-001",
        name="First Project",
        sector="Roads",
        state="Delhi",
        implementing_agency="NHAI",
        sanctioned_cost_cr=50.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project1)
    db.commit()
    
    # Try to create duplicate
    project2 = Project(
        code="DUP-001",  # Same code
        name="Second Project",
        sector="Railways",
        state="Mumbai",
        implementing_agency="Indian Railways",
        sanctioned_cost_cr=75.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project2)
    
    with pytest.raises(IntegrityError):
        db.commit()
    
    db.rollback()


def test_project_relationships(db):
    """Test project relationships with updates and risk scores."""
    # Create project
    project = Project(
        code="REL-001",
        name="Relationship Test Project",
        sector="Roads",
        state="Karnataka",
        implementing_agency="NHAI",
        sanctioned_cost_cr=150.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Add update
    update = ProjectUpdate(
        project_id=project.id,
        physical_progress=45.5,
        expected_progress=50.0,
        expenditure_cr=65.0,
        reported_date=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(update)
    
    # Add risk score
    risk_score = RiskScore(
        project_id=project.id,
        health_score=72,
        risk_level="MEDIUM",
        cost_risk_score=45,
        time_risk_score=50,
        execution_risk_score=40,
        calculated_at=datetime.utcnow(),
        created_at=datetime.utcnow(),
    )
    db.add(risk_score)
    
    db.commit()
    db.refresh(project)
    
    assert len(project.updates) == 1
    assert len(project.risk_scores) == 1
    assert project.updates[0].physical_progress == 45.5
    assert project.risk_scores[0].risk_level == "MEDIUM"


def test_cascade_delete(db):
    """Test cascade delete removes related records."""
    # Create project with relationships
    project = Project(
        code="CASCADE-001",
        name="Cascade Test",
        sector="Water",
        state="Gujarat",
        implementing_agency="WAPCOS",
        sanctioned_cost_cr=200.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Add related records
    update = ProjectUpdate(
        project_id=project.id,
        physical_progress=30.0,
        expected_progress=35.0,
        expenditure_cr=50.0,
        reported_date=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(update)
    db.commit()
    
    project_id = project.id
    
    # Delete project
    db.delete(project)
    db.commit()
    
    # Verify related records are deleted
    remaining_updates = db.query(ProjectUpdate).filter(
        ProjectUpdate.project_id == project_id
    ).all()
    assert len(remaining_updates) == 0


def test_create_user(db):
    """Test creating a user."""
    user = User(
        username="testuser",
        email="test@example.com",
        full_name="Test User",
        role="ANALYST",
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    assert user.id is not None
    assert user.username == "testuser"


def test_audit_log_creation(db):
    """Test creating audit log entries."""
    # Create user first
    user = User(
        username="auditor",
        email="auditor@example.com",
        full_name="Audit User",
        role="ADMIN",
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create audit log
    log = AuditLog(
        user_id=user.id,
        user_name=user.full_name,
        action="CREATE",
        resource_type="PROJECT",
        resource_id="TEST-001",
        description="Created test project",
        status="SUCCESS",
        created_at=datetime.utcnow(),
    )
    
    db.add(log)
    db.commit()
    db.refresh(log)
    
    assert log.id is not None
    assert log.action == "CREATE"
    assert log.user_id == user.id


def test_ingestion_job_with_new_schema(db):
    """Test ingestion job with new schema."""
    # Create user
    user = User(
        username="uploader",
        email="uploader@example.com",
        full_name="Upload User",
        role="MANAGER",
        is_active=True,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create ingestion job
    job = IngestionJob(
        job_code="JOB-TEST-001",
        filename="test_data.csv",
        file_size=1024,
        total_rows=10,
        processed_rows=10,
        new_rows=10,
        status="COMPLETED",
        user_id=user.id,
        user_name=user.full_name,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    db.add(job)
    db.commit()
    db.refresh(job)
    
    assert job.id is not None
    assert job.job_code == "JOB-TEST-001"
    assert job.user_id == user.id


def test_project_constraints(db):
    """Test project table constraints."""
    # Test negative cost constraint
    with pytest.raises(IntegrityError):
        project = Project(
            code="INVALID-001",
            name="Invalid Cost Project",
            sector="Roads",
            state="Delhi",
            implementing_agency="NHAI",
            sanctioned_cost_cr=-10.0,  # Negative cost should fail
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(project)
        db.commit()
    
    db.rollback()


def test_query_with_relationships(db):
    """Test querying projects with eager loading."""
    # Create project with data
    project = Project(
        code="QUERY-001",
        name="Query Test Project",
        sector="Energy",
        state="Tamil Nadu",
        implementing_agency="NTPC",
        sanctioned_cost_cr=500.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Add multiple updates
    for i in range(3):
        update = ProjectUpdate(
            project_id=project.id,
            physical_progress=20.0 * (i + 1),
            expected_progress=25.0 * (i + 1),
            expenditure_cr=100.0 * (i + 1),
            reported_date=datetime.utcnow(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(update)
    
    db.commit()
    
    # Query with relationships
    queried_project = db.query(Project).filter(
        Project.code == "QUERY-001"
    ).first()
    
    assert queried_project is not None
    assert len(queried_project.updates) == 3
    assert queried_project.updates[0].project_id == project.id


def test_transaction_rollback(db):
    """Test transaction rollback on error."""
    project = Project(
        code="ROLLBACK-001",
        name="Rollback Test",
        sector="Transport",
        state="Kerala",
        implementing_agency="KSRTC",
        sanctioned_cost_cr=80.0,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(project)
    db.commit()
    
    try:
        # Create another project with same code (should fail)
        duplicate = Project(
            code="ROLLBACK-001",
            name="Duplicate",
            sector="Transport",
            state="Punjab",
            implementing_agency="PRTC",
            sanctioned_cost_cr=60.0,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(duplicate)
        db.commit()
    except IntegrityError:
        db.rollback()
    
    # Verify original project still exists
    existing = db.query(Project).filter(
        Project.code == "ROLLBACK-001"
    ).first()
    
    assert existing is not None
    assert existing.state == "Kerala"
