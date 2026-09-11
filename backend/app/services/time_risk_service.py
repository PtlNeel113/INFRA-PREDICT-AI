"""
Service orchestrating explainable Time Risk evaluation for PAIMANA projects.
"""
from typing import Dict, Any, Optional
from .feature_engineering import compute_derived_time_indicators
from .risk_engine import evaluate_time_risk, generate_time_risk_drivers

class TimeRiskService:
    @staticmethod
    def get_project_time_risk(project_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        API response schema conforming to MoSPI PAIMANA evaluation standards.
        """
        start_date = project_data.get("startDate")
        orig_date = project_data.get("originalDeadline") or project_data.get("original_completion")
        rev_date = project_data.get("predictedCompletionDate") or project_data.get("revised_completion") or orig_date
        
        raw_prog = project_data.get("currentPhysicalProgress")
        if raw_prog is None:
            raw_prog = project_data.get("physicalProgress")
        physical_prog = float(raw_prog) if raw_prog is not None else None

        stage = str(project_data.get("stage") or "")
        is_completed = "completed" in stage.lower() or (physical_prog is not None and physical_prog >= 100.0)

        data_quality = "SUFFICIENT"
        if not orig_date or physical_prog is None:
            data_quality = "INSUFFICIENT_DATA"
        elif not start_date:
            data_quality = "PARTIAL"

        indicators = compute_derived_time_indicators(
            start_date=start_date,
            original_completion=orig_date,
            revised_completion=rev_date,
            physical_progress=physical_prog,
            is_completed=is_completed
        )

        risk_eval = evaluate_time_risk(
            schedule_slippage_months=indicators["schedule_slippage_months"],
            progress_gap=indicators["progress_gap"],
            elapsed_duration_months=indicators["elapsed_duration_months"],
            project_duration_months=indicators["project_duration_months"],
            physical_progress=physical_prog,
            data_quality=data_quality
        )

        drivers = generate_time_risk_drivers(
            schedule_slippage_months=indicators["schedule_slippage_months"],
            progress_gap=indicators["progress_gap"],
            physical_progress=physical_prog,
            elapsed_duration_months=indicators["elapsed_duration_months"],
            project_duration_months=indicators["project_duration_months"],
            time_risk=risk_eval["time_risk"]
        )

        return {
            "project_id": project_data.get("id"),
            "start_date": indicators["start_date"],
            "original_completion_date": indicators["original_completion"],
            "revised_completion_date": indicators["revised_completion"],
            "physical_progress": indicators["physical_progress"],
            "schedule_slippage_months": indicators["schedule_slippage_months"],
            "project_duration_months": indicators["project_duration_months"],
            "elapsed_duration_months": indicators["elapsed_duration_months"],
            "remaining_duration_months": indicators["remaining_duration_months"],
            "expected_progress": indicators["expected_progress"],
            "progress_gap": indicators["progress_gap"],
            "time_risk": risk_eval["time_risk"],
            "delay_risk": risk_eval["delay_risk"],
            "delay_risk_assessment_type": "Derived Delay Risk (Prototype Delay Risk Assessment)",
            "risk_drivers": drivers,
            "data_quality": data_quality,
            "technical_explanation": (
                "Time Risk is derived using deterministic PAIMANA indicators evaluating "
                "Schedule Slippage, Derived Progress Gap, and Timeline Run-Rate. "
                "Assessed transparently without fabricated ML confidence scores."
            )
        }
