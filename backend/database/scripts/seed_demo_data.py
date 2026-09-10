"""
Seed the database with demo/sample data for development and testing.
"""
import sys
from datetime import datetime, timedelta
from pathlib import Path
import random

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.models import (
    Project, ProjectUpdate, RiskScore, Prediction,
    RiskDriver, EarlyWarning, User
)


def create_demo_user(session):
    """Create demo users."""
    users = [
        {
            "username": "admin",
            "email": "admin@infra-predict.ai",
            "full_name": "Administrator",
            "role": "ADMIN",
            "department": "IT",
            "is_active": True,
            "is_verified": True,
        },
        {
            "username": "analyst",
            "email": "analyst@infra-predict.ai",
            "full_name": "Data Analyst",
            "role": "ANALYST",
            "department": "Analytics",
            "is_active": True,
            "is_verified": True,
        },
        {
            "username": "manager",
            "email": "manager@infra-predict.ai",
            "full_name": "Project Manager",
            "role": "MANAGER",
            "department": "Operations",
            "is_active": True,
            "is_verified": True,
        },
    ]
    
    for user_data in users:
        existing = session.query(User).filter(User.username == user_data["username"]).first()
        if not existing:
            user = User(**user_data, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
            session.add(user)
            print(f"  ✓ Created user: {user_data['username']}")
    
    session.commit()


def create_demo_projects(session):
    """Create demo projects with realistic data."""
    projects_data = [
        {
            "code": "NH-44-MP-001",
            "name": "NH-44 Widening Project - Madhya Pradesh",
            "sector": "Roads & Highways",
            "state": "Madhya Pradesh",
            "district": "Bhopal",
            "implementing_agency": "NHAI",
            "ministry": "Ministry of Road Transport & Highways",
            "sanctioned_cost_cr": 450.0,
            "progress": 67.5,
            "expected": 70.0,
            "expenditure": 295.0,
        },
        {
            "code": "RAIL-DFC-GUJ-002",
            "name": "Dedicated Freight Corridor - Gujarat Section",
            "sector": "Railways",
            "state": "Gujarat",
            "district": "Ahmedabad",
            "implementing_agency": "DFCCIL",
            "ministry": "Ministry of Railways",
            "sanctioned_cost_cr": 8500.0,
            "progress": 45.0,
            "expected": 52.0,
            "expenditure": 4200.0,
        },
        {
            "code": "METRO-BLR-003",
            "name": "Bangalore Metro Phase 2 - Purple Line Extension",
            "sector": "Urban Transport",
            "state": "Karnataka",
            "district": "Bangalore Urban",
            "implementing_agency": "BMRCL",
            "ministry": "Ministry of Housing & Urban Affairs",
            "sanctioned_cost_cr": 6500.0,
            "progress": 32.0,
            "expected": 35.0,
            "expenditure": 2100.0,
        },
        {
            "code": "PWR-SOLAR-RAJ-004",
            "name": "Bhadla Solar Park Phase IV",
            "sector": "Power & Energy",
            "state": "Rajasthan",
            "district": "Jodhpur",
            "implementing_agency": "SECI",
            "ministry": "Ministry of New & Renewable Energy",
            "sanctioned_cost_cr": 3200.0,
            "progress": 85.0,
            "expected": 83.0,
            "expenditure": 2700.0,
        },
        {
            "code": "PORT-MUM-005",
            "name": "Mumbai Port Modernization",
            "sector": "Ports & Shipping",
            "state": "Maharashtra",
            "district": "Mumbai",
            "implementing_agency": "Mumbai Port Trust",
            "ministry": "Ministry of Ports, Shipping & Waterways",
            "sanctioned_cost_cr": 12000.0,
            "progress": 25.0,
            "expected": 40.0,
            "expenditure": 3500.0,
        },
    ]
    
    for proj_data in projects_data:
        existing = session.query(Project).filter(Project.code == proj_data["code"]).first()
        if existing:
            print(f"  ⊳ Skipping {proj_data['code']} - already exists")
            continue
        
        # Create project
        project = Project(
            code=proj_data["code"],
            name=proj_data["name"],
            sector=proj_data["sector"],
            state=proj_data["state"],
            district=proj_data["district"],
            implementing_agency=proj_data["implementing_agency"],
            ministry=proj_data["ministry"],
            sanctioned_cost_cr=proj_data["sanctioned_cost_cr"],
            is_active=True,
            completion_percentage=proj_data["progress"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(project)
        session.flush()
        
        # Create project update
        update = ProjectUpdate(
            project_id=project.id,
            physical_progress=proj_data["progress"],
            expected_progress=proj_data["expected"],
            expenditure_cr=proj_data["expenditure"],
            reported_date=datetime.utcnow(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(update)
        
        # Calculate risk scores
        progress_gap = max(0, proj_data["expected"] - proj_data["progress"])
        time_risk = min(98, max(15, int(progress_gap * 4.5 + 20)))
        cost_risk = min(98, max(15, int(progress_gap * 2.8 + 25)))
        execution_risk = min(98, max(15, int(progress_gap * 3.2 + 20)))
        weighted_risk = time_risk * 0.40 + cost_risk * 0.35 + execution_risk * 0.25
        health_score = max(5, min(95, int(100 - weighted_risk)))
        
        if health_score < 45:
            risk_level = "CRITICAL"
        elif health_score < 65:
            risk_level = "HIGH"
        elif health_score < 80:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"
        
        # Create risk score
        risk_score = RiskScore(
            project_id=project.id,
            health_score=health_score,
            risk_level=risk_level,
            cost_risk_score=cost_risk,
            time_risk_score=time_risk,
            execution_risk_score=execution_risk,
            calculated_at=datetime.utcnow(),
            calculation_method="DETERMINISTIC",
            created_at=datetime.utcnow(),
        )
        session.add(risk_score)
        
        # Create prediction
        predicted_delay = round(progress_gap * 0.65, 1)
        predicted_overrun = round(proj_data["sanctioned_cost_cr"] * (progress_gap / 100) * 0.6, 1)
        
        prediction = Prediction(
            project_id=project.id,
            predicted_delay_months=predicted_delay,
            predicted_cost_overrun_cr=predicted_overrun,
            model_name="DETERMINISTIC_V1",
            model_version="1.0",
            predicted_at=datetime.utcnow(),
            created_at=datetime.utcnow(),
        )
        session.add(prediction)
        
        # Add some risk drivers
        if progress_gap > 5:
            driver = RiskDriver(
                project_id=project.id,
                driver_type="SCHEDULE_DELAY",
                driver_name="Progress Behind Schedule",
                description=f"Project is {progress_gap:.1f}% behind expected progress",
                impact_level="HIGH" if progress_gap > 10 else "MEDIUM",
                impact_score=int(min(95, progress_gap * 8)),
                is_active=True,
                is_primary=True,
                identified_at=datetime.utcnow(),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            session.add(driver)
        
        # Add early warning for high-risk projects
        if risk_level in ["HIGH", "CRITICAL"]:
            warning = EarlyWarning(
                project_id=project.id,
                warning_type="DELAY",
                severity=risk_level,
                title=f"Project Progress Alert - {risk_level} Risk",
                description=f"Project is behind schedule with {progress_gap:.1f}% gap from expected progress",
                status="ACTIVE",
                triggered_at=datetime.utcnow(),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            session.add(warning)
        
        print(f"  ✓ Created project: {proj_data['code']} ({risk_level} risk)")
    
    session.commit()


def run_seed():
    """Execute database seeding."""
    print("=" * 70)
    print("INFRA-PREDICT-AI Database Seeding")
    print("=" * 70)
    print()
    
    engine = create_engine(settings.DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    try:
        print("Step 1: Creating demo users...")
        create_demo_user(session)
        print()
        
        print("Step 2: Creating demo projects...")
        create_demo_projects(session)
        print()
        
        print("=" * 70)
        print("Seeding completed successfully!")
        print("=" * 70)
        print()
        print("Demo credentials:")
        print("  - admin / (no password set)")
        print("  - analyst / (no password set)")
        print("  - manager / (no password set)")
        print()
        
    except Exception as e:
        print(f"\n✗ Seeding failed: {e}")
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    run_seed()
