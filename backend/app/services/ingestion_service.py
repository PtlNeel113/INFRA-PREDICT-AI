"""
Data ingestion service with validation, normalization, and risk calculation.
"""
import io
import json
import uuid
import datetime
from typing import Dict, Any, List, Optional
import pandas as pd
from sqlalchemy.orm import Session

from ..db.models import IngestionJob, RawUploadedData, ProjectTelemetryRecord
from ..core.logging import get_logger
from ..core.exceptions import FileProcessingException, ValidationException, DatabaseException

logger = get_logger(__name__)


def calculate_risk_scores(
    sanctioned_cost: float,
    expenditure: float,
    physical_progress: float,
    expected_progress: float,
    primary_driver: str,
) -> Dict[str, Any]:
    """
    Calculate deterministic transparent risk scores for a project.
    
    Args:
        sanctioned_cost: Total sanctioned cost in Cr
        expenditure: Current expenditure in Cr
        physical_progress: Current physical progress (0-100)
        expected_progress: Expected progress (0-100)
        primary_driver: Primary risk driver category
    
    Returns:
        Dictionary with calculated risk metrics
    """
    try:
        progress_gap = max(0.0, expected_progress - physical_progress)
        exp_pct = (expenditure / sanctioned_cost * 100) if sanctioned_cost > 0 else 0
        financial_pace_divergence = max(0.0, exp_pct - physical_progress)

        # Time Risk Score (0-100)
        time_risk = min(98, max(15, int(progress_gap * 4.5 + 20)))

        # Cost Risk Score (0-100)
        cost_risk = min(98, max(15, int(financial_pace_divergence * 2.8 + 25)))

        # Execution Risk Score (0-100)
        execution_risk = min(98, max(15, int(progress_gap * 3.2 + 20)))

        # Composite Health Score (0-100, higher is healthier)
        weighted_risk = time_risk * 0.40 + cost_risk * 0.35 + execution_risk * 0.25
        health_score = max(5, min(95, int(100 - weighted_risk)))

        # Risk level classification
        if health_score < 45:
            risk_level = "CRITICAL"
        elif health_score < 65:
            risk_level = "HIGH"
        elif health_score < 80:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        # Delay forecast in months
        predicted_delay_months = round(max(0.0, progress_gap * 0.65), 1)

        # Cost overrun forecast in Cr
        predicted_cost_overrun_cr = round(max(0.0, sanctioned_cost * (financial_pace_divergence / 100) * 0.6), 1)

        logger.debug(
            f"Risk scores calculated",
            extra={
                "health_score": health_score,
                "risk_level": risk_level,
                "time_risk": time_risk,
                "cost_risk": cost_risk,
            }
        )

        return {
            "health_score": health_score,
            "risk_level": risk_level,
            "time_risk_score": time_risk,
            "cost_risk_score": cost_risk,
            "execution_risk_score": execution_risk,
            "predicted_delay_months": predicted_delay_months,
            "predicted_cost_overrun_cr": predicted_cost_overrun_cr,
        }
    except Exception as e:
        logger.error(f"Risk calculation failed: {e}")
        raise ValidationException(f"Risk calculation failed: {str(e)}")


def parse_file_to_records(file_bytes: bytes, filename: str) -> List[Dict[str, Any]]:
    """
    Parse uploaded file into list of records.
    
    Supports CSV, XLSX, XLS, and JSON formats.
    
    Args:
        file_bytes: Raw file content
        filename: Original filename for format detection
    
    Returns:
        List of dictionaries representing rows
    
    Raises:
        FileProcessingException: If file cannot be parsed
    """
    try:
        ext = filename.split(".")[-1].lower() if "." in filename else "csv"
        
        if ext == "json":
            data = json.loads(file_bytes.decode("utf-8"))
            records = data if isinstance(data, list) else [data]
            logger.info(f"Parsed JSON file: {len(records)} records", extra={"file_name": filename})
            return records
            
        elif ext in ["xlsx", "xls"]:
            df = pd.read_excel(io.BytesIO(file_bytes))
            df = df.fillna("")
            records = df.to_dict(orient="records")
            logger.info(f"Parsed Excel file: {len(records)} records", extra={"file_name": filename})
            return records
            
        else:
            # Default CSV
            try:
                df = pd.read_csv(io.BytesIO(file_bytes))
            except UnicodeDecodeError:
                df = pd.read_csv(io.BytesIO(file_bytes), encoding="latin1")
            
            df = df.fillna("")
            records = df.to_dict(orient="records")
            logger.info(f"Parsed CSV file: {len(records)} records", extra={"file_name": filename})
            return records
            
    except Exception as e:
        logger.error(f"File parsing failed: {e}", extra={"file_name": filename})
        raise FileProcessingException(f"Failed to parse file: {str(e)}", filename=filename)


