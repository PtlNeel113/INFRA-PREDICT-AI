# Training Datasets

This directory stores versioned training datasets.

## Dataset Versions

### v1.0.0 (PENDING)
- **Status**: Not yet created
- **Reason**: Insufficient labeled data in database
- **Required**: 1000+ projects with ground truth labels

## Dataset Format

### Raw Projects (`projects_v{version}.csv`)

```csv
code,name,sector,state,ministry,implementing_agency,sanctioned_cost_cr,
start_date,expected_completion,expenditure_cr,physical_progress,
expected_progress,cost_risk_label,time_risk_label,execution_risk_label
```

### Features (`features_v{version}.csv`)

```csv
code,cost_overrun_pct,expenditure_ratio,progress_gap,expenditure_velocity,
physical_progress,expected_progress,project_age_days,sanctioned_cost_cr,
sector_encoded,state_encoded,implementing_agency_encoded,ministry_encoded,
cost_risk_label,time_risk_label,execution_risk_label
```

## Labels

### Cost Risk Label
- **LOW**: < 10% cost overrun
- **MEDIUM**: 10-25% cost overrun
- **HIGH**: 25-50% cost overrun
- **CRITICAL**: > 50% cost overrun

### Time Risk Label
- **LOW**: < 3 months delay
- **MEDIUM**: 3-6 months delay
- **HIGH**: 6-12 months delay
- **CRITICAL**: > 12 months delay

### Execution Risk Label
- **LOW**: No major issues
- **MEDIUM**: Minor challenges, on track
- **HIGH**: Significant challenges, intervention needed
- **CRITICAL**: Major problems, project at risk

## Data Sources

1. **Database Export**: Historical projects from PostgreSQL/SQLite
2. **Manual Labeling**: Expert-labeled risk outcomes
3. **External Data**: Government project completion reports
4. **PMU Records**: Project Management Unit assessments

## Quality Checks

Before using a dataset:
- [ ] At least 1000 total projects
- [ ] Balanced class distribution (not >70% in one class)
- [ ] < 20% missing values per feature
- [ ] No duplicate project codes
- [ ] All dates in valid format
- [ ] All labels in valid classes
- [ ] No future information leakage
