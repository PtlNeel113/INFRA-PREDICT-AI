"""
Risk Engine evaluating Cost Risk based on deterministic PAIMANA indicators.
Zero fake ML or fabricated confidence scores.
"""
from typing import Dict, Any, List, Optional

def evaluate_cost_risk(
    cost_increase_pct: float,
    expenditure_progress_ratio: Optional[float],
    data_quality: str = "SUFFICIENT"
) -> Dict[str, Any]:
    """
    Evaluates cost risk category and generates traceable rule triggers:
    
    HIGH COST RISK IF:
    - Cost Increase % > 20% OR Expenditure / Progress Ratio > 1.25
    
    MEDIUM COST RISK IF:
    - Cost Increase % between 5% and 20% OR Expenditure / Progress Ratio between 1.05 and 1.25
    
    LOW COST RISK IF:
    - Cost Increase % <= 5% AND Expenditure / Progress Ratio <= 1.05
    """
    if data_quality == "INSUFFICIENT_DATA":
        return {
            "cost_risk": "INSUFFICIENT_DATA",
            "condition_met": "Insufficient baseline records",
            "verdict": "Cannot compute cost risk due to missing baseline values."
        }

    is_high_increase = cost_increase_pct > 20.0
    is_high_ratio = expenditure_progress_ratio is not None and expenditure_progress_ratio > 1.25

    is_med_increase = 5.0 <= cost_increase_pct <= 20.0
    is_med_ratio = expenditure_progress_ratio is not None and 1.05 <= expenditure_progress_ratio <= 1.25

    if is_high_increase or is_high_ratio:
        return {
            "cost_risk": "HIGH",
            "cost_increase_triggered": is_high_increase,
            "ratio_triggered": is_high_ratio,
            "verdict": "High Cost Risk: Budget escalation > 20% or expenditure outpacing progress > 1.25."
        }
    elif is_med_increase or is_med_ratio:
        return {
            "cost_risk": "MEDIUM",
            "cost_increase_triggered": is_med_increase,
            "ratio_triggered": is_med_ratio,
            "verdict": "Medium Cost Risk: Moderate cost revision (5-20%) or ratio (1.05-1.25)."
        }
    else:
        return {
            "cost_risk": "LOW",
            "cost_increase_triggered": False,
            "ratio_triggered": False,
            "verdict": "Low Cost Risk: Cost revision <= 5% and expenditure/progress ratio <= 1.05."
        }

def generate_risk_drivers(
    cost_increase_pct: float,
    expenditure_pct: float,
    physical_progress: float,
    expenditure_progress_ratio: Optional[float],
    cost_risk: str,
    original_cost: float,
    revised_cost: float,
    remaining_cost: float
) -> List[Dict[str, Any]]:
    """
    Generates structured, traceable risk drivers with numeric evidence.
    """
    drivers = []

    if cost_increase_pct > 0:
        severity = "HIGH" if cost_increase_pct > 20 else ("MEDIUM" if cost_increase_pct >= 5 else "LOW")
        drivers.append({
            "type": "COST_INCREASE",
            "title": "Cost Increase",
            "description": f"Revised cost is {cost_increase_pct}% higher than original cost (₹{revised_cost:,.2f} Cr vs ₹{original_cost:,.2f} Cr).",
            "severity": severity,
            "traceability": f"(({revised_cost} - {original_cost}) / {original_cost}) * 100 = +{cost_increase_pct}%"
        })

    if expenditure_progress_ratio is not None and expenditure_progress_ratio > 1.05:
        severity = "HIGH" if expenditure_progress_ratio > 1.25 else "MEDIUM"
        drivers.append({
            "type": "EXPENDITURE_VS_PROGRESS",
            "title": "Expenditure vs Progress",
            "description": f"Money spent ({expenditure_pct}%) is outpacing physical progress ({physical_progress}%) with a ratio of {expenditure_progress_ratio}.",
            "severity": severity,
            "traceability": f"{expenditure_pct}% / {physical_progress}% = {expenditure_progress_ratio}"
        })

    if expenditure_pct > physical_progress:
        gap = round(expenditure_pct - physical_progress, 1)
        drivers.append({
            "type": "FUNDING_DRAWDOWN",
            "title": "Funding Drawdown Acceleration",
            "description": f"Project has consumed {expenditure_pct}% of total budget while completion is {physical_progress}% (remaining: ₹{remaining_cost:,.2f} Cr).",
            "severity": "HIGH" if gap > 15 else "MEDIUM",
            "traceability": f"Drawdown gap: +{gap}%"
        })

    if not drivers or cost_risk == "LOW":
        drivers.insert(0, {
            "type": "WITHIN_BUDGET",
            "title": "Within Budget & Target Parity",
            "description": f"Expenditure aligns with physical progress (ratio {expenditure_progress_ratio if expenditure_progress_ratio else 'N/A'}) and no major revision detected.",
            "severity": "LOW",
            "traceability": "Disbursements within scheduled progress bounds."
        })

    return drivers