def process_ingestion_pipeline(
    db: Session,
    file_bytes: bytes,
    filename: str,
    user: str = "Monitoring Officer",
    column_mapping: Optional[Dict[str, str]] = None,
) -> Dict[str, Any]:
    """
    Execute complete ingestion pipeline.
    
    Pipeline stages:
    1. Parse file to records
    2. Validate and normalize data
    3. Calculate risk scores
    4. Deduplicate and upsert to database
    5. Create audit log
    
    Args:
        db: Database session
        file_bytes: Raw file content
        filename: Original filename
        user: User performing the ingestion
        column_mapping: Optional mapping of source columns to canonical names
    
    Returns:
        Ingestion summary with metrics and errors
    
    Raises:
        DatabaseException: If database operations fail
    """
    job_id = f"JOB-{uuid.uuid4().hex[:8].upper()}"
    
    logger.info(
        f"Starting ingestion pipeline",
        extra={"job_id": job_id, "file_name": filename, "user_name": user}
    )
    
    try:
        raw_records = parse_file_to_records(file_bytes, filename)
        total_rows = len(raw_records)
        
        # Invert mapping for easier lookup
        reverse_map = {}
        if column_mapping:
            for src, canonical in column_mapping.items():
                if canonical:
                    reverse_map[canonical] = src
        
        errors = []
        updated_count = 0
        new_count = 0
        valid_records = []
        
        # Process each row
        for idx, row in enumerate(raw_records):
            row_num = idx + 2  # Excel-style row numbering
            
            def get_val(key: str, default="") -> Any:
                """Get value from row using mapping."""
                src_col = reverse_map.get(key)
                if src_col and src_col in row:
                    return row[src_col]
                return row.get(key, default)
            
            # Extract and validate fields
            name = str(get_val("name", "")).strip()
            code = str(get_val("code", "")).strip()
            sector = str(get_val("sector", "Roads & Highways")).strip() or "Roads & Highways"
            state = str(get_val("state", "National")).strip() or "National"
            agency = str(get_val("implementingAgency", "NHAI")).strip() or "NHAI"
            ministry = str(get_val("ministry", "MoRTH")).strip() or "MoRTH"
            district = str(get_val("district", "")).strip()
            
            # Parse sanctioned cost
            raw_cost = get_val("sanctionedCostCr", 0)
            try:
                cost = float(str(raw_cost).replace("₹", "").replace(",", "").replace("Cr", "").strip())
            except (ValueError, TypeError):
                cost = 0.0
            
            # Validate required fields
            if not name:
                errors.append({
                    "rowNumber": row_num,
                    "field": "name",
                    "rawValue": name,
                    "reason": "Project Name cannot be empty."
                })
                continue
            
            if cost <= 0:
                errors.append({
                    "rowNumber": row_num,
                    "field": "sanctionedCostCr",
                    "rawValue": raw_cost,
                    "reason": "Sanctioned cost must be a positive number."
                })
                continue
            
            # Parse physical progress
            raw_prog = get_val("currentPhysicalProgress", 0)
            try:
                prog = float(str(raw_prog).replace("%", "").strip())
                if 0 < prog <= 1.0:
                    prog = prog * 100
                prog = max(0.0, min(100.0, prog))
            except (ValueError, TypeError):
                prog = 0.0
            
            # Parse expected progress
            raw_sched = get_val("expectedProgress", prog + 5)
            try:
                sched = float(str(raw_sched).replace("%", "").strip())
                if 0 < sched <= 1.0:
                    sched = sched * 100
                sched = max(0.0, min(100.0, sched))
            except (ValueError, TypeError):
                sched = min(100.0, prog + 5)
            
            # Parse expenditure
            raw_exp = get_val("expenditureCr", cost * (prog / 100))
            try:
                exp = float(str(raw_exp).replace("₹", "").replace(",", "").replace("Cr", "").strip())
            except (ValueError, TypeError):
                exp = cost * (prog / 100)
            
            primary_driver = str(get_val("primaryRiskDriver", "Right of Way & Clearances")).strip() or "Right of Way & Clearances"
            issues = str(get_val("currentIssues", "")).strip()
            
            # Generate code if missing
            if not code:
                code = f"PRJ-{uuid.uuid4().hex[:6].upper()}"
            
            # Calculate risk scores
            risk_data = calculate_risk_scores(cost, exp, prog, sched, primary_driver)
            
            valid_records.append({
                "code": code,
                "name": name,
                "sector": sector,
                "state": state,
                "district": district,
                "implementing_agency": agency,
                "ministry": ministry,
                "sanctioned_cost_cr": cost,
                "expenditure_cr": exp,
                "physical_progress": prog,
                "expected_progress": sched,
                "primary_risk_driver": primary_driver,
                "current_issues": issues,
                **risk_data,
            })
        
        # Save to database
        try:
            # Save raw data for audit
            raw_entry = RawUploadedData(
                id=f"RAW-{uuid.uuid4().hex[:8].upper()}",
                job_id=job_id,
                filename=filename,
                file_format=filename.split(".")[-1].lower(),
                raw_payload=json.dumps(raw_records[:50]),  # Store sample for audit
            )
            db.add(raw_entry)
            
            # Upsert telemetry records
            for rec in valid_records:
                existing = db.query(ProjectTelemetryRecord).filter(
                    ProjectTelemetryRecord.code == rec["code"]
                ).first()
                
                if existing:
                    for k, v in rec.items():
                        setattr(existing, k, v)
                    existing.last_updated = datetime.datetime.utcnow()
                    updated_count += 1
                else:
                    new_rec = ProjectTelemetryRecord(
                        id=f"REC-{uuid.uuid4().hex[:8].upper()}",
                        **rec
                    )
                    db.add(new_rec)
                    new_count += 1
            
            rejected_count = len(errors)
            quality_score = round(
                ((total_rows - rejected_count) / total_rows * 100), 1
            ) if total_rows > 0 else 100.0
            
            # Save job record
            job = IngestionJob(
                id=job_id,
                filename=filename,
                file_size=len(file_bytes),
                total_rows=total_rows,
                processed_rows=len(valid_records),
                updated_rows=updated_count,
                new_rows=new_count,
                rejected_rows=rejected_count,
                quality_score=quality_score,
                status="COMPLETED" if rejected_count == 0 else "PARTIAL",
                user=user,
                errors_json=json.dumps(errors),
            )
            db.add(job)
            db.commit()
            
            logger.info(
                f"Ingestion pipeline completed successfully",
                extra={
                    "job_id": job_id,
                    "total_rows": total_rows,
                    "new_count": new_count,
                    "updated_count": updated_count,
                    "rejected_count": rejected_count,
                    "quality_score": quality_score,
                }
            )
            
            return {
                "jobId": job_id,
                "filename": filename,
                "totalProcessed": total_rows,
                "updatedCount": updated_count,
                "createdCount": new_count,
                "rejectedCount": rejected_count,
                "qualityScore": quality_score,
                "errors": errors,
                "recalculatedRiskCount": len(valid_records),
            }
            
        except Exception as e:
            db.rollback()
            logger.error(f"Database operation failed: {e}", extra={"job_id": job_id})
            raise DatabaseException(f"Database operation failed: {str(e)}")
            
    except Exception as e:
        logger.error(f"Ingestion pipeline failed: {e}", extra={"job_id": job_id})
        raise
