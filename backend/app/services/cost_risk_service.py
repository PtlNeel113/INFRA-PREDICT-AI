"""
Service orchestrating explainable Cost Risk evaluation for PAIMANA projects.
"""
from typing import Dict, Any, Optional
from .feature_engineering import compute_derived_cost_indicators
from .risk_engine import evaluate_cost_risk, generate_risk_drivers

class CostRiskService:
    @staticmethod
    def get_project_cost_risk(project_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        API response schema conforming to MoSPI PAIMANA evaluation standards.
        """
        orig = float(project_data.get("sanctionedCostCr") or 0.0)
        rev = float(project_data.get("revisedCostCr") or orig)
        exp = float(project_data.get("expenditureCr") or 0.0)
        prog = float(project_data.get("currentPhysicalProgress") or 0.0)

        data_quality = "SUFFICIENT"
        if orig <= 0 or exp < 0:
            data_quality = "INSUFFICIENT_DATA"
        elif prog <= 0:
            data_quality = "PARTIAL"

        indicators = compute_derived_cost_indicators(orig, rev, exp, prog)
        risk_eval = evaluate_cost_risk(
            indicators["cost_increase_pct"],
            indicators["expenditure_progress_ratio"],
            data_quality
        )

        drivers = generate_risk_drivers(
            indicators["cost_increase_pct"],
            indicators["expenditure_pct"],
            indicators["physical_progress"],
            indicators["expenditure_progress_ratio"],
            risk_eval["cost_risk"],
            orig,
            indicators["revised_cost"],
            indicators["remaining_cost"]
        )

        return {
            "project_id": project_data.get("id"),
            "original_cost": indicators["original_cost"],
            "revised_cost": indicators["revised_cost"],
            "expenditure": indicators["expenditure"],
            "physical_progress": indicators["physical_progress"],
            "cost_increase_pct": indicators["cost_increase_pct"],
            "remaining_cost": indicators["remaining_cost"],
            "expenditure_pct": indicators["expenditure_pct"],
            "expenditure_progress_ratio": indicators["expenditure_progress_ratio"],
            "cost_risk": risk_eval["cost_risk"],
            "risk_drivers": drivers,
            "data_quality": data_quality,
            "technical_explanation": (
                "Cost Risk is derived using deterministic PAIMANA indicators combining "
                "Cost Escalation Rate, Budget Depletion Velocity, and Expenditure-to-Progress Elasticity. "
                "Where historical cycles are available, trends are corroborated against prior flash reports."
            ),
            "methodology": "Derived Risk Assessment (MoSPI PAIMANA Deterministic Rules)"
        }