def evaluate_time_risk(
    schedule_slippage_months: Optional[int],
    progress_gap: Optional[float],
    elapsed_duration_months: Optional[int] = None,
    project_duration_months: Optional[int] = None,
    physical_progress: Optional[float] = None,
    progress_trend: str = "STABLE",
    data_quality: str = "SUFFICIENT"
) -> Dict[str, Any]:
    """
    Evaluates time risk category based on deterministic PAIMANA indicators:
    
    HIGH TIME RISK IF:
    - Schedule Slippage > 12 months OR
    - Progress Gap > 15 pp OR
    - Project past original completion and progress < 85%
    
    MEDIUM TIME RISK IF:
    - Schedule Slippage between 3 and 12 months OR
    - Progress Gap between 5 and 15 pp OR
    - Historical Progress Trend is Deteriorating
    
    LOW TIME RISK IF:
    - Schedule Slippage <= 3 months AND Progress Gap <= 5 pp
    """
    if data_quality == "INSUFFICIENT_DATA":
        return {
            "time_risk": "INSUFFICIENT_DATA",
            "delay_risk": "INSUFFICIENT_DATA",
            "verdict": "Cannot compute time risk due to missing timeline parameters."
        }

    slippage = schedule_slippage_months if schedule_slippage_months is not None else 0
    gap = progress_gap if progress_gap is not None else 0.0

    is_past_deadline_low_prog = (
        elapsed_duration_months is not None
        and project_duration_months is not None
        and elapsed_duration_months >= project_duration_months
        and physical_progress is not None
        and physical_progress < 85.0
    )

    is_high = slippage > 12 or gap > 15.0 or is_past_deadline_low_prog
    is_med = (3 <= slippage <= 12) or (5.0 <= gap <= 15.0) or progress_trend == "DETERIORATING"

    if is_high:
        risk_level = "HIGH"
        verdict = "High Time Risk: Schedule slippage > 12 months, progress gap > 15 pp, or elapsed past deadline."
    elif is_med:
        risk_level = "MEDIUM"
        verdict = "Medium Time Risk: Moderate slippage (3-12 months) or progress lag (5-15 pp)."
    else:
        risk_level = "LOW"
        verdict = "Low Time Risk: Schedule slippage <= 3 months and actual physical progress tracks planned timeline."

    return {
        "time_risk": risk_level,
        "delay_risk": risk_level,
        "slippage_condition": f"Slippage: {slippage} mo",
        "gap_condition": f"Gap: {gap} pp",
        "verdict": verdict
    }


def generate_time_risk_drivers(
    schedule_slippage_months: Optional[int],
    progress_gap: Optional[float],
    physical_progress: Optional[float],
    elapsed_duration_months: Optional[int],
    project_duration_months: Optional[int],
    time_risk: str,
    progress_trend: str = "STABLE"
) -> List[Dict[str, Any]]:
    """Generates structured time-risk drivers with numerical evidence."""
    drivers = []

    if schedule_slippage_months is not None and schedule_slippage_months > 0:
        drivers.append({
            "type": "SCHEDULE_SLIPPAGE",
            "title": "Contractual Schedule Slippage",
            "description": f"Revised completion target has slipped by +{schedule_slippage_months} months past original contractual deadline.",
            "severity": "HIGH" if schedule_slippage_months > 12 else "MEDIUM",
            "traceability": f"Revised Completion - Original Completion = +{schedule_slippage_months} months"
        })
    elif schedule_slippage_months is not None and schedule_slippage_months < 0:
        drivers.append({
            "type": "ON_TRACK",
            "title": "Schedule Improvement",
            "description": f"Target completion date is {abs(schedule_slippage_months)} months ahead of baseline sanction.",
            "severity": "LOW",
            "traceability": f"Target is {abs(schedule_slippage_months)} months ahead"
        })

    if progress_gap is not None and progress_gap > 0:
        drivers.append({
            "type": "PROGRESS_GAP",
            "title": "Physical Progress Gap",
            "description": f"Actual physical completion lags derived expected progress by {progress_gap} percentage points.",
            "severity": "HIGH" if progress_gap > 15.0 else "MEDIUM",
            "traceability": f"Expected Progress - Actual Physical Progress = {progress_gap} pp"
        })

    if elapsed_duration_months and project_duration_months and physical_progress is not None:
        timeline_elapsed_pct = round((elapsed_duration_months / project_duration_months) * 100.0, 1)
        if timeline_elapsed_pct > physical_progress + 10:
            drivers.append({
                "type": "REMAINING_TIMELINE",
                "title": "Timeline Burn vs Scope Execution",
                "description": f"{timeline_elapsed_pct}% of planned duration has elapsed while physical works stand at {physical_progress}%.",
                "severity": "HIGH" if timeline_elapsed_pct > physical_progress + 25 else "MEDIUM",
                "traceability": f"Elapsed {elapsed_duration_months} mo / Planned {project_duration_months} mo ({timeline_elapsed_pct}%) vs {physical_progress}%"
            })

    if not drivers or time_risk == "LOW":
        drivers.insert(0, {
            "type": "ON_TRACK",
            "title": "Within Approved Timeline & Milestone Parity",
            "description": "Milestone delivery tracks physical targets; no critical path schedule slippage detected.",
            "severity": "LOW",
            "traceability": "Deterministic evaluation: Slippage <= 3 months and Progress Gap <= 5 pp."
        })

    return drivers

