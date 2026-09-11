"""
Feature engineering pipeline for PAIMANA infrastructure projects.
Derives quantitative cost, schedule, and execution features with zero synthetic interpolation.
"""
from typing import Dict, Any, Optional

def compute_derived_cost_indicators(
    original_cost: float,
    revised_cost: Optional[float],
    expenditure: float,
    physical_progress: Optional[float]
) -> Dict[str, Any]:
    """
    Computes explainable, deterministic cost indicators from audited PAIMANA project inputs.
    
    Formulas:
    1. Cost Increase % = ((Revised Cost - Original Cost) / Original Cost) * 100
    2. Remaining Cost = Revised Cost - Cumulative Expenditure
    3. Expenditure % = (Cumulative Expenditure / Revised Cost) * 100
    4. Expenditure / Progress Ratio = Expenditure % / Physical Progress %
    """
    # Edge case: If revised cost missing or <= 0, fallback to original cost
    eff_revised_cost = revised_cost if (revised_cost is not None and revised_cost > 0) else original_cost
    
    # 1. Cost Increase %
    if original_cost > 0:
        cost_increase_pct = round(((eff_revised_cost - original_cost) / original_cost) * 100.0, 2)
    else:
        cost_increase_pct = 0.0

    # 2. Remaining Cost
    remaining_cost = round(eff_revised_cost - expenditure, 2)

    # 3. Expenditure %
    if eff_revised_cost > 0:
        expenditure_pct = round((expenditure / eff_revised_cost) * 100.0, 2)
    else:
        expenditure_pct = 0.0

    # 4. Expenditure / Progress Ratio
    # Avoid division by zero if physical progress is 0 or missing
    if physical_progress is not None and physical_progress > 0:
        expenditure_progress_ratio = round(expenditure_pct / physical_progress, 2)
    else:
        expenditure_progress_ratio = None

    return {
        "original_cost": original_cost,
        "revised_cost": eff_revised_cost,
        "expenditure": expenditure,
        "physical_progress": physical_progress if physical_progress is not None else 0.0,
        "cost_increase_pct": cost_increase_pct,
        "remaining_cost": remaining_cost,
        "expenditure_pct": expenditure_pct,
        "expenditure_progress_ratio": expenditure_progress_ratio,
    }


def parse_month_year(date_str: Optional[str]) -> Optional[Dict[str, int]]:
    """Safe date parser for MM/YYYY, YYYY-MM, or standard date strings."""
    if not date_str or not isinstance(date_str, str):
        return None
    clean = date_str.strip()
    if not clean or clean.upper() in ("TBD", "N/A"):
        return None
    
    import re
    mmyyyy = re.match(r"^(\d{1,2})/(\d{4})$", clean)
    if mmyyyy:
        m, y = int(mmyyyy.group(1)), int(mmyyyy.group(2))
        if 1 <= m <= 12 and 1990 <= y <= 2050:
            return {"year": y, "month": m}

    yyyymm = re.match(r"^(\d{4})-(\d{1,2})", clean)
    if yyyymm:
        y, m = int(yyyymm.group(1)), int(yyyymm.group(2))
        if 1 <= m <= 12 and 1990 <= y <= 2050:
            return {"year": y, "month": m}

    return None


def diff_months(d1: Optional[Dict[str, int]], d2: Optional[Dict[str, int]]) -> Optional[int]:
    """Calculates month difference (d2 - d1)."""
    if not d1 or not d2:
        return None
    return (d2["year"] - d1["year"]) * 12 + (d2["month"] - d1["month"])


def compute_derived_time_indicators(
    start_date: Optional[str],
    original_completion: Optional[str],
    revised_completion: Optional[str],
    physical_progress: Optional[float],
    current_reporting_date: str = "07/2026",
    is_completed: bool = False
) -> Dict[str, Any]:
    """
    Computes explainable, deterministic time & delay indicators from audited PAIMANA inputs.
    """
    start_p = parse_month_year(start_date)
    orig_p = parse_month_year(original_completion)
    rev_p = parse_month_year(revised_completion) if revised_completion else orig_p
    rep_p = parse_month_year(current_reporting_date) or {"year": 2026, "month": 7}

    # 1. Schedule Slippage (months)
    schedule_slippage_months = diff_months(orig_p, rev_p)

    # 2. Project Duration (Planned)
    project_duration_months = diff_months(start_p, orig_p)

    # 3. Elapsed Duration
    elapsed_duration_months = diff_months(start_p, rep_p)

    # 4. Remaining Duration
    remaining_duration_months = 0 if is_completed else diff_months(rep_p, rev_p)

    # 5. Expected Progress
    expected_progress = None
    if project_duration_months and project_duration_months > 0 and elapsed_duration_months is not None and elapsed_duration_months >= 0:
        expected_progress = round(min(100.0, max(0.0, (elapsed_duration_months / project_duration_months) * 100.0)), 1)

    # 6. Progress Gap (percentage points)
    progress_gap = None
    if expected_progress is not None and physical_progress is not None:
        progress_gap = round(expected_progress - physical_progress, 1)

    return {
        "start_date": start_date,
        "original_completion": original_completion,
        "revised_completion": revised_completion or original_completion,
        "current_reporting_date": current_reporting_date,
        "physical_progress": physical_progress,
        "schedule_slippage_months": schedule_slippage_months,
        "project_duration_months": project_duration_months,
        "elapsed_duration_months": elapsed_duration_months,
        "remaining_duration_months": remaining_duration_months,
        "is_completed": is_completed,
        "expected_progress": expected_progress,
        "progress_gap": progress_gap
    }
