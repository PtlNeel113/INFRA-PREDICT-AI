import { InfraProject } from '../types/projects';

/**
 * Official PAIMANA Central Sector Infrastructure Projects Dataset
 * Extracted directly from MoSPI PAIMANA Flash Reports (April, May, June, July 2026)
 */
export const PAIMANA_OFFICIAL_PROJECTS: InfraProject[] = [
  {
    "id": "612786",
    "code": "PAIMANA-612786",
    "name": "Construction of New Domestic Terminal Building and Allied Works at Kadapa Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 265.91,
    "revisedCostCr": 265.91,
    "expenditureCr": 176.38,
    "forecastCostCr": 265.91,
    "originalDeadline": "01/2026",
    "predictedCompletionDate": "09/2026",
    "expectedProgress": 89.6,
    "currentPhysicalProgress": 80.0,
    "progressGap": 9.6,
    "financialProgress": 66.3,
    "healthScore": 86,
    "riskLevel": "HIGH",
    "riskTrend": 5.0,
    "costRiskScore": 30,
    "timeRiskScore": 50,
    "executionRiskScore": 44,
    "predictedDelayMonths": 8,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Apron Expansion & Air Traffic Automation Interface",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 40.8,
    "impactScore": 53,
    "escalationStatus": "UNDER_REVIEW",
    "keyMilestones": [
      {
        "id": "m-612786-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2023",
        "actualDate": "03/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612786-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2024",
        "actualDate": "01/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612786-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "01/2026",
        "revisedDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 240,
        "criticalPath": true
      },
      {
        "id": "m-612786-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 240
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 612786 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Andhra Pradesh. Sanctioned budget of \u20b9265.91 Cr, current revised cost \u20b9265.91 Cr with \u20b9176.38 Cr spent to date (66.3% financial). Physical completion stands at 80.0%. Primary risk driver: Apron Expansion & Air Traffic Automation Interface. Prescriptive action: Expedite DGCA safety sign-off on radar calibration and terminal finishes.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b922.76 Cr with physical progress moving from 75.0% to 80.0% (+5.0%). Revised completion target: 09/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "75.0%",
          "current": "80.0%",
          "delta": "+5.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9153.62 Cr",
          "current": "\u20b9176.38 Cr",
          "delta": "+\u20b922.76 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "07/2026",
          "current": "09/2026",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 612786 (Airport Authority of India [AAI]).",
        "Approved date: 03/2023, Work started: 01/2024.",
        "Key focus: Apron Expansion & Air Traffic Automation Interface"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 48
      },
      {
        "date": "May 2026",
        "score": 44
      },
      {
        "date": "June 2026",
        "score": 40
      },
      {
        "date": "July 2026 (Live)",
        "score": 14
      },
      {
        "date": "August 2026 (P)",
        "score": 15,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 15,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 265.91,
        "revised": 265.91,
        "expenditure": 129.07,
        "forecast": 279.21
      },
      {
        "period": "May 2026",
        "sanctioned": 265.91,
        "revised": 265.91,
        "expenditure": 142.62,
        "forecast": 279.21
      },
      {
        "period": "June 2026",
        "sanctioned": 265.91,
        "revised": 265.91,
        "expenditure": 153.62,
        "forecast": 281.86
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 265.91,
        "revised": 265.91,
        "expenditure": 176.38,
        "forecast": 265.91
      }
    ],
    "startDate": "01/2024",
    "recommendedActions": [
      "Expedite DGCA safety sign-off on radar calibration and terminal finishes."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701107",
    "code": "PAIMANA-701107",
    "name": "Construction of New Integrated Terminal Building & Code E Apron at Vijayawada Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 611.8,
    "revisedCostCr": 824.28,
    "expenditureCr": 572.99,
    "forecastCostCr": 856.15,
    "originalDeadline": "09/2022",
    "predictedCompletionDate": "11/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 89.7,
    "progressGap": 10.3,
    "financialProgress": 69.5,
    "healthScore": 48,
    "riskLevel": "CRITICAL",
    "riskTrend": -0.4,
    "costRiskScore": 54,
    "timeRiskScore": 98,
    "executionRiskScore": 46,
    "predictedDelayMonths": 50,
    "predictedCostOverrunCr": 212.48000000000002,
    "primaryRiskDriver": "Structural Glazing & Specialized Baggage Handling Integration",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 70.0,
    "impactScore": 64,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701107-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "06/2020",
        "actualDate": "06/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701107-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "09/2020",
        "actualDate": "09/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701107-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2022",
        "revisedDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 1500,
        "criticalPath": true
      },
      {
        "id": "m-701107-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 1500
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701107 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Andhra Pradesh. Sanctioned budget of \u20b9611.80 Cr, current revised cost \u20b9824.28 Cr with \u20b9572.99 Cr spent to date (69.5% financial). Physical completion stands at 89.7%. Primary risk driver: Structural Glazing & Specialized Baggage Handling Integration. Prescriptive action: Approve revised cost estimate tranche and complete baggage X-ray commissioning.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b945.25 Cr with physical progress moving from 88.2% to 89.7% (+1.4%). Revised completion target: 11/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "88.2%",
          "current": "89.7%",
          "delta": "+1.4%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9527.74 Cr",
          "current": "\u20b9572.99 Cr",
          "delta": "+\u20b945.25 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "10/2026",
          "current": "11/2026",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701107 (Airport Authority of India [AAI]).",
        "Approved date: 06/2020, Work started: 09/2020.",
        "Key focus: Structural Glazing & Specialized Baggage Handling Integration"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 52
      },
      {
        "date": "August 2026 (P)",
        "score": 54,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 56,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 611.8,
        "revised": 611.8,
        "expenditure": 523.14,
        "forecast": 642.39
      },
      {
        "period": "May 2026",
        "sanctioned": 611.8,
        "revised": 611.8,
        "expenditure": 523.14,
        "forecast": 642.39
      },
      {
        "period": "June 2026",
        "sanctioned": 611.8,
        "revised": 611.8,
        "expenditure": 527.74,
        "forecast": 648.51
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 611.8,
        "revised": 824.28,
        "expenditure": 572.99,
        "forecast": 856.15
      }
    ],
    "startDate": "09/2020",
    "recommendedActions": [
      "Approve revised cost estimate tranche and complete baggage X-ray commissioning."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701121",
    "code": "PAIMANA-701121",
    "name": "Construction of New Domestic Terminal Building at Rajahmundry Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 347.15,
    "revisedCostCr": 347.15,
    "expenditureCr": 189.48,
    "forecastCostCr": 347.15,
    "originalDeadline": "08/2025",
    "predictedCompletionDate": "08/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 96.0,
    "progressGap": 4.0,
    "financialProgress": 54.6,
    "healthScore": 82,
    "riskLevel": "HIGH",
    "riskTrend": 3.0,
    "costRiskScore": 30,
    "timeRiskScore": 60,
    "executionRiskScore": 33,
    "predictedDelayMonths": 12,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Terminal Internal Fitouts & HVAC Commissioning",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 42.6,
    "impactScore": 56,
    "escalationStatus": "UNDER_REVIEW",
    "keyMilestones": [
      {
        "id": "m-701121-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "12/2022",
        "actualDate": "12/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701121-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "08/2023",
        "actualDate": "08/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701121-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "08/2025",
        "revisedDate": "08/2026",
        "status": "DELAYED",
        "delayDays": 360,
        "criticalPath": true
      },
      {
        "id": "m-701121-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "08/2026",
        "status": "ON_TRACK",
        "delayDays": 360
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701121 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Andhra Pradesh. Sanctioned budget of \u20b9347.15 Cr, current revised cost \u20b9347.15 Cr with \u20b9189.48 Cr spent to date (54.6% financial). Physical completion stands at 96.0%. Primary risk driver: Terminal Internal Fitouts & HVAC Commissioning. Prescriptive action: Clear final MEP testing and schedule joint trial operations with airlines.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 94.5% to 96.0% (+1.5%). Revised completion target: 08/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "94.5%",
          "current": "96.0%",
          "delta": "+1.5%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9189.48 Cr",
          "current": "\u20b9189.48 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "08/2026",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701121 (Airport Authority of India [AAI]).",
        "Approved date: 12/2022, Work started: 08/2023.",
        "Key focus: Terminal Internal Fitouts & HVAC Commissioning"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 27
      },
      {
        "date": "May 2026",
        "score": 25
      },
      {
        "date": "June 2026",
        "score": 22
      },
      {
        "date": "July 2026 (Live)",
        "score": 18
      },
      {
        "date": "August 2026 (P)",
        "score": 19,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 19,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 347.15,
        "revised": 347.15,
        "expenditure": 170.79,
        "forecast": 364.51
      },
      {
        "period": "May 2026",
        "sanctioned": 347.15,
        "revised": 347.15,
        "expenditure": 189.48,
        "forecast": 364.51
      },
      {
        "period": "June 2026",
        "sanctioned": 347.15,
        "revised": 347.15,
        "expenditure": 189.48,
        "forecast": 367.98
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 347.15,
        "revised": 347.15,
        "expenditure": 189.48,
        "forecast": 347.15
      }
    ],
    "startDate": "08/2023",
    "recommendedActions": [
      "Clear final MEP testing and schedule joint trial operations with airlines."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "706724",
    "code": "PAIMANA-706724",
    "name": "Guwahati Airport New Integrated Terminal Building Construction Project",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Assam",
    "stage": "Near Completion",
    "implementingAgency": "Adani Airport Holdings Limited",
    "sanctionedCostCr": 1712.0,
    "revisedCostCr": 2520.0,
    "expenditureCr": 2670.23,
    "forecastCostCr": 2641.2,
    "originalDeadline": "03/2025",
    "predictedCompletionDate": "06/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 99.5,
    "progressGap": 0.5,
    "financialProgress": 106.0,
    "healthScore": 54,
    "riskLevel": "CRITICAL",
    "riskTrend": 1.1,
    "costRiskScore": 63,
    "timeRiskScore": 68,
    "executionRiskScore": 26,
    "predictedDelayMonths": 15,
    "predictedCostOverrunCr": 808.0,
    "primaryRiskDriver": "Multi-Tier Road Canopy & Security Hold Area Handover",
    "secondaryRiskDriver": "Nodal Agency: Adani Airport Holdings Limited",
    "priorityScore": 57.6,
    "impactScore": 75,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-706724-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "12/2016",
        "actualDate": "12/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-706724-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2018",
        "actualDate": "03/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-706724-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2025",
        "revisedDate": "06/2026",
        "status": "DELAYED",
        "delayDays": 450,
        "criticalPath": true
      },
      {
        "id": "m-706724-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2026",
        "status": "ON_TRACK",
        "delayDays": 450
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 706724 monitored by MoSPI. Implemented by Adani Airport Holdings Limited in Assam. Sanctioned budget of \u20b91,712.00 Cr, current revised cost \u20b92,520.00 Cr with \u20b92,670.23 Cr spent to date (106.0% financial). Physical completion stands at 99.5%. Primary risk driver: Multi-Tier Road Canopy & Security Hold Area Handover. Prescriptive action: Finalize commercial concessionaire spaces and conduct BCAS security audit.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b910.08 Cr with physical progress moving from 99.3% to 99.5% (+0.2%). Revised completion target: 06/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "99.3%",
          "current": "99.5%",
          "delta": "+0.2%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b92660.15 Cr",
          "current": "\u20b92670.23 Cr",
          "delta": "+\u20b910.08 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "06/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 706724 (Adani Airport Holdings Limited).",
        "Approved date: 12/2016, Work started: 03/2018.",
        "Key focus: Multi-Tier Road Canopy & Security Hold Area Handover"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 46
      },
      {
        "date": "August 2026 (P)",
        "score": 48,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 50,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1712.0,
        "revised": 2520.0,
        "expenditure": 2627.39,
        "forecast": 2646.0
      },
      {
        "period": "May 2026",
        "sanctioned": 1712.0,
        "revised": 2520.0,
        "expenditure": 2639.99,
        "forecast": 2646.0
      },
      {
        "period": "June 2026",
        "sanctioned": 1712.0,
        "revised": 2520.0,
        "expenditure": 2660.15,
        "forecast": 2671.2
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1712.0,
        "revised": 2520.0,
        "expenditure": 2670.23,
        "forecast": 2641.2
      }
    ],
    "startDate": "03/2018",
    "recommendedActions": [
      "Finalize commercial concessionaire spaces and conduct BCAS security audit."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "612183",
    "code": "PAIMANA-612183",
    "name": "Development of New Civil Enclave at Bihta Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Bihar",
    "stage": "Pre-Construction",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 1413.0,
    "revisedCostCr": 1413.0,
    "expenditureCr": 15.53,
    "forecastCostCr": 1413.0,
    "originalDeadline": "03/2027",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 4.2,
    "currentPhysicalProgress": 4.15,
    "progressGap": 0.0,
    "financialProgress": 1.1,
    "healthScore": 68,
    "riskLevel": "WATCH",
    "riskTrend": 0.3,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Air Force Boundary Demarcation & Runway Access Road",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 29.0,
    "impactScore": 69,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-612183-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "08/2024",
        "actualDate": "08/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612183-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "04/2025",
        "actualDate": "04/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612183-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2027",
        "revisedDate": "03/2027",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-612183-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 612183 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Bihar. Sanctioned budget of \u20b91,413.00 Cr, current revised cost \u20b91,413.00 Cr with \u20b915.53 Cr spent to date (1.1% financial). Physical completion stands at 4.2%. Primary risk driver: Air Force Boundary Demarcation & Runway Access Road. Prescriptive action: Coordinate with Ministry of Defence for smooth perimeter wall construction.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b95.97 Cr with physical progress moving from 2.9% to 4.2% (+1.3%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "2.9%",
          "current": "4.2%",
          "delta": "+1.3%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b99.56 Cr",
          "current": "\u20b915.53 Cr",
          "delta": "+\u20b95.97 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 612183 (Airport Authority of India [AAI]).",
        "Approved date: 08/2024, Work started: 04/2025.",
        "Key focus: Air Force Boundary Demarcation & Runway Access Road"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 95
      },
      {
        "date": "May 2026",
        "score": 95
      },
      {
        "date": "June 2026",
        "score": 95
      },
      {
        "date": "July 2026 (Live)",
        "score": 32
      },
      {
        "date": "August 2026 (P)",
        "score": 33,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 35,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1413.0,
        "revised": 1413.0,
        "expenditure": 7.64,
        "forecast": 1483.65
      },
      {
        "period": "May 2026",
        "sanctioned": 1413.0,
        "revised": 1413.0,
        "expenditure": 7.64,
        "forecast": 1483.65
      },
      {
        "period": "June 2026",
        "sanctioned": 1413.0,
        "revised": 1413.0,
        "expenditure": 9.56,
        "forecast": 1497.78
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1413.0,
        "revised": 1413.0,
        "expenditure": 15.53,
        "forecast": 1413.0
      }
    ],
    "startDate": "04/2025",
    "recommendedActions": [
      "Coordinate with Ministry of Defence for smooth perimeter wall construction."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "612194",
    "code": "PAIMANA-612194",
    "name": "Development of New Civil Enclave and Allied Works at Darbhanga Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Bihar",
    "stage": "Under Construction",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 911.66,
    "revisedCostCr": 911.66,
    "expenditureCr": 426.22,
    "forecastCostCr": 911.66,
    "originalDeadline": "07/2026",
    "predictedCompletionDate": "11/2026",
    "expectedProgress": 75.9,
    "currentPhysicalProgress": 71.1,
    "progressGap": 4.8,
    "financialProgress": 46.8,
    "healthScore": 88,
    "riskLevel": "WATCH",
    "riskTrend": 3.5,
    "costRiskScore": 30,
    "timeRiskScore": 40,
    "executionRiskScore": 35,
    "predictedDelayMonths": 4,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Low-lying Embankment Filling & Drainage Culverts",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 35.0,
    "impactScore": 65,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-612194-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2024",
        "actualDate": "07/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612194-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2024",
        "actualDate": "07/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-612194-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2026",
        "revisedDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 120,
        "criticalPath": true
      },
      {
        "id": "m-612194-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 120
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 612194 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Bihar. Sanctioned budget of \u20b9911.66 Cr, current revised cost \u20b9911.66 Cr with \u20b9426.22 Cr spent to date (46.8% financial). Physical completion stands at 71.1%. Primary risk driver: Low-lying Embankment Filling & Drainage Culverts. Prescriptive action: Mobilize high-capacity pumps for monsoon drainage and accelerate apron sub-base.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b925.60 Cr with physical progress moving from 69.8% to 71.1% (+1.3%). Revised completion target: 11/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "69.8%",
          "current": "71.1%",
          "delta": "+1.3%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9400.62 Cr",
          "current": "\u20b9426.22 Cr",
          "delta": "+\u20b925.60 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "11/2026",
          "current": "11/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 612194 (Airport Authority of India [AAI]).",
        "Approved date: 07/2024, Work started: 07/2024.",
        "Key focus: Low-lying Embankment Filling & Drainage Culverts"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 51
      },
      {
        "date": "May 2026",
        "score": 49
      },
      {
        "date": "June 2026",
        "score": 47
      },
      {
        "date": "July 2026 (Live)",
        "score": 12
      },
      {
        "date": "August 2026 (P)",
        "score": 12,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 13,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 911.66,
        "revised": 911.66,
        "expenditure": 374.49,
        "forecast": 957.24
      },
      {
        "period": "May 2026",
        "sanctioned": 911.66,
        "revised": 911.66,
        "expenditure": 386.24,
        "forecast": 957.24
      },
      {
        "period": "June 2026",
        "sanctioned": 911.66,
        "revised": 911.66,
        "expenditure": 400.62,
        "forecast": 966.36
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 911.66,
        "revised": 911.66,
        "expenditure": 426.22,
        "forecast": 911.66
      }
    ],
    "startDate": "07/2024",
    "recommendedActions": [
      "Mobilize high-capacity pumps for monsoon drainage and accelerate apron sub-base."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701101",
    "code": "PAIMANA-701101",
    "name": "Construction of New Domestic Terminal Building [Phase I & II] at JPNI Airport Patna",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Bihar",
    "stage": "Near Completion",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 1216.9,
    "revisedCostCr": 1216.9,
    "expenditureCr": 1203.48,
    "forecastCostCr": 1216.9,
    "originalDeadline": "05/2026",
    "predictedCompletionDate": "08/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 99.26,
    "progressGap": 0.7,
    "financialProgress": 98.9,
    "healthScore": 96,
    "riskLevel": "WATCH",
    "riskTrend": 0.9,
    "costRiskScore": 30,
    "timeRiskScore": 38,
    "executionRiskScore": 26,
    "predictedDelayMonths": 3,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Multi-Level Car Parking & Elevated Departure Flyover",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 32.4,
    "impactScore": 68,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-701101-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2018",
        "actualDate": "10/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701101-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "10/2018",
        "actualDate": "10/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701101-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "05/2026",
        "revisedDate": "08/2026",
        "status": "DELAYED",
        "delayDays": 90,
        "criticalPath": true
      },
      {
        "id": "m-701101-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "08/2026",
        "status": "ON_TRACK",
        "delayDays": 90
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701101 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Bihar. Sanctioned budget of \u20b91,216.90 Cr, current revised cost \u20b91,216.90 Cr with \u20b91,203.48 Cr spent to date (98.9% financial). Physical completion stands at 99.3%. Primary risk driver: Multi-Level Car Parking & Elevated Departure Flyover. Prescriptive action: Issue readiness certificate for Phase I commercial commissioning.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b91.41 Cr with physical progress moving from 99.2% to 99.3% (+0.1%). Revised completion target: 08/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "99.2%",
          "current": "99.3%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b91202.07 Cr",
          "current": "\u20b91203.48 Cr",
          "delta": "+\u20b91.41 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "08/2026",
          "current": "08/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701101 (Airport Authority of India [AAI]).",
        "Approved date: 10/2018, Work started: 10/2018.",
        "Key focus: Multi-Level Car Parking & Elevated Departure Flyover"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 29
      },
      {
        "date": "May 2026",
        "score": 28
      },
      {
        "date": "June 2026",
        "score": 28
      },
      {
        "date": "July 2026 (Live)",
        "score": 4
      },
      {
        "date": "August 2026 (P)",
        "score": 4,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 4,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1216.9,
        "revised": 1216.9,
        "expenditure": 1200.67,
        "forecast": 1277.75
      },
      {
        "period": "May 2026",
        "sanctioned": 1216.9,
        "revised": 1216.9,
        "expenditure": 1201.92,
        "forecast": 1277.75
      },
      {
        "period": "June 2026",
        "sanctioned": 1216.9,
        "revised": 1216.9,
        "expenditure": 1202.07,
        "forecast": 1289.91
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1216.9,
        "revised": 1216.9,
        "expenditure": 1203.48,
        "forecast": 1216.9
      }
    ],
    "startDate": "10/2018",
    "recommendedActions": [
      "Issue readiness certificate for Phase I commercial commissioning."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701126",
    "code": "PAIMANA-701126",
    "name": "Development of Dholera International Greenfield Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Gujarat",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 1305.0,
    "revisedCostCr": 1551.0,
    "expenditureCr": 966.36,
    "forecastCostCr": 1587.9,
    "originalDeadline": "06/2026",
    "predictedCompletionDate": "09/2026",
    "expectedProgress": 91.6,
    "currentPhysicalProgress": 88.0,
    "progressGap": 3.6,
    "financialProgress": 62.3,
    "healthScore": 86,
    "riskLevel": "HIGH",
    "riskTrend": 4.0,
    "costRiskScore": 43,
    "timeRiskScore": 38,
    "executionRiskScore": 32,
    "predictedDelayMonths": 3,
    "predictedCostOverrunCr": 246.0,
    "primaryRiskDriver": "Runway 03/21 Bituminous Paving & Instrument Landing System (ILS)",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 38.8,
    "impactScore": 70,
    "escalationStatus": "UNDER_REVIEW",
    "keyMilestones": [
      {
        "id": "m-701126-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "06/2022",
        "actualDate": "06/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701126-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2022",
        "actualDate": "07/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701126-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2026",
        "revisedDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 90,
        "criticalPath": true
      },
      {
        "id": "m-701126-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 90
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701126 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Gujarat. Sanctioned budget of \u20b91,305.00 Cr, current revised cost \u20b91,551.00 Cr with \u20b9966.36 Cr spent to date (62.3% financial). Physical completion stands at 88.0%. Primary risk driver: Runway 03/21 Bituminous Paving & Instrument Landing System (ILS). Prescriptive action: Deploy AAI flight calibration aircraft and certify airfield lighting category.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b917.12 Cr with physical progress moving from 87.0% to 88.0% (+1.0%). Revised completion target: 09/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "87.0%",
          "current": "88.0%",
          "delta": "+1.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9949.24 Cr",
          "current": "\u20b9966.36 Cr",
          "delta": "+\u20b917.12 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "09/2026",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701126 (Airport Authority of India [AAI]).",
        "Approved date: 06/2022, Work started: 07/2022.",
        "Key focus: Runway 03/21 Bituminous Paving & Instrument Landing System (ILS)"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 40
      },
      {
        "date": "May 2026",
        "score": 38
      },
      {
        "date": "June 2026",
        "score": 36
      },
      {
        "date": "July 2026 (Live)",
        "score": 14
      },
      {
        "date": "August 2026 (P)",
        "score": 15,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 15,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1305.0,
        "revised": 1551.0,
        "expenditure": 896.82,
        "forecast": 1628.55
      },
      {
        "period": "May 2026",
        "sanctioned": 1305.0,
        "revised": 1551.0,
        "expenditure": 922.78,
        "forecast": 1628.55
      },
      {
        "period": "June 2026",
        "sanctioned": 1305.0,
        "revised": 1551.0,
        "expenditure": 949.24,
        "forecast": 1644.06
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1305.0,
        "revised": 1551.0,
        "expenditure": 966.36,
        "forecast": 1587.9
      }
    ],
    "startDate": "07/2022",
    "recommendedActions": [
      "Deploy AAI flight calibration aircraft and certify airfield lighting category."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "611047",
    "code": "PAIMANA-611047",
    "name": "Construction of NTB Complex and Apron on Tawi River Side at CA Jammu Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Jammu and Kashmir",
    "stage": "Under Construction",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 861.37,
    "revisedCostCr": 861.37,
    "expenditureCr": 370.44,
    "forecastCostCr": 861.37,
    "originalDeadline": "06/2026",
    "predictedCompletionDate": "11/2026",
    "expectedProgress": 64.3,
    "currentPhysicalProgress": 58.35,
    "progressGap": 5.9,
    "financialProgress": 43.0,
    "healthScore": 82,
    "riskLevel": "WATCH",
    "riskTrend": 1.0,
    "costRiskScore": 30,
    "timeRiskScore": 42,
    "executionRiskScore": 37,
    "predictedDelayMonths": 5,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Tawi River Retaining Wall & Slope Protection Works",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 36.2,
    "impactScore": 65,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-611047-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2023",
        "actualDate": "10/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611047-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "12/2023",
        "actualDate": "12/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611047-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2026",
        "revisedDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 150,
        "criticalPath": true
      },
      {
        "id": "m-611047-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "11/2026",
        "status": "DELAYED",
        "delayDays": 150
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 611047 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Jammu and Kashmir. Sanctioned budget of \u20b9861.37 Cr, current revised cost \u20b9861.37 Cr with \u20b9370.44 Cr spent to date (43.0% financial). Physical completion stands at 58.4%. Primary risk driver: Tawi River Retaining Wall & Slope Protection Works. Prescriptive action: Expedite river bank protection gabion blocks and complete steel truss erection.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b916.90 Cr with physical progress moving from 55.4% to 58.4% (+3.0%). Revised completion target: 11/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "55.4%",
          "current": "58.4%",
          "delta": "+3.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9353.54 Cr",
          "current": "\u20b9370.44 Cr",
          "delta": "+\u20b916.90 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "11/2026",
          "current": "11/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 611047 (Airport Authority of India [AAI]).",
        "Approved date: 10/2023, Work started: 12/2023.",
        "Key focus: Tawi River Retaining Wall & Slope Protection Works"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 60
      },
      {
        "date": "May 2026",
        "score": 58
      },
      {
        "date": "June 2026",
        "score": 56
      },
      {
        "date": "July 2026 (Live)",
        "score": 18
      },
      {
        "date": "August 2026 (P)",
        "score": 19,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 19,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 861.37,
        "revised": 861.37,
        "expenditure": 319.5,
        "forecast": 904.44
      },
      {
        "period": "May 2026",
        "sanctioned": 861.37,
        "revised": 861.37,
        "expenditure": 327.3,
        "forecast": 904.44
      },
      {
        "period": "June 2026",
        "sanctioned": 861.37,
        "revised": 861.37,
        "expenditure": 353.54,
        "forecast": 913.05
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 861.37,
        "revised": 861.37,
        "expenditure": 370.44,
        "forecast": 861.37
      }
    ],
    "startDate": "12/2023",
    "recommendedActions": [
      "Expedite river bank protection gabion blocks and complete steel truss erection."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400010",
    "code": "PAIMANA-400010",
    "name": "Construction of Terminal Building & Associated Works at Leh Airport",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Ladakh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 480.0,
    "revisedCostCr": 640.0,
    "expenditureCr": 512.55,
    "forecastCostCr": 664.0,
    "originalDeadline": "09/2021",
    "predictedCompletionDate": "07/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 88.0,
    "progressGap": 12.0,
    "financialProgress": 80.1,
    "healthScore": 48,
    "riskLevel": "CRITICAL",
    "riskTrend": -0.1,
    "costRiskScore": 53,
    "timeRiskScore": 98,
    "executionRiskScore": 49,
    "predictedDelayMonths": 58,
    "predictedCostOverrunCr": 160.0,
    "primaryRiskDriver": "Sub-Zero Cladding Insulation & Geothermal Heating Integration",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 70.2,
    "impactScore": 62,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-400010-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2018",
        "actualDate": "07/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400010-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "09/2018",
        "actualDate": "09/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400010-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2021",
        "revisedDate": "07/2026",
        "status": "DELAYED",
        "delayDays": 1740,
        "criticalPath": true
      },
      {
        "id": "m-400010-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "07/2026",
        "status": "DELAYED",
        "delayDays": 1740
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400010 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Ladakh. Sanctioned budget of \u20b9480.00 Cr, current revised cost \u20b9640.00 Cr with \u20b9512.55 Cr spent to date (80.1% financial). Physical completion stands at 88.0%. Primary risk driver: Sub-Zero Cladding Insulation & Geothermal Heating Integration. Prescriptive action: Complete heating and air-handling commissioning before winter freezing.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b93.14 Cr with physical progress moving from 83.4% to 88.0% (+4.6%). Revised completion target: 07/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "83.4%",
          "current": "88.0%",
          "delta": "+4.6%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9509.41 Cr",
          "current": "\u20b9512.55 Cr",
          "delta": "+\u20b93.14 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "07/2026",
          "current": "07/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400010 (Airport Authority of India [AAI]).",
        "Approved date: 07/2018, Work started: 09/2018.",
        "Key focus: Sub-Zero Cladding Insulation & Geothermal Heating Integration"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 52
      },
      {
        "date": "August 2026 (P)",
        "score": 54,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 56,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 480.0,
        "revised": 640.0,
        "expenditure": 501.81,
        "forecast": 672.0
      },
      {
        "period": "May 2026",
        "sanctioned": 480.0,
        "revised": 640.0,
        "expenditure": 506.13,
        "forecast": 672.0
      },
      {
        "period": "June 2026",
        "sanctioned": 480.0,
        "revised": 640.0,
        "expenditure": 509.41,
        "forecast": 678.4
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 480.0,
        "revised": 640.0,
        "expenditure": 512.55,
        "forecast": 664.0
      }
    ],
    "startDate": "09/2018",
    "recommendedActions": [
      "Complete heating and air-handling commissioning before winter freezing."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "611602",
    "code": "PAIMANA-611602",
    "name": "Modernization of Chennai Airport Phase II (Part 2)",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Tamil Nadu",
    "stage": "Under Construction",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 1207.0,
    "revisedCostCr": 1207.0,
    "expenditureCr": 331.85,
    "forecastCostCr": 1207.0,
    "originalDeadline": "07/2025",
    "predictedCompletionDate": "12/2026",
    "expectedProgress": 66.4,
    "currentPhysicalProgress": 46.0,
    "progressGap": 20.4,
    "financialProgress": 27.5,
    "healthScore": 59,
    "riskLevel": "CRITICAL",
    "riskTrend": 3.0,
    "costRiskScore": 30,
    "timeRiskScore": 72,
    "executionRiskScore": 66,
    "predictedDelayMonths": 17,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Demolition of Old Domestic Terminal & Basement Diaphragm Wall",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 54.0,
    "impactScore": 68,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-611602-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "05/2018",
        "actualDate": "05/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611602-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "06/2023",
        "actualDate": "06/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611602-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2025",
        "revisedDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 510,
        "criticalPath": true
      },
      {
        "id": "m-611602-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 510
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 611602 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Tamil Nadu. Sanctioned budget of \u20b91,207.00 Cr, current revised cost \u20b91,207.00 Cr with \u20b9331.85 Cr spent to date (27.5% financial). Physical completion stands at 46.0%. Primary risk driver: Demolition of Old Domestic Terminal & Basement Diaphragm Wall. Prescriptive action: Coordinate passenger flow re-routing with airlines to expand work fronts.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b917.70 Cr with physical progress moving from 43.5% to 46.0% (+2.5%). Revised completion target: 12/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "43.5%",
          "current": "46.0%",
          "delta": "+2.5%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9314.15 Cr",
          "current": "\u20b9331.85 Cr",
          "delta": "+\u20b917.70 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2026",
          "current": "12/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 611602 (Airport Authority of India [AAI]).",
        "Approved date: 05/2018, Work started: 06/2023.",
        "Key focus: Demolition of Old Domestic Terminal & Basement Diaphragm Wall"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 60
      },
      {
        "date": "May 2026",
        "score": 56
      },
      {
        "date": "June 2026",
        "score": 53
      },
      {
        "date": "July 2026 (Live)",
        "score": 41
      },
      {
        "date": "August 2026 (P)",
        "score": 43,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 44,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1207.0,
        "revised": 1207.0,
        "expenditure": 289.5,
        "forecast": 1267.35
      },
      {
        "period": "May 2026",
        "sanctioned": 1207.0,
        "revised": 1207.0,
        "expenditure": 310.98,
        "forecast": 1267.35
      },
      {
        "period": "June 2026",
        "sanctioned": 1207.0,
        "revised": 1207.0,
        "expenditure": 314.15,
        "forecast": 1279.42
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1207.0,
        "revised": 1207.0,
        "expenditure": 331.85,
        "forecast": 1207.0
      }
    ],
    "startDate": "06/2023",
    "recommendedActions": [
      "Coordinate passenger flow re-routing with airlines to expand work fronts."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701113",
    "code": "PAIMANA-701113",
    "name": "Development of Lal Bahadur Shastri International Airport Varanasi (Runway Extension & NTB)",
    "sector": "Civil Aviation",
    "ministry": "MoCA",
    "state": "Uttar Pradesh",
    "stage": "Under Construction",
    "implementingAgency": "Airport Authority of India [AAI]",
    "sanctionedCostCr": 2869.65,
    "revisedCostCr": 2869.65,
    "expenditureCr": 746.93,
    "forecastCostCr": 2869.65,
    "originalDeadline": "07/2027",
    "predictedCompletionDate": "07/2027",
    "expectedProgress": 33.0,
    "currentPhysicalProgress": 33.0,
    "progressGap": 0.0,
    "financialProgress": 26.0,
    "healthScore": 79,
    "riskLevel": "WATCH",
    "riskTrend": 2.0,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "NH-31 Highway Tunnel Underpass beneath Runway",
    "secondaryRiskDriver": "Nodal Agency: Airport Authority of India [AAI]",
    "priorityScore": 29.0,
    "impactScore": 76,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-701113-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2024",
        "actualDate": "07/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701113-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2024",
        "actualDate": "07/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701113-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2027",
        "revisedDate": "07/2027",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-701113-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "07/2027",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701113 monitored by MoSPI. Implemented by Airport Authority of India [AAI] in Uttar Pradesh. Sanctioned budget of \u20b92,869.65 Cr, current revised cost \u20b92,869.65 Cr with \u20b9746.93 Cr spent to date (26.0% financial). Physical completion stands at 33.0%. Primary risk driver: NH-31 Highway Tunnel Underpass beneath Runway. Prescriptive action: Finalize underground tunnel excavation lining with NHAI.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b969.72 Cr with physical progress moving from 31.0% to 33.0% (+2.0%). Revised completion target: 07/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "31.0%",
          "current": "33.0%",
          "delta": "+2.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9677.21 Cr",
          "current": "\u20b9746.93 Cr",
          "delta": "+\u20b969.72 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "07/2027",
          "current": "07/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701113 (Airport Authority of India [AAI]).",
        "Approved date: 07/2024, Work started: 07/2024.",
        "Key focus: NH-31 Highway Tunnel Underpass beneath Runway"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 81
      },
      {
        "date": "May 2026",
        "score": 80
      },
      {
        "date": "June 2026",
        "score": 78
      },
      {
        "date": "July 2026 (Live)",
        "score": 21
      },
      {
        "date": "August 2026 (P)",
        "score": 22,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 23,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 2869.65,
        "revised": 2869.65,
        "expenditure": 572.04,
        "forecast": 3013.13
      },
      {
        "period": "May 2026",
        "sanctioned": 2869.65,
        "revised": 2869.65,
        "expenditure": 626.15,
        "forecast": 3013.13
      },
      {
        "period": "June 2026",
        "sanctioned": 2869.65,
        "revised": 2869.65,
        "expenditure": 677.21,
        "forecast": 3041.83
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 2869.65,
        "revised": 2869.65,
        "expenditure": 746.93,
        "forecast": 2869.65
      }
    ],
    "startDate": "07/2024",
    "recommendedActions": [
      "Finalize underground tunnel excavation lining with NHAI."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400424",
    "code": "PAIMANA-400424",
    "name": "GEVRA OC [70 MTY]",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Chhattisgarh",
    "stage": "Under Construction",
    "implementingAgency": "South Eastern Coalfields Limited [SECL]",
    "sanctionedCostCr": 11816.4,
    "revisedCostCr": 11816.4,
    "expenditureCr": 7825.46,
    "forecastCostCr": 11816.4,
    "originalDeadline": "03/2023",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 78.48,
    "progressGap": 21.5,
    "financialProgress": 66.2,
    "healthScore": 62,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.0,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 68,
    "predictedDelayMonths": 48,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Forest Land Stage-II Diversion & Heavy Earthmoving Machinery (HEMM) Deployment",
    "secondaryRiskDriver": "Nodal Agency: South Eastern Coalfields Limited [SECL]",
    "priorityScore": 64.8,
    "impactScore": 90,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-400424-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2016",
        "actualDate": "03/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400424-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2016",
        "actualDate": "03/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400424-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2023",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1440,
        "criticalPath": true
      },
      {
        "id": "m-400424-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1440
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400424 monitored by MoSPI. Implemented by South Eastern Coalfields Limited [SECL] in Chhattisgarh. Sanctioned budget of \u20b911,816.40 Cr, current revised cost \u20b911,816.40 Cr with \u20b97,825.46 Cr spent to date (66.2% financial). Physical completion stands at 78.5%. Primary risk driver: Forest Land Stage-II Diversion & Heavy Earthmoving Machinery (HEMM) Deployment. Prescriptive action: Expedite environmental clearance for 70 MTPA peak throughput compliance.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9865.23 Cr with physical progress moving from 78.5% to 78.5% (+0.0%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "78.5%",
          "current": "78.5%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b96960.23 Cr",
          "current": "\u20b97825.46 Cr",
          "delta": "+\u20b9865.23 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400424 (South Eastern Coalfields Limited [SECL]).",
        "Approved date: 03/2016, Work started: 03/2016.",
        "Key focus: Forest Land Stage-II Diversion & Heavy Earthmoving Machinery (HEMM) Deployment"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 38
      },
      {
        "date": "August 2026 (P)",
        "score": 40,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 41,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 11816.4,
        "revised": 11816.4,
        "expenditure": 6905.46,
        "forecast": 12407.22
      },
      {
        "period": "May 2026",
        "sanctioned": 11816.4,
        "revised": 11816.4,
        "expenditure": 6922.36,
        "forecast": 12407.22
      },
      {
        "period": "June 2026",
        "sanctioned": 11816.4,
        "revised": 11816.4,
        "expenditure": 6960.23,
        "forecast": 12525.38
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 11816.4,
        "revised": 11816.4,
        "expenditure": 7825.46,
        "forecast": 11816.4
      }
    ],
    "startDate": "03/2016",
    "recommendedActions": [
      "Expedite environmental clearance for 70 MTPA peak throughput compliance."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400354",
    "code": "PAIMANA-400354",
    "name": "DIPKA EXPANSION OCP [40 MTY]",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Chhattisgarh",
    "stage": "Under Construction",
    "implementingAgency": "South Eastern Coalfields Limited [SECL]",
    "sanctionedCostCr": 5241.4,
    "revisedCostCr": 5241.4,
    "expenditureCr": 2941.23,
    "forecastCostCr": 5241.4,
    "originalDeadline": "03/2029",
    "predictedCompletionDate": "03/2029",
    "expectedProgress": 39.3,
    "currentPhysicalProgress": 39.34,
    "progressGap": 0.0,
    "financialProgress": 56.1,
    "healthScore": 82,
    "riskLevel": "STABLE",
    "riskTrend": 1.3,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Overburden Dumping Site Acquisition & Rail Silo Connectivity",
    "secondaryRiskDriver": "Nodal Agency: South Eastern Coalfields Limited [SECL]",
    "priorityScore": 29.0,
    "impactScore": 82,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-400354-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "12/2020",
        "actualDate": "12/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400354-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "12/2020",
        "actualDate": "12/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400354-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2029",
        "revisedDate": "03/2029",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-400354-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2029",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400354 monitored by MoSPI. Implemented by South Eastern Coalfields Limited [SECL] in Chhattisgarh. Sanctioned budget of \u20b95,241.40 Cr, current revised cost \u20b95,241.40 Cr with \u20b92,941.23 Cr spent to date (56.1% financial). Physical completion stands at 39.3%. Primary risk driver: Overburden Dumping Site Acquisition & Rail Silo Connectivity. Prescriptive action: Resolve village land resettlement compensation in corridor buffer.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b91.90 Cr with physical progress moving from 39.3% to 39.3% (+0.0%). Revised completion target: 03/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "39.3%",
          "current": "39.3%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b92939.33 Cr",
          "current": "\u20b92941.23 Cr",
          "delta": "+\u20b91.90 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2029",
          "current": "03/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400354 (South Eastern Coalfields Limited [SECL]).",
        "Approved date: 12/2020, Work started: 12/2020.",
        "Key focus: Overburden Dumping Site Acquisition & Rail Silo Connectivity"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 73
      },
      {
        "date": "May 2026",
        "score": 72
      },
      {
        "date": "June 2026",
        "score": 72
      },
      {
        "date": "July 2026 (Live)",
        "score": 18
      },
      {
        "date": "August 2026 (P)",
        "score": 19,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 19,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 5241.4,
        "revised": 5241.4,
        "expenditure": 2910.11,
        "forecast": 5503.47
      },
      {
        "period": "May 2026",
        "sanctioned": 5241.4,
        "revised": 5241.4,
        "expenditure": 2918.21,
        "forecast": 5503.47
      },
      {
        "period": "June 2026",
        "sanctioned": 5241.4,
        "revised": 5241.4,
        "expenditure": 2939.33,
        "forecast": 5555.88
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 5241.4,
        "revised": 5241.4,
        "expenditure": 2941.23,
        "forecast": 5241.4
      }
    ],
    "startDate": "12/2020",
    "recommendedActions": [
      "Resolve village land resettlement compensation in corridor buffer."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400150",
    "code": "PAIMANA-400150",
    "name": "RPR MAGADH EXP OCP",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Jharkhand",
    "stage": "Under Construction",
    "implementingAgency": "Ministry of Coal",
    "sanctionedCostCr": 6964.33,
    "revisedCostCr": 6964.33,
    "expenditureCr": 2299.77,
    "forecastCostCr": 6964.33,
    "originalDeadline": "03/2028",
    "predictedCompletionDate": "03/2028",
    "expectedProgress": 39.4,
    "currentPhysicalProgress": 39.42,
    "progressGap": 0.0,
    "financialProgress": 33.0,
    "healthScore": 82,
    "riskLevel": "STABLE",
    "riskTrend": -0.8,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Tori-Shivpur Coal Evacuation Rail Loading Siding",
    "secondaryRiskDriver": "Nodal Agency: Ministry of Coal",
    "priorityScore": 29.0,
    "impactScore": 85,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-400150-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "08/2020",
        "actualDate": "08/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400150-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "08/2020",
        "actualDate": "08/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400150-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2028",
        "revisedDate": "03/2028",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-400150-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2028",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400150 monitored by MoSPI. Implemented by Ministry of Coal in Jharkhand. Sanctioned budget of \u20b96,964.33 Cr, current revised cost \u20b96,964.33 Cr with \u20b92,299.77 Cr spent to date (33.0% financial). Physical completion stands at 39.4%. Primary risk driver: Tori-Shivpur Coal Evacuation Rail Loading Siding. Prescriptive action: Expedite automatic rapid loading system (RLS) and conveyor belts.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b91.32 Cr with physical progress moving from 39.4% to 39.4% (+0.0%). Revised completion target: 03/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "39.4%",
          "current": "39.4%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b92298.45 Cr",
          "current": "\u20b92299.77 Cr",
          "delta": "+\u20b91.32 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2028",
          "current": "03/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400150 (Ministry of Coal).",
        "Approved date: 08/2020, Work started: 08/2020.",
        "Key focus: Tori-Shivpur Coal Evacuation Rail Loading Siding"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 72
      },
      {
        "date": "May 2026",
        "score": 72
      },
      {
        "date": "June 2026",
        "score": 72
      },
      {
        "date": "July 2026 (Live)",
        "score": 18
      },
      {
        "date": "August 2026 (P)",
        "score": 19,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 19,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 6964.33,
        "revised": 7254.37,
        "expenditure": 1688.4,
        "forecast": 7617.09
      },
      {
        "period": "May 2026",
        "sanctioned": 6964.33,
        "revised": 7254.37,
        "expenditure": 1692.65,
        "forecast": 7617.09
      },
      {
        "period": "June 2026",
        "sanctioned": 6964.33,
        "revised": 6964.33,
        "expenditure": 2298.45,
        "forecast": 7382.19
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 6964.33,
        "revised": 6964.33,
        "expenditure": 2299.77,
        "forecast": 6964.33
      }
    ],
    "startDate": "08/2020",
    "recommendedActions": [
      "Expedite automatic rapid loading system (RLS) and conveyor belts."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400156",
    "code": "PAIMANA-400156",
    "name": "EPR AMRAPALI OCP",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Jharkhand",
    "stage": "Under Construction",
    "implementingAgency": "Central Coalfields Limited [CCL]",
    "sanctionedCostCr": 4983.57,
    "revisedCostCr": 4983.57,
    "expenditureCr": 1838.82,
    "forecastCostCr": 4983.57,
    "originalDeadline": "03/2028",
    "predictedCompletionDate": "03/2028",
    "expectedProgress": 43.7,
    "currentPhysicalProgress": 43.69,
    "progressGap": 0.0,
    "financialProgress": 36.9,
    "healthScore": 83,
    "riskLevel": "STABLE",
    "riskTrend": -0.8,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Heavy Mining Haul Road Construction & Forest Clearances",
    "secondaryRiskDriver": "Nodal Agency: Central Coalfields Limited [CCL]",
    "priorityScore": 29.0,
    "impactScore": 81,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-400156-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2020",
        "actualDate": "02/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400156-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2020",
        "actualDate": "02/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400156-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2028",
        "revisedDate": "03/2028",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-400156-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2028",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400156 monitored by MoSPI. Implemented by Central Coalfields Limited [CCL] in Jharkhand. Sanctioned budget of \u20b94,983.57 Cr, current revised cost \u20b94,983.57 Cr with \u20b91,838.82 Cr spent to date (36.9% financial). Physical completion stands at 43.7%. Primary risk driver: Heavy Mining Haul Road Construction & Forest Clearances. Prescriptive action: Complete railway spur siding and dual rapid loading hoppers.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b927.05 Cr with physical progress moving from 43.7% to 43.7% (+0.0%). Revised completion target: 03/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "43.7%",
          "current": "43.7%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b91811.77 Cr",
          "current": "\u20b91838.82 Cr",
          "delta": "+\u20b927.05 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2028",
          "current": "03/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400156 (Central Coalfields Limited [CCL]).",
        "Approved date: 02/2020, Work started: 02/2020.",
        "Key focus: Heavy Mining Haul Road Construction & Forest Clearances"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 69
      },
      {
        "date": "May 2026",
        "score": 69
      },
      {
        "date": "June 2026",
        "score": 69
      },
      {
        "date": "July 2026 (Live)",
        "score": 17
      },
      {
        "date": "August 2026 (P)",
        "score": 18,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 18,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 4983.57,
        "revised": 5136.15,
        "expenditure": 1326.01,
        "forecast": 5392.96
      },
      {
        "period": "May 2026",
        "sanctioned": 4983.57,
        "revised": 5136.15,
        "expenditure": 1326.08,
        "forecast": 5392.96
      },
      {
        "period": "June 2026",
        "sanctioned": 4983.57,
        "revised": 4983.57,
        "expenditure": 1811.77,
        "forecast": 5282.58
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 4983.57,
        "revised": 4983.57,
        "expenditure": 1838.82,
        "forecast": 4983.57
      }
    ],
    "startDate": "02/2020",
    "recommendedActions": [
      "Complete railway spur siding and dual rapid loading hoppers."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "617416",
    "code": "PAIMANA-617416",
    "name": "Revised Jharia Master Plan for Dealing with Fire, Subsidence & Rehabilitation",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Jharkhand",
    "stage": "Under Construction",
    "implementingAgency": "Bharat Coking Coal Limited [BCCL]",
    "sanctionedCostCr": 5940.47,
    "revisedCostCr": 5940.47,
    "expenditureCr": 520.75,
    "forecastCostCr": 5940.47,
    "originalDeadline": "12/2028",
    "predictedCompletionDate": "12/2028",
    "expectedProgress": 34.0,
    "currentPhysicalProgress": 34.0,
    "progressGap": 0.0,
    "financialProgress": 8.8,
    "healthScore": 80,
    "riskLevel": "STABLE",
    "riskTrend": 2.0,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Township Resettlement Housing & Subsurface Fire Blanks",
    "secondaryRiskDriver": "Nodal Agency: Bharat Coking Coal Limited [BCCL]",
    "priorityScore": 29.0,
    "impactScore": 83,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-617416-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "06/2025",
        "actualDate": "06/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-617416-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2025",
        "actualDate": "07/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-617416-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "12/2028",
        "revisedDate": "12/2028",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-617416-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2028",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 617416 monitored by MoSPI. Implemented by Bharat Coking Coal Limited [BCCL] in Jharkhand. Sanctioned budget of \u20b95,940.47 Cr, current revised cost \u20b95,940.47 Cr with \u20b9520.75 Cr spent to date (8.8% financial). Physical completion stands at 34.0%. Primary risk driver: Township Resettlement Housing & Subsurface Fire Blanks. Prescriptive action: Speed up family relocation to Belgaria township and sand stowing works.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9192.97 Cr with physical progress moving from 31.0% to 34.0% (+3.0%). Revised completion target: 12/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "31.0%",
          "current": "34.0%",
          "delta": "+3.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9327.78 Cr",
          "current": "\u20b9520.75 Cr",
          "delta": "+\u20b9192.97 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2028",
          "current": "12/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 617416 (Bharat Coking Coal Limited [BCCL]).",
        "Approved date: 06/2025, Work started: 07/2025.",
        "Key focus: Township Resettlement Housing & Subsurface Fire Blanks"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 82
      },
      {
        "date": "May 2026",
        "score": 80
      },
      {
        "date": "June 2026",
        "score": 78
      },
      {
        "date": "July 2026 (Live)",
        "score": 20
      },
      {
        "date": "August 2026 (P)",
        "score": 21,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 22,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 5940.47,
        "revised": 5940.47,
        "expenditure": 262.83,
        "forecast": 6237.49
      },
      {
        "period": "May 2026",
        "sanctioned": 5940.47,
        "revised": 5940.47,
        "expenditure": 274.27,
        "forecast": 6237.49
      },
      {
        "period": "June 2026",
        "sanctioned": 5940.47,
        "revised": 5940.47,
        "expenditure": 327.78,
        "forecast": 6296.9
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 5940.47,
        "revised": 5940.47,
        "expenditure": 520.75,
        "forecast": 5940.47
      }
    ],
    "startDate": "07/2025",
    "recommendedActions": [
      "Speed up family relocation to Belgaria township and sand stowing works."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "619032",
    "code": "PAIMANA-619032",
    "name": "JAYANT EXPN. [20 TO 38 MTPA]",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Madhya Pradesh",
    "stage": "Pre-Construction",
    "implementingAgency": "Northern Coalfields Limited [NCL]",
    "sanctionedCostCr": 25560.48,
    "revisedCostCr": 25560.5,
    "expenditureCr": 333.3,
    "forecastCostCr": 25560.5,
    "originalDeadline": "03/2032",
    "predictedCompletionDate": "03/2032",
    "expectedProgress": 2.1,
    "currentPhysicalProgress": 2.1,
    "progressGap": 0.0,
    "financialProgress": 1.3,
    "healthScore": 67,
    "riskLevel": "WATCH",
    "riskTrend": 0.6,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.020000000000436557,
    "primaryRiskDriver": "Mega Dragline Procurement & Inter-state Forest Corridor Clearance",
    "secondaryRiskDriver": "Nodal Agency: Northern Coalfields Limited [NCL]",
    "priorityScore": 29.0,
    "impactScore": 97,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-619032-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2025",
        "actualDate": "02/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619032-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2025",
        "actualDate": "02/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619032-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2032",
        "revisedDate": "03/2032",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-619032-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2032",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 619032 monitored by MoSPI. Implemented by Northern Coalfields Limited [NCL] in Madhya Pradesh. Sanctioned budget of \u20b925,560.48 Cr, current revised cost \u20b925,560.50 Cr with \u20b9333.30 Cr spent to date (1.3% financial). Physical completion stands at 2.1%. Primary risk driver: Mega Dragline Procurement & Inter-state Forest Corridor Clearance. Prescriptive action: Synchronize thermal plant coal stockyard rail lines with Singrauli loop.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b976.60 Cr with physical progress moving from 2.0% to 2.1% (+0.1%). Revised completion target: 03/2032.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "2.0%",
          "current": "2.1%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9256.70 Cr",
          "current": "\u20b9333.30 Cr",
          "delta": "+\u20b976.60 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2032",
          "current": "03/2032",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 619032 (Northern Coalfields Limited [NCL]).",
        "Approved date: 02/2025, Work started: 02/2025.",
        "Key focus: Mega Dragline Procurement & Inter-state Forest Corridor Clearance"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 95
      },
      {
        "date": "May 2026",
        "score": 95
      },
      {
        "date": "June 2026",
        "score": 95
      },
      {
        "date": "July 2026 (Live)",
        "score": 33
      },
      {
        "date": "August 2026 (P)",
        "score": 34,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 36,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 25560.48,
        "revised": 25560.5,
        "expenditure": 126.68,
        "forecast": 26838.53
      },
      {
        "period": "May 2026",
        "sanctioned": 25560.48,
        "revised": 25560.5,
        "expenditure": 186.68,
        "forecast": 26838.53
      },
      {
        "period": "June 2026",
        "sanctioned": 25560.48,
        "revised": 25560.5,
        "expenditure": 256.7,
        "forecast": 27094.13
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 25560.48,
        "revised": 25560.5,
        "expenditure": 333.3,
        "forecast": 25560.5
      }
    ],
    "startDate": "02/2025",
    "recommendedActions": [
      "Synchronize thermal plant coal stockyard rail lines with Singrauli loop."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400166",
    "code": "PAIMANA-400166",
    "name": "SIARMAL OCP",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Odisha",
    "stage": "Under Construction",
    "implementingAgency": "Mahanadi Coalfields Limited [MCL]",
    "sanctionedCostCr": 5194.95,
    "revisedCostCr": 5194.95,
    "expenditureCr": 3543.45,
    "forecastCostCr": 5194.95,
    "originalDeadline": "03/2029",
    "predictedCompletionDate": "03/2029",
    "expectedProgress": 61.0,
    "currentPhysicalProgress": 61.04,
    "progressGap": 0.0,
    "financialProgress": 68.2,
    "healthScore": 90,
    "riskLevel": "STABLE",
    "riskTrend": 0.8,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "First Mile Connectivity Conveyor & Coal Handling Plant (CHP)",
    "secondaryRiskDriver": "Nodal Agency: Mahanadi Coalfields Limited [MCL]",
    "priorityScore": 29.0,
    "impactScore": 82,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-400166-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2021",
        "actualDate": "02/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400166-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2021",
        "actualDate": "02/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400166-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2029",
        "revisedDate": "03/2029",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-400166-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2029",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400166 monitored by MoSPI. Implemented by Mahanadi Coalfields Limited [MCL] in Odisha. Sanctioned budget of \u20b95,194.95 Cr, current revised cost \u20b95,194.95 Cr with \u20b93,543.45 Cr spent to date (68.2% financial). Physical completion stands at 61.0%. Primary risk driver: First Mile Connectivity Conveyor & Coal Handling Plant (CHP). Prescriptive action: Commission cross-country pipe conveyor to avoid road dispatch trucks.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b952.37 Cr with physical progress moving from 60.7% to 61.0% (+0.4%). Revised completion target: 03/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "60.7%",
          "current": "61.0%",
          "delta": "+0.4%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b93491.08 Cr",
          "current": "\u20b93543.45 Cr",
          "delta": "+\u20b952.37 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2029",
          "current": "03/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400166 (Mahanadi Coalfields Limited [MCL]).",
        "Approved date: 02/2021, Work started: 02/2021.",
        "Key focus: First Mile Connectivity Conveyor & Coal Handling Plant (CHP)"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 58
      },
      {
        "date": "May 2026",
        "score": 58
      },
      {
        "date": "June 2026",
        "score": 58
      },
      {
        "date": "July 2026 (Live)",
        "score": 10
      },
      {
        "date": "August 2026 (P)",
        "score": 10,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 11,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 5194.95,
        "revised": 5194.95,
        "expenditure": 3490.38,
        "forecast": 5454.7
      },
      {
        "period": "May 2026",
        "sanctioned": 5194.95,
        "revised": 5194.95,
        "expenditure": 3491.21,
        "forecast": 5454.7
      },
      {
        "period": "June 2026",
        "sanctioned": 5194.95,
        "revised": 5194.95,
        "expenditure": 3491.08,
        "forecast": 5506.65
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 5194.95,
        "revised": 5194.95,
        "expenditure": 3543.45,
        "forecast": 5194.95
      }
    ],
    "startDate": "02/2021",
    "recommendedActions": [
      "Commission cross-country pipe conveyor to avoid road dispatch trucks."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "616231",
    "code": "PAIMANA-616231",
    "name": "BHUBANESWARI EXPN OCP 50 MTY",
    "sector": "Coal",
    "ministry": "MoC",
    "state": "Odisha",
    "stage": "Under Construction",
    "implementingAgency": "Mahanadi Coalfields Limited [MCL]",
    "sanctionedCostCr": 5366.27,
    "revisedCostCr": 5366.27,
    "expenditureCr": 477.73,
    "forecastCostCr": 5366.27,
    "originalDeadline": "03/2033",
    "predictedCompletionDate": "03/2033",
    "expectedProgress": 34.0,
    "currentPhysicalProgress": 34.03,
    "progressGap": 0.0,
    "financialProgress": 8.9,
    "healthScore": 80,
    "riskLevel": "STABLE",
    "riskTrend": 1.4,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Land Tenancy Settlement & Drainage Diversion Canal",
    "secondaryRiskDriver": "Nodal Agency: Mahanadi Coalfields Limited [MCL]",
    "priorityScore": 29.0,
    "impactScore": 82,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-616231-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2024",
        "actualDate": "03/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-616231-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2024",
        "actualDate": "03/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-616231-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2033",
        "revisedDate": "03/2033",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-616231-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2033",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 616231 monitored by MoSPI. Implemented by Mahanadi Coalfields Limited [MCL] in Odisha. Sanctioned budget of \u20b95,366.27 Cr, current revised cost \u20b95,366.27 Cr with \u20b9477.73 Cr spent to date (8.9% financial). Physical completion stands at 34.0%. Primary risk driver: Land Tenancy Settlement & Drainage Diversion Canal. Prescriptive action: Complete peripheral diversion nallah to safeguard quarry during heavy monsoons.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.30 Cr with physical progress moving from 34.0% to 34.0% (+0.1%). Revised completion target: 03/2033.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "34.0%",
          "current": "34.0%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9477.43 Cr",
          "current": "\u20b9477.73 Cr",
          "delta": "+\u20b90.30 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2033",
          "current": "03/2033",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 616231 (Mahanadi Coalfields Limited [MCL]).",
        "Approved date: 03/2024, Work started: 03/2024.",
        "Key focus: Land Tenancy Settlement & Drainage Diversion Canal"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 77
      },
      {
        "date": "May 2026",
        "score": 77
      },
      {
        "date": "June 2026",
        "score": 76
      },
      {
        "date": "July 2026 (Live)",
        "score": 20
      },
      {
        "date": "August 2026 (P)",
        "score": 21,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 22,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 5366.27,
        "revised": 5366.27,
        "expenditure": 477.39,
        "forecast": 5634.58
      },
      {
        "period": "May 2026",
        "sanctioned": 5366.27,
        "revised": 5366.27,
        "expenditure": 477.84,
        "forecast": 5634.58
      },
      {
        "period": "June 2026",
        "sanctioned": 5366.27,
        "revised": 5366.27,
        "expenditure": 477.43,
        "forecast": 5688.25
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 5366.27,
        "revised": 5366.27,
        "expenditure": 477.73,
        "forecast": 5366.27
      }
    ],
    "startDate": "03/2024",
    "recommendedActions": [
      "Complete peripheral diversion nallah to safeguard quarry during heavy monsoons."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "602182",
    "code": "PAIMANA-602182",
    "name": "Dibang Multipurpose Hydroelectric Project [2880 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Arunachal Pradesh",
    "stage": "Under Construction",
    "implementingAgency": "NHPC Limited",
    "sanctionedCostCr": 2083.0,
    "revisedCostCr": 31876.39,
    "expenditureCr": 1063.43,
    "forecastCostCr": 36345.4,
    "originalDeadline": "02/2032",
    "predictedCompletionDate": "02/2032",
    "expectedProgress": 17.9,
    "currentPhysicalProgress": 17.93,
    "progressGap": 0.0,
    "financialProgress": 3.3,
    "healthScore": 38,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.2,
    "costRiskScore": 98,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 29793.39,
    "primaryRiskDriver": "Dam Foundation Grouting & Diversion Tunnel Invert Concreting",
    "secondaryRiskDriver": "Nodal Agency: NHPC Limited",
    "priorityScore": 56.2,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-602182-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2023",
        "actualDate": "02/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602182-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2023",
        "actualDate": "02/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602182-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "02/2032",
        "revisedDate": "02/2032",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-602182-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "02/2032",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 602182 monitored by MoSPI. Implemented by NHPC Limited in Arunachal Pradesh. Sanctioned budget of \u20b92,083.00 Cr, current revised cost \u20b931,876.39 Cr with \u20b91,063.43 Cr spent to date (3.3% financial). Physical completion stands at 17.9%. Primary risk driver: Dam Foundation Grouting & Diversion Tunnel Invert Concreting. Prescriptive action: Accelerate river diversion works before peak rainy season discharges.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b910.02 Cr with physical progress moving from 17.8% to 17.9% (+0.1%). Revised completion target: 02/2032.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "17.8%",
          "current": "17.9%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b91053.41 Cr",
          "current": "\u20b91063.43 Cr",
          "delta": "+\u20b910.02 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "02/2032",
          "current": "02/2032",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 602182 (NHPC Limited).",
        "Approved date: 02/2023, Work started: 02/2023.",
        "Key focus: Dam Foundation Grouting & Diversion Tunnel Invert Concreting"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 88
      },
      {
        "date": "May 2026",
        "score": 88
      },
      {
        "date": "June 2026",
        "score": 88
      },
      {
        "date": "July 2026 (Live)",
        "score": 62
      },
      {
        "date": "August 2026 (P)",
        "score": 64,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 67,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 2083.0,
        "revised": 31876.39,
        "expenditure": 1072.11,
        "forecast": 33470.21
      },
      {
        "period": "May 2026",
        "sanctioned": 2083.0,
        "revised": 31876.39,
        "expenditure": 1033.41,
        "forecast": 33470.21
      },
      {
        "period": "June 2026",
        "sanctioned": 2083.0,
        "revised": 31876.39,
        "expenditure": 1053.41,
        "forecast": 33788.97
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 2083.0,
        "revised": 31876.39,
        "expenditure": 1063.43,
        "forecast": 36345.4
      }
    ],
    "startDate": "02/2023",
    "recommendedActions": [
      "Accelerate river diversion works before peak rainy season discharges."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "602579",
    "code": "PAIMANA-602579",
    "name": "Buxar Thermal Power Project [1320 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Bihar",
    "stage": "Testing & Commissioning",
    "implementingAgency": "SJVN Thermal Limited",
    "sanctionedCostCr": 10439.09,
    "revisedCostCr": 13756.56,
    "expenditureCr": 13731.77,
    "forecastCostCr": 14254.18,
    "originalDeadline": "01/2024",
    "predictedCompletionDate": "05/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 95.01,
    "progressGap": 5.0,
    "financialProgress": 99.8,
    "healthScore": 49,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.5,
    "costRiskScore": 52,
    "timeRiskScore": 98,
    "executionRiskScore": 35,
    "predictedDelayMonths": 28,
    "predictedCostOverrunCr": 3317.4699999999993,
    "primaryRiskDriver": "Unit-2 Boiler Light-up & Coal Railway Siding Linkage",
    "secondaryRiskDriver": "Nodal Agency: SJVN Thermal Limited",
    "priorityScore": 67.0,
    "impactScore": 91,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-602579-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2019",
        "actualDate": "03/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602579-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "06/2019",
        "actualDate": "06/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602579-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "01/2024",
        "revisedDate": "05/2026",
        "status": "DELAYED",
        "delayDays": 840,
        "criticalPath": true
      },
      {
        "id": "m-602579-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "05/2026",
        "status": "ON_TRACK",
        "delayDays": 840
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 602579 monitored by MoSPI. Implemented by SJVN Thermal Limited in Bihar. Sanctioned budget of \u20b910,439.09 Cr, current revised cost \u20b913,756.56 Cr with \u20b913,731.77 Cr spent to date (99.8% financial). Physical completion stands at 95.0%. Primary risk driver: Unit-2 Boiler Light-up & Coal Railway Siding Linkage. Prescriptive action: Synchronize trial power generation with Eastern Regional Load Despatch Centre.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9125.05 Cr with physical progress moving from 94.9% to 95.0% (+0.1%). Revised completion target: 05/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "94.9%",
          "current": "95.0%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b913606.72 Cr",
          "current": "\u20b913731.77 Cr",
          "delta": "+\u20b9125.05 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "05/2026",
          "current": "05/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 602579 (SJVN Thermal Limited).",
        "Approved date: 03/2019, Work started: 06/2019.",
        "Key focus: Unit-2 Boiler Light-up & Coal Railway Siding Linkage"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 51
      },
      {
        "date": "August 2026 (P)",
        "score": 53,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 55,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 10439.09,
        "revised": 13756.6,
        "expenditure": 13370.07,
        "forecast": 14444.43
      },
      {
        "period": "May 2026",
        "sanctioned": 10439.09,
        "revised": 13756.6,
        "expenditure": 13479.85,
        "forecast": 14444.43
      },
      {
        "period": "June 2026",
        "sanctioned": 10439.09,
        "revised": 13756.6,
        "expenditure": 13606.72,
        "forecast": 14582.0
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 10439.09,
        "revised": 13756.56,
        "expenditure": 13731.77,
        "forecast": 14254.18
      }
    ],
    "startDate": "06/2019",
    "recommendedActions": [
      "Synchronize trial power generation with Eastern Regional Load Despatch Centre."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "619051",
    "code": "PAIMANA-619051",
    "name": "Nabinagar Super Thermal Power Project Stage-II [3x800 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Bihar",
    "stage": "Under Construction",
    "implementingAgency": "NTPC Limited",
    "sanctionedCostCr": 29948.0,
    "revisedCostCr": 29948.0,
    "expenditureCr": 3422.25,
    "forecastCostCr": 29948.0,
    "originalDeadline": "07/2030",
    "predictedCompletionDate": "07/2030",
    "expectedProgress": 15.0,
    "currentPhysicalProgress": 15.0,
    "progressGap": 0.0,
    "financialProgress": 11.4,
    "healthScore": 72,
    "riskLevel": "WATCH",
    "riskTrend": 2.1,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Main Plant Boiler Foundation Civil Works & Chimney Slip-form",
    "secondaryRiskDriver": "Nodal Agency: NTPC Limited",
    "priorityScore": 29.0,
    "impactScore": 98,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-619051-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "11/2024",
        "actualDate": "11/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619051-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2025",
        "actualDate": "03/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619051-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2030",
        "revisedDate": "07/2030",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-619051-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "07/2030",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 619051 monitored by MoSPI. Implemented by NTPC Limited in Bihar. Sanctioned budget of \u20b929,948.00 Cr, current revised cost \u20b929,948.00 Cr with \u20b93,422.25 Cr spent to date (11.4% financial). Physical completion stands at 15.0%. Primary risk driver: Main Plant Boiler Foundation Civil Works & Chimney Slip-form. Prescriptive action: Speed up structural steel delivery and complete water intake conduit.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9322.31 Cr with physical progress moving from 13.7% to 15.0% (+1.4%). Revised completion target: 07/2030.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "13.7%",
          "current": "15.0%",
          "delta": "+1.4%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b93099.94 Cr",
          "current": "\u20b93422.25 Cr",
          "delta": "+\u20b9322.31 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "09/2030",
          "current": "07/2030",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 619051 (NTPC Limited).",
        "Approved date: 11/2024, Work started: 03/2025.",
        "Key focus: Main Plant Boiler Foundation Civil Works & Chimney Slip-form"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 93
      },
      {
        "date": "May 2026",
        "score": 92
      },
      {
        "date": "June 2026",
        "score": 90
      },
      {
        "date": "July 2026 (Live)",
        "score": 28
      },
      {
        "date": "August 2026 (P)",
        "score": 29,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 30,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 29948.0,
        "revised": 29948.0,
        "expenditure": 2676.55,
        "forecast": 31445.4
      },
      {
        "period": "May 2026",
        "sanctioned": 29948.0,
        "revised": 29948.0,
        "expenditure": 2865.29,
        "forecast": 31445.4
      },
      {
        "period": "June 2026",
        "sanctioned": 29948.0,
        "revised": 29948.0,
        "expenditure": 3099.94,
        "forecast": 31744.88
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 29948.0,
        "revised": 29948.0,
        "expenditure": 3422.25,
        "forecast": 29948.0
      }
    ],
    "startDate": "03/2025",
    "recommendedActions": [
      "Speed up structural steel delivery and complete water intake conduit."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "611930",
    "code": "PAIMANA-611930",
    "name": "Lara Super Thermal Power Project Stage-II [2x800 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Chhattisgarh",
    "stage": "Under Construction",
    "implementingAgency": "NTPC Limited",
    "sanctionedCostCr": 15530.0,
    "revisedCostCr": 16106.0,
    "expenditureCr": 5472.13,
    "forecastCostCr": 16192.4,
    "originalDeadline": "06/2028",
    "predictedCompletionDate": "11/2028",
    "expectedProgress": 39.5,
    "currentPhysicalProgress": 33.5,
    "progressGap": 6.0,
    "financialProgress": 34.0,
    "healthScore": 70,
    "riskLevel": "WATCH",
    "riskTrend": 2.5,
    "costRiskScore": 33,
    "timeRiskScore": 42,
    "executionRiskScore": 37,
    "predictedDelayMonths": 5,
    "predictedCostOverrunCr": 576.0,
    "primaryRiskDriver": "Turbine Generator Raft Foundation & FGD Absorber Structure",
    "secondaryRiskDriver": "Nodal Agency: NTPC Limited",
    "priorityScore": 37.4,
    "impactScore": 93,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-611930-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "08/2023",
        "actualDate": "08/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611930-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "08/2023",
        "actualDate": "08/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-611930-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2028",
        "revisedDate": "11/2028",
        "status": "DELAYED",
        "delayDays": 150,
        "criticalPath": true
      },
      {
        "id": "m-611930-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "11/2028",
        "status": "DELAYED",
        "delayDays": 150
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 611930 monitored by MoSPI. Implemented by NTPC Limited in Chhattisgarh. Sanctioned budget of \u20b915,530.00 Cr, current revised cost \u20b916,106.00 Cr with \u20b95,472.13 Cr spent to date (34.0% financial). Physical completion stands at 33.5%. Primary risk driver: Turbine Generator Raft Foundation & FGD Absorber Structure. Prescriptive action: Address local ash pond land acquisition compensation claims.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9193.10 Cr with physical progress moving from 32.3% to 33.5% (+1.2%). Revised completion target: 11/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "32.3%",
          "current": "33.5%",
          "delta": "+1.2%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b95279.03 Cr",
          "current": "\u20b95472.13 Cr",
          "delta": "+\u20b9193.10 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "11/2028",
          "current": "11/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 611930 (NTPC Limited).",
        "Approved date: 08/2023, Work started: 08/2023.",
        "Key focus: Turbine Generator Raft Foundation & FGD Absorber Structure"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 76
      },
      {
        "date": "May 2026",
        "score": 74
      },
      {
        "date": "June 2026",
        "score": 72
      },
      {
        "date": "July 2026 (Live)",
        "score": 30
      },
      {
        "date": "August 2026 (P)",
        "score": 31,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 32,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 15530.0,
        "revised": 16106.0,
        "expenditure": 4787.3,
        "forecast": 16911.3
      },
      {
        "period": "May 2026",
        "sanctioned": 15530.0,
        "revised": 16106.0,
        "expenditure": 5005.4,
        "forecast": 16911.3
      },
      {
        "period": "June 2026",
        "sanctioned": 15530.0,
        "revised": 16106.0,
        "expenditure": 5279.03,
        "forecast": 17072.36
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 15530.0,
        "revised": 16106.0,
        "expenditure": 5472.13,
        "forecast": 16192.4
      }
    ],
    "startDate": "08/2023",
    "recommendedActions": [
      "Address local ash pond land acquisition compensation claims."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "602525",
    "code": "PAIMANA-602525",
    "name": "Pakal Dul [Drangdhuran] Hydroelectric Project [1000 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Jammu and Kashmir",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Chenab Valley Power Projects [CVPP]",
    "sanctionedCostCr": 8112.12,
    "revisedCostCr": 12728.0,
    "expenditureCr": 9313.54,
    "forecastCostCr": 13420.38,
    "originalDeadline": "04/2020",
    "predictedCompletionDate": "12/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 82.05,
    "progressGap": 18.0,
    "financialProgress": 73.2,
    "healthScore": 35,
    "riskLevel": "CRITICAL",
    "riskTrend": 1.5,
    "costRiskScore": 70,
    "timeRiskScore": 98,
    "executionRiskScore": 61,
    "predictedDelayMonths": 80,
    "predictedCostOverrunCr": 4615.88,
    "primaryRiskDriver": "Concrete Face Rockfill Dam (CFRD) & Head Race Tunnel Squeezing",
    "secondaryRiskDriver": "Nodal Agency: Chenab Valley Power Projects [CVPP]",
    "priorityScore": 79.4,
    "impactScore": 90,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-602525-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2014",
        "actualDate": "10/2014",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602525-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2018",
        "actualDate": "02/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602525-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "04/2020",
        "revisedDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 2400,
        "criticalPath": true
      },
      {
        "id": "m-602525-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 2400
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 602525 monitored by MoSPI. Implemented by Chenab Valley Power Projects [CVPP] in Jammu and Kashmir. Sanctioned budget of \u20b98,112.12 Cr, current revised cost \u20b912,728.00 Cr with \u20b99,313.54 Cr spent to date (73.2% financial). Physical completion stands at 82.0%. Primary risk driver: Concrete Face Rockfill Dam (CFRD) & Head Race Tunnel Squeezing. Prescriptive action: Deploy advanced shotcreting and rock bolts in shear zones of HRT.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 82.0% to 82.0% (+0.0%). Revised completion target: 12/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "82.0%",
          "current": "82.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b99313.54 Cr",
          "current": "\u20b99313.54 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2026",
          "current": "12/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 602525 (Chenab Valley Power Projects [CVPP]).",
        "Approved date: 10/2014, Work started: 02/2018.",
        "Key focus: Concrete Face Rockfill Dam (CFRD) & Head Race Tunnel Squeezing"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 65
      },
      {
        "date": "August 2026 (P)",
        "score": 68,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 70,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 8112.12,
        "revised": 12728.0,
        "expenditure": 9114.12,
        "forecast": 13364.4
      },
      {
        "period": "May 2026",
        "sanctioned": 8112.12,
        "revised": 12728.0,
        "expenditure": 9313.54,
        "forecast": 13364.4
      },
      {
        "period": "June 2026",
        "sanctioned": 8112.12,
        "revised": 12728.0,
        "expenditure": 9313.54,
        "forecast": 13491.68
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 8112.12,
        "revised": 12728.0,
        "expenditure": 9313.54,
        "forecast": 13420.38
      }
    ],
    "startDate": "02/2018",
    "recommendedActions": [
      "Deploy advanced shotcreting and rock bolts in shear zones of HRT."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400261",
    "code": "PAIMANA-400261",
    "name": "Patratu Thermal Power Station Expansion Project Phase-I [3x800 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Jharkhand",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Patratu Vidyut Utpadan Nigam Limited",
    "sanctionedCostCr": 18668.0,
    "revisedCostCr": 20302.0,
    "expenditureCr": 19735.72,
    "forecastCostCr": 20547.1,
    "originalDeadline": "03/2023",
    "predictedCompletionDate": "04/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 92.0,
    "progressGap": 8.0,
    "financialProgress": 97.2,
    "healthScore": 61,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.3,
    "costRiskScore": 36,
    "timeRiskScore": 98,
    "executionRiskScore": 41,
    "predictedDelayMonths": 49,
    "predictedCostOverrunCr": 1634.0,
    "primaryRiskDriver": "Unit-1 Turbine Rolling & Make-up Water Pipeline from Dam",
    "secondaryRiskDriver": "Nodal Agency: Patratu Vidyut Utpadan Nigam Limited",
    "priorityScore": 61.8,
    "impactScore": 95,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-400261-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "11/2017",
        "actualDate": "11/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400261-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "11/2017",
        "actualDate": "11/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400261-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2023",
        "revisedDate": "04/2027",
        "status": "DELAYED",
        "delayDays": 1470,
        "criticalPath": true
      },
      {
        "id": "m-400261-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "04/2027",
        "status": "ON_TRACK",
        "delayDays": 1470
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400261 monitored by MoSPI. Implemented by Patratu Vidyut Utpadan Nigam Limited in Jharkhand. Sanctioned budget of \u20b918,668.00 Cr, current revised cost \u20b920,302.00 Cr with \u20b919,735.72 Cr spent to date (97.2% financial). Physical completion stands at 92.0%. Primary risk driver: Unit-1 Turbine Rolling & Make-up Water Pipeline from Dam. Prescriptive action: Resolve corridor Right of Way for raw water pipeline crossing railway lines.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9528.13 Cr with physical progress moving from 90.5% to 92.0% (+1.5%). Revised completion target: 04/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "90.5%",
          "current": "92.0%",
          "delta": "+1.5%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b919207.59 Cr",
          "current": "\u20b919735.72 Cr",
          "delta": "+\u20b9528.13 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "04/2027",
          "current": "04/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400261 (Patratu Vidyut Utpadan Nigam Limited).",
        "Approved date: 11/2017, Work started: 11/2017.",
        "Key focus: Unit-1 Turbine Rolling & Make-up Water Pipeline from Dam"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 39
      },
      {
        "date": "August 2026 (P)",
        "score": 41,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 42,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 18668.0,
        "revised": 20302.0,
        "expenditure": 18690.0,
        "forecast": 21317.1
      },
      {
        "period": "May 2026",
        "sanctioned": 18668.0,
        "revised": 20302.0,
        "expenditure": 19064.59,
        "forecast": 21317.1
      },
      {
        "period": "June 2026",
        "sanctioned": 18668.0,
        "revised": 20302.0,
        "expenditure": 19207.59,
        "forecast": 21520.12
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 18668.0,
        "revised": 20302.0,
        "expenditure": 19735.72,
        "forecast": 20547.1
      }
    ],
    "startDate": "11/2017",
    "recommendedActions": [
      "Resolve corridor Right of Way for raw water pipeline crossing railway lines."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "602096",
    "code": "PAIMANA-602096",
    "name": "Subansiri Lower Hydroelectric Project [2000 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Multi-States (Arunachal Pradesh, Assam)",
    "stage": "Testing & Commissioning",
    "implementingAgency": "NHPC Limited",
    "sanctionedCostCr": 6285.33,
    "revisedCostCr": 26075.54,
    "expenditureCr": 26448.07,
    "forecastCostCr": 29044.07,
    "originalDeadline": "09/2010",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 97.98,
    "progressGap": 2.0,
    "financialProgress": 101.4,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.1,
    "costRiskScore": 98,
    "timeRiskScore": 98,
    "executionRiskScore": 29,
    "predictedDelayMonths": 198,
    "predictedCostOverrunCr": 19790.21,
    "primaryRiskDriver": "Powerhouse Tailrace Channel Stabilization & Spillway Gates",
    "secondaryRiskDriver": "Nodal Agency: NHPC Limited",
    "priorityScore": 84.2,
    "impactScore": 97,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-602096-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "09/2003",
        "actualDate": "09/2003",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602096-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2005",
        "actualDate": "01/2005",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-602096-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2010",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 5940,
        "criticalPath": true
      },
      {
        "id": "m-602096-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "ON_TRACK",
        "delayDays": 5940
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 602096 monitored by MoSPI. Implemented by NHPC Limited in Multi-States (Arunachal Pradesh, Assam). Sanctioned budget of \u20b96,285.33 Cr, current revised cost \u20b926,075.54 Cr with \u20b926,448.07 Cr spent to date (101.4% financial). Physical completion stands at 98.0%. Primary risk driver: Powerhouse Tailrace Channel Stabilization & Spillway Gates. Prescriptive action: Complete pre-commissioning dry spin testing for Units 1 & 2.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b968.08 Cr with physical progress moving from 97.8% to 98.0% (+0.1%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "97.8%",
          "current": "98.0%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b926379.99 Cr",
          "current": "\u20b926448.07 Cr",
          "delta": "+\u20b968.08 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "05/2026",
          "current": "03/2027",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 602096 (NHPC Limited).",
        "Approved date: 09/2003, Work started: 01/2005.",
        "Key focus: Powerhouse Tailrace Channel Stabilization & Spillway Gates"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 6285.33,
        "revised": 26075.5,
        "expenditure": 26150.32,
        "forecast": 27379.28
      },
      {
        "period": "May 2026",
        "sanctioned": 6285.33,
        "revised": 26075.5,
        "expenditure": 26277.65,
        "forecast": 27379.28
      },
      {
        "period": "June 2026",
        "sanctioned": 6285.33,
        "revised": 26075.5,
        "expenditure": 26379.99,
        "forecast": 27640.03
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 6285.33,
        "revised": 26075.54,
        "expenditure": 26448.07,
        "forecast": 29044.07
      }
    ],
    "startDate": "01/2005",
    "recommendedActions": [
      "Complete pre-commissioning dry spin testing for Units 1 & 2."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400231",
    "code": "PAIMANA-400231",
    "name": "NLC Talabira Thermal Power Project [3x800 MW]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoC",
    "state": "Odisha",
    "stage": "Pre-Construction",
    "implementingAgency": "NLC India Limited",
    "sanctionedCostCr": 27212.96,
    "revisedCostCr": 27212.96,
    "expenditureCr": 3574.21,
    "forecastCostCr": 27212.96,
    "originalDeadline": "03/2030",
    "predictedCompletionDate": "03/2030",
    "expectedProgress": 4.1,
    "currentPhysicalProgress": 4.1,
    "progressGap": 0.0,
    "financialProgress": 13.1,
    "healthScore": 68,
    "riskLevel": "WATCH",
    "riskTrend": 0.9,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Boiler Island EPC Civil Engineering & Water Pipeline",
    "secondaryRiskDriver": "Nodal Agency: NLC India Limited",
    "priorityScore": 29.0,
    "impactScore": 98,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-400231-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "01/2017",
        "actualDate": "01/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400231-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2024",
        "actualDate": "01/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400231-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2030",
        "revisedDate": "03/2030",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-400231-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2030",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400231 monitored by MoSPI. Implemented by NLC India Limited in Odisha. Sanctioned budget of \u20b927,212.96 Cr, current revised cost \u20b927,212.96 Cr with \u20b93,574.21 Cr spent to date (13.1% financial). Physical completion stands at 4.1%. Primary risk driver: Boiler Island EPC Civil Engineering & Water Pipeline. Prescriptive action: Complete piling for power block and expedite Mahanadi water allocation.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b956.04 Cr with physical progress moving from 3.5% to 4.1% (+0.6%). Revised completion target: 03/2030.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "3.5%",
          "current": "4.1%",
          "delta": "+0.6%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b93518.17 Cr",
          "current": "\u20b93574.21 Cr",
          "delta": "+\u20b956.04 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2030",
          "current": "03/2030",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400231 (NLC India Limited).",
        "Approved date: 01/2017, Work started: 01/2024.",
        "Key focus: Boiler Island EPC Civil Engineering & Water Pipeline"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 95
      },
      {
        "date": "May 2026",
        "score": 95
      },
      {
        "date": "June 2026",
        "score": 95
      },
      {
        "date": "July 2026 (Live)",
        "score": 32
      },
      {
        "date": "August 2026 (P)",
        "score": 33,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 35,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 27212.96,
        "revised": 27213.0,
        "expenditure": 3454.06,
        "forecast": 28573.65
      },
      {
        "period": "May 2026",
        "sanctioned": 27212.96,
        "revised": 27213.0,
        "expenditure": 3455.88,
        "forecast": 28573.65
      },
      {
        "period": "June 2026",
        "sanctioned": 27212.96,
        "revised": 27213.0,
        "expenditure": 3518.17,
        "forecast": 28845.78
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 27212.96,
        "revised": 27212.96,
        "expenditure": 3574.21,
        "forecast": 27212.96
      }
    ],
    "startDate": "01/2024",
    "recommendedActions": [
      "Complete piling for power block and expedite Mahanadi water allocation."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "615347",
    "code": "PAIMANA-615347",
    "name": "Transmission System for Potential Renewable Energy Zone in Khavda Area Phase-V [Part A]",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Multi-States (Gujarat, Maharashtra)",
    "stage": "Under Construction",
    "implementingAgency": "Power Grid Corporation of India Limited [POWERGRID]",
    "sanctionedCostCr": 24819.0,
    "revisedCostCr": 24819.0,
    "expenditureCr": 2978.28,
    "forecastCostCr": 24819.0,
    "originalDeadline": "05/2029",
    "predictedCompletionDate": "05/2029",
    "expectedProgress": 18.6,
    "currentPhysicalProgress": 18.56,
    "progressGap": 0.0,
    "financialProgress": 12.0,
    "healthScore": 73,
    "riskLevel": "WATCH",
    "riskTrend": 8.0,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "High-Voltage Direct Current (HVDC) Line Route Survey & Tower Foundations",
    "secondaryRiskDriver": "Nodal Agency: Power Grid Corporation of India Limited [POWERGRID]",
    "priorityScore": 29.0,
    "impactScore": 97,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-615347-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "11/2024",
        "actualDate": "11/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-615347-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "11/2024",
        "actualDate": "11/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-615347-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "05/2029",
        "revisedDate": "05/2029",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-615347-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "05/2029",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 615347 monitored by MoSPI. Implemented by Power Grid Corporation of India Limited [POWERGRID] in Multi-States (Gujarat, Maharashtra). Sanctioned budget of \u20b924,819.00 Cr, current revised cost \u20b924,819.00 Cr with \u20b92,978.28 Cr spent to date (12.0% financial). Physical completion stands at 18.6%. Primary risk driver: High-Voltage Direct Current (HVDC) Line Route Survey & Tower Foundations. Prescriptive action: Obtain RoW permission for creek crossing and wild ass sanctuary buffer.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 18.1% to 18.6% (+0.5%). Revised completion target: 05/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "18.1%",
          "current": "18.6%",
          "delta": "+0.5%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b92978.28 Cr",
          "current": "\u20b92978.28 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "05/2029",
          "current": "05/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 615347 (Power Grid Corporation of India Limited [POWERGRID]).",
        "Approved date: 11/2024, Work started: 11/2024.",
        "Key focus: High-Voltage Direct Current (HVDC) Line Route Survey & Tower Foundations"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 93
      },
      {
        "date": "May 2026",
        "score": 88
      },
      {
        "date": "June 2026",
        "score": 87
      },
      {
        "date": "July 2026 (Live)",
        "score": 27
      },
      {
        "date": "August 2026 (P)",
        "score": 28,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 29,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 24819.0,
        "revised": 24819.0,
        "expenditure": 2481.9,
        "forecast": 26059.95
      },
      {
        "period": "May 2026",
        "sanctioned": 24819.0,
        "revised": 24819.0,
        "expenditure": 2978.28,
        "forecast": 26059.95
      },
      {
        "period": "June 2026",
        "sanctioned": 24819.0,
        "revised": 24819.0,
        "expenditure": 2978.28,
        "forecast": 26308.14
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 24819.0,
        "revised": 24819.0,
        "expenditure": 2978.28,
        "forecast": 24819.0
      }
    ],
    "startDate": "11/2024",
    "recommendedActions": [
      "Obtain RoW permission for creek crossing and wild ass sanctuary buffer."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "619025",
    "code": "PAIMANA-619025",
    "name": "Rajasthan Part I Power Transmission Project",
    "sector": "Power & Renewable Energy",
    "ministry": "MoP",
    "state": "Multi-States (Madhya Pradesh, Rajasthan, Uttar Pradesh)",
    "stage": "Under Construction",
    "implementingAgency": "Adani Transmission Limited",
    "sanctionedCostCr": 25000.0,
    "revisedCostCr": 25000.0,
    "expenditureCr": 735.05,
    "forecastCostCr": 25000.0,
    "originalDeadline": "07/2029",
    "predictedCompletionDate": "12/2025",
    "expectedProgress": 10.0,
    "currentPhysicalProgress": 10.0,
    "progressGap": 0.0,
    "financialProgress": 2.9,
    "healthScore": 70,
    "riskLevel": "WATCH",
    "riskTrend": -4.0,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "765 kV Quad D/C Line Stringing & Substation Land Acquisition",
    "secondaryRiskDriver": "Nodal Agency: Adani Transmission Limited",
    "priorityScore": 29.0,
    "impactScore": 97,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-619025-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "01/2025",
        "actualDate": "01/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619025-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2025",
        "actualDate": "01/2025",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-619025-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2029",
        "revisedDate": "12/2025",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-619025-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2025",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 619025 monitored by MoSPI. Implemented by Adani Transmission Limited in Multi-States (Madhya Pradesh, Rajasthan, Uttar Pradesh). Sanctioned budget of \u20b925,000.00 Cr, current revised cost \u20b925,000.00 Cr with \u20b9735.05 Cr spent to date (2.9% financial). Physical completion stands at 10.0%. Primary risk driver: 765 kV Quad D/C Line Stringing & Substation Land Acquisition. Prescriptive action: Coordinate substation connectivity approvals with Central Electricity Authority.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9309.00 Cr with physical progress moving from 4.0% to 10.0% (+6.0%). Revised completion target: 12/2025.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "4.0%",
          "current": "10.0%",
          "delta": "+6.0%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9426.05 Cr",
          "current": "\u20b9735.05 Cr",
          "delta": "+\u20b9309.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2025",
          "current": "12/2025",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 619025 (Adani Transmission Limited).",
        "Approved date: 01/2025, Work started: 01/2025.",
        "Key focus: 765 kV Quad D/C Line Stringing & Substation Land Acquisition"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 95
      },
      {
        "date": "May 2026",
        "score": 95
      },
      {
        "date": "June 2026",
        "score": 95
      },
      {
        "date": "July 2026 (Live)",
        "score": 30
      },
      {
        "date": "August 2026 (P)",
        "score": 31,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 32,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 25000.0,
        "revised": 25000.0,
        "expenditure": 230.05,
        "forecast": 26250.0
      },
      {
        "period": "May 2026",
        "sanctioned": 25000.0,
        "revised": 25000.0,
        "expenditure": 426.05,
        "forecast": 26250.0
      },
      {
        "period": "June 2026",
        "sanctioned": 25000.0,
        "revised": 25000.0,
        "expenditure": 426.05,
        "forecast": 26500.0
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 25000.0,
        "revised": 25000.0,
        "expenditure": 735.05,
        "forecast": 25000.0
      }
    ],
    "startDate": "01/2025",
    "recommendedActions": [
      "Coordinate substation connectivity approvals with Central Electricity Authority."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702627",
    "code": "PAIMANA-702627",
    "name": "Patna Metro Rail Project",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Bihar",
    "stage": "Under Construction",
    "implementingAgency": "Patna Metro Rail Corporation Ltd. [PMRCL]",
    "sanctionedCostCr": 13365.77,
    "revisedCostCr": 13365.77,
    "expenditureCr": 15090.75,
    "forecastCostCr": 13365.77,
    "originalDeadline": "02/2024",
    "predictedCompletionDate": "06/2027",
    "expectedProgress": 98.0,
    "currentPhysicalProgress": 50.05,
    "progressGap": 48.0,
    "financialProgress": 112.9,
    "healthScore": 51,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.0,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 98,
    "predictedDelayMonths": 40,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Underground TBM Tunneling near Patna Junction & Depot Land Handover",
    "secondaryRiskDriver": "Nodal Agency: Patna Metro Rail Corporation Ltd. [PMRCL]",
    "priorityScore": 70.8,
    "impactScore": 91,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702627-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2019",
        "actualDate": "02/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702627-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2019",
        "actualDate": "02/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702627-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "02/2024",
        "revisedDate": "06/2027",
        "status": "DELAYED",
        "delayDays": 1200,
        "criticalPath": true
      },
      {
        "id": "m-702627-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2027",
        "status": "DELAYED",
        "delayDays": 1200
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702627 monitored by MoSPI. Implemented by Patna Metro Rail Corporation Ltd. [PMRCL] in Bihar. Sanctioned budget of \u20b913,365.77 Cr, current revised cost \u20b913,365.77 Cr with \u20b915,090.75 Cr spent to date (112.9% financial). Physical completion stands at 50.0%. Primary risk driver: Underground TBM Tunneling near Patna Junction & Depot Land Handover. Prescriptive action: Expedite ISBT depot land possession and utility shifting on Bailey Road.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b99892.66 Cr with physical progress moving from 50.0% to 50.0% (+0.0%). Revised completion target: 06/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "50.0%",
          "current": "50.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b95198.09 Cr",
          "current": "\u20b915090.75 Cr",
          "delta": "+\u20b99892.66 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2027",
          "current": "06/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702627 (Patna Metro Rail Corporation Ltd. [PMRCL]).",
        "Approved date: 02/2019, Work started: 02/2019.",
        "Key focus: Underground TBM Tunneling near Patna Junction & Depot Land Handover"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 33
      },
      {
        "date": "May 2026",
        "score": 29
      },
      {
        "date": "June 2026",
        "score": 25
      },
      {
        "date": "July 2026 (Live)",
        "score": 49
      },
      {
        "date": "August 2026 (P)",
        "score": 51,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 53,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 13365.77,
        "revised": 13365.77,
        "expenditure": 14539.49,
        "forecast": 14034.06
      },
      {
        "period": "May 2026",
        "sanctioned": 13365.77,
        "revised": 13365.8,
        "expenditure": 5198.09,
        "forecast": 14034.09
      },
      {
        "period": "June 2026",
        "sanctioned": 13365.77,
        "revised": 13365.8,
        "expenditure": 5198.09,
        "forecast": 14167.75
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 13365.77,
        "revised": 13365.77,
        "expenditure": 15090.75,
        "forecast": 13365.77
      }
    ],
    "startDate": "02/2019",
    "recommendedActions": [
      "Expedite ISBT depot land possession and utility shifting on Bailey Road."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702632",
    "code": "PAIMANA-702632",
    "name": "DMRTS Phase - IV [3 Priority Corridors: Janakpuri West-RK Ashram, Majlis Park-Maujpur, Aerocity-Tughlakabad]",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Delhi",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Delhi Metro Rail Corporation Limited [DMRC]",
    "sanctionedCostCr": 24948.65,
    "revisedCostCr": 24948.65,
    "expenditureCr": 21420.76,
    "forecastCostCr": 24948.65,
    "originalDeadline": "03/2025",
    "predictedCompletionDate": "12/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 83.46,
    "progressGap": 16.5,
    "financialProgress": 85.9,
    "healthScore": 68,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.4,
    "costRiskScore": 30,
    "timeRiskScore": 82,
    "executionRiskScore": 58,
    "predictedDelayMonths": 21,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Underground Stations TBM Breakthrough & Automated Signaling Systems",
    "secondaryRiskDriver": "Nodal Agency: Delhi Metro Rail Corporation Limited [DMRC]",
    "priorityScore": 56.4,
    "impactScore": 97,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702632-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2019",
        "actualDate": "07/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702632-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2019",
        "actualDate": "07/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702632-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2025",
        "revisedDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 630,
        "criticalPath": true
      },
      {
        "id": "m-702632-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 630
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702632 monitored by MoSPI. Implemented by Delhi Metro Rail Corporation Limited [DMRC] in Delhi. Sanctioned budget of \u20b924,948.65 Cr, current revised cost \u20b924,948.65 Cr with \u20b921,420.76 Cr spent to date (85.9% financial). Physical completion stands at 83.5%. Primary risk driver: Underground Stations TBM Breakthrough & Automated Signaling Systems. Prescriptive action: Complete viaduct launching over Outer Ring Road intersections.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9379.37 Cr with physical progress moving from 82.2% to 83.5% (+1.3%). Revised completion target: 12/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "82.2%",
          "current": "83.5%",
          "delta": "+1.3%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b921041.39 Cr",
          "current": "\u20b921420.76 Cr",
          "delta": "+\u20b9379.37 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2026",
          "current": "12/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702632 (Delhi Metro Rail Corporation Limited [DMRC]).",
        "Approved date: 07/2019, Work started: 07/2019.",
        "Key focus: Underground Stations TBM Breakthrough & Automated Signaling Systems"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 27
      },
      {
        "date": "May 2026",
        "score": 24
      },
      {
        "date": "June 2026",
        "score": 21
      },
      {
        "date": "July 2026 (Live)",
        "score": 32
      },
      {
        "date": "August 2026 (P)",
        "score": 33,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 35,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 24948.65,
        "revised": 24948.7,
        "expenditure": 20350.75,
        "forecast": 26196.14
      },
      {
        "period": "May 2026",
        "sanctioned": 24948.65,
        "revised": 24948.7,
        "expenditure": 20545.86,
        "forecast": 26196.14
      },
      {
        "period": "June 2026",
        "sanctioned": 24948.65,
        "revised": 24948.7,
        "expenditure": 21041.39,
        "forecast": 26445.62
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 24948.65,
        "revised": 24948.65,
        "expenditure": 21420.76,
        "forecast": 24948.65
      }
    ],
    "startDate": "07/2019",
    "recommendedActions": [
      "Complete viaduct launching over Outer Ring Road intersections."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702630",
    "code": "PAIMANA-702630",
    "name": "Surat Metro Rail Project",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Gujarat",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Gujarat Metro Rail Corporation Limited [GMRCL]",
    "sanctionedCostCr": 12020.32,
    "revisedCostCr": 12020.32,
    "expenditureCr": 9332.21,
    "forecastCostCr": 12020.32,
    "originalDeadline": "03/2024",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 81.9,
    "progressGap": 18.1,
    "financialProgress": 77.6,
    "healthScore": 64,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.8,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 61,
    "predictedDelayMonths": 36,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Underground TBM Passage below Tapi River Bed & Surat Railway Station",
    "secondaryRiskDriver": "Nodal Agency: Gujarat Metro Rail Corporation Limited [GMRCL]",
    "priorityScore": 63.4,
    "impactScore": 90,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702630-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2019",
        "actualDate": "03/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702630-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "04/2019",
        "actualDate": "04/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702630-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2024",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1080,
        "criticalPath": true
      },
      {
        "id": "m-702630-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1080
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702630 monitored by MoSPI. Implemented by Gujarat Metro Rail Corporation Limited [GMRCL] in Gujarat. Sanctioned budget of \u20b912,020.32 Cr, current revised cost \u20b912,020.32 Cr with \u20b99,332.21 Cr spent to date (77.6% financial). Physical completion stands at 81.9%. Primary risk driver: Underground TBM Passage below Tapi River Bed & Surat Railway Station. Prescriptive action: Ensure real-time settlement monitoring during Tapi river boring.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9165.50 Cr with physical progress moving from 81.1% to 81.9% (+0.8%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "81.1%",
          "current": "81.9%",
          "delta": "+0.8%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b99166.71 Cr",
          "current": "\u20b99332.21 Cr",
          "delta": "+\u20b9165.50 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702630 (Gujarat Metro Rail Corporation Limited [GMRCL]).",
        "Approved date: 03/2019, Work started: 04/2019.",
        "Key focus: Underground TBM Passage below Tapi River Bed & Surat Railway Station"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 36
      },
      {
        "date": "August 2026 (P)",
        "score": 37,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 39,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 12020.32,
        "revised": 12020.3,
        "expenditure": 8929.65,
        "forecast": 12621.32
      },
      {
        "period": "May 2026",
        "sanctioned": 12020.32,
        "revised": 12020.3,
        "expenditure": 9031.25,
        "forecast": 12621.32
      },
      {
        "period": "June 2026",
        "sanctioned": 12020.32,
        "revised": 12020.3,
        "expenditure": 9166.71,
        "forecast": 12741.52
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 12020.32,
        "revised": 12020.32,
        "expenditure": 9332.21,
        "forecast": 12020.32
      }
    ],
    "startDate": "04/2019",
    "recommendedActions": [
      "Ensure real-time settlement monitoring during Tapi river boring."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702635",
    "code": "PAIMANA-702635",
    "name": "Construction of Bangalore Metro Rail Project Phase 2",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Karnataka",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Bengaluru Metro Rail Corporation Limited [BMRCL]",
    "sanctionedCostCr": 26405.14,
    "revisedCostCr": 30695.12,
    "expenditureCr": 29834.97,
    "forecastCostCr": 31338.62,
    "originalDeadline": "03/2021",
    "predictedCompletionDate": "09/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 95.8,
    "progressGap": 4.2,
    "financialProgress": 97.2,
    "healthScore": 57,
    "riskLevel": "CRITICAL",
    "riskTrend": -0.1,
    "costRiskScore": 41,
    "timeRiskScore": 98,
    "executionRiskScore": 33,
    "predictedDelayMonths": 66,
    "predictedCostOverrunCr": 4289.98,
    "primaryRiskDriver": "Pink Line Underground Section (Dairy Circle to Nagawara) Electrification",
    "secondaryRiskDriver": "Nodal Agency: Bengaluru Metro Rail Corporation Limited [BMRCL]",
    "priorityScore": 62.2,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702635-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2014",
        "actualDate": "02/2014",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702635-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2016",
        "actualDate": "02/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702635-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2021",
        "revisedDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 1980,
        "criticalPath": true
      },
      {
        "id": "m-702635-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "09/2026",
        "status": "ON_TRACK",
        "delayDays": 1980
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702635 monitored by MoSPI. Implemented by Bengaluru Metro Rail Corporation Limited [BMRCL] in Karnataka. Sanctioned budget of \u20b926,405.14 Cr, current revised cost \u20b930,695.12 Cr with \u20b929,834.97 Cr spent to date (97.2% financial). Physical completion stands at 95.8%. Primary risk driver: Pink Line Underground Section (Dairy Circle to Nagawara) Electrification. Prescriptive action: Finalize safety inspection with Commissioner of Metro Railway Safety (CMRS).",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b922.00 Cr with physical progress moving from 95.6% to 95.8% (+0.2%). Revised completion target: 09/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "95.6%",
          "current": "95.8%",
          "delta": "+0.2%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b929812.97 Cr",
          "current": "\u20b929834.97 Cr",
          "delta": "+\u20b922.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "09/2026",
          "current": "09/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702635 (Bengaluru Metro Rail Corporation Limited [BMRCL]).",
        "Approved date: 02/2014, Work started: 02/2016.",
        "Key focus: Pink Line Underground Section (Dairy Circle to Nagawara) Electrification"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 43
      },
      {
        "date": "August 2026 (P)",
        "score": 45,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 46,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 26405.14,
        "revised": 30695.1,
        "expenditure": 29802.97,
        "forecast": 32229.85
      },
      {
        "period": "May 2026",
        "sanctioned": 26405.14,
        "revised": 30695.1,
        "expenditure": 29812.97,
        "forecast": 32229.85
      },
      {
        "period": "June 2026",
        "sanctioned": 26405.14,
        "revised": 30695.1,
        "expenditure": 29812.97,
        "forecast": 32536.81
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 26405.14,
        "revised": 30695.12,
        "expenditure": 29834.97,
        "forecast": 31338.62
      }
    ],
    "startDate": "02/2016",
    "recommendedActions": [
      "Finalize safety inspection with Commissioner of Metro Railway Safety (CMRS)."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702665",
    "code": "PAIMANA-702665",
    "name": "Bangalore Metro Rail Project Phase-2A & 2B (Outer Ring Road & Airport Line)",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Karnataka",
    "stage": "Under Construction",
    "implementingAgency": "Bengaluru Metro Rail Corporation Limited [BMRCL]",
    "sanctionedCostCr": 14788.1,
    "revisedCostCr": 14788.1,
    "expenditureCr": 10878.48,
    "forecastCostCr": 14788.1,
    "originalDeadline": "06/2026",
    "predictedCompletionDate": "06/2026",
    "expectedProgress": 67.5,
    "currentPhysicalProgress": 67.5,
    "progressGap": 0.0,
    "financialProgress": 73.6,
    "healthScore": 93,
    "riskLevel": "STABLE",
    "riskTrend": -0.5,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Silk Board Multi-Level Flyover Integration & NHAI Overpass Segment Launching",
    "secondaryRiskDriver": "Nodal Agency: Bengaluru Metro Rail Corporation Limited [BMRCL]",
    "priorityScore": 29.0,
    "impactScore": 92,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-702665-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "06/2021",
        "actualDate": "06/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702665-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2019",
        "actualDate": "01/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702665-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2026",
        "revisedDate": "06/2026",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-702665-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2026",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702665 monitored by MoSPI. Implemented by Bengaluru Metro Rail Corporation Limited [BMRCL] in Karnataka. Sanctioned budget of \u20b914,788.10 Cr, current revised cost \u20b914,788.10 Cr with \u20b910,878.48 Cr spent to date (73.6% financial). Physical completion stands at 67.5%. Primary risk driver: Silk Board Multi-Level Flyover Integration & NHAI Overpass Segment Launching. Prescriptive action: Expedite airport corridor viaduct erection along Bellary Road.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9502.05 Cr with physical progress moving from 66.0% to 67.5% (+1.5%). Revised completion target: 06/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "66.0%",
          "current": "67.5%",
          "delta": "+1.5%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b910376.43 Cr",
          "current": "\u20b910878.48 Cr",
          "delta": "+\u20b9502.05 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "06/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702665 (Bengaluru Metro Rail Corporation Limited [BMRCL]).",
        "Approved date: 06/2021, Work started: 01/2019.",
        "Key focus: Silk Board Multi-Level Flyover Integration & NHAI Overpass Segment Launching"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 54
      },
      {
        "date": "May 2026",
        "score": 54
      },
      {
        "date": "June 2026",
        "score": 54
      },
      {
        "date": "July 2026 (Live)",
        "score": 7
      },
      {
        "date": "August 2026 (P)",
        "score": 7,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 8,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 14788.1,
        "revised": 14788.1,
        "expenditure": 10276.44,
        "forecast": 15527.51
      },
      {
        "period": "May 2026",
        "sanctioned": 14788.1,
        "revised": 14788.1,
        "expenditure": 10376.43,
        "forecast": 15527.51
      },
      {
        "period": "June 2026",
        "sanctioned": 14788.1,
        "revised": 14788.1,
        "expenditure": 10376.43,
        "forecast": 15675.39
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 14788.1,
        "revised": 14788.1,
        "expenditure": 10878.48,
        "forecast": 14788.1
      }
    ],
    "startDate": "01/2019",
    "recommendedActions": [
      "Expedite airport corridor viaduct erection along Bellary Road."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702637",
    "code": "PAIMANA-702637",
    "name": "Mumbai Metro Line 3 [Colaba-Bandra-SEEPZ]",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Maharashtra",
    "stage": "Near Completion",
    "implementingAgency": "Mumbai Metro Rail Corporation Limited [MMRC]",
    "sanctionedCostCr": 23136.0,
    "revisedCostCr": 37276.0,
    "expenditureCr": 35959.97,
    "forecastCostCr": 39397.0,
    "originalDeadline": "03/2023",
    "predictedCompletionDate": "08/2025",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 99.21,
    "progressGap": 0.8,
    "financialProgress": 96.5,
    "healthScore": 34,
    "riskLevel": "CRITICAL",
    "riskTrend": -1.3,
    "costRiskScore": 73,
    "timeRiskScore": 98,
    "executionRiskScore": 27,
    "predictedDelayMonths": 29,
    "predictedCostOverrunCr": 14140.0,
    "primaryRiskDriver": "Phase-2 (BKC to Cuffe Parade) Integrated Signaling & Station Finishes",
    "secondaryRiskDriver": "Nodal Agency: Mumbai Metro Rail Corporation Limited [MMRC]",
    "priorityScore": 73.8,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702637-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2013",
        "actualDate": "07/2013",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702637-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "06/2016",
        "actualDate": "06/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702637-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2023",
        "revisedDate": "08/2025",
        "status": "DELAYED",
        "delayDays": 870,
        "criticalPath": true
      },
      {
        "id": "m-702637-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "08/2025",
        "status": "ON_TRACK",
        "delayDays": 870
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702637 monitored by MoSPI. Implemented by Mumbai Metro Rail Corporation Limited [MMRC] in Maharashtra. Sanctioned budget of \u20b923,136.00 Cr, current revised cost \u20b937,276.00 Cr with \u20b935,959.97 Cr spent to date (96.5% financial). Physical completion stands at 99.2%. Primary risk driver: Phase-2 (BKC to Cuffe Parade) Integrated Signaling & Station Finishes. Prescriptive action: Complete trial runs and obtain final statutory safety certificate.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b92311.71 Cr with physical progress moving from 97.9% to 99.2% (+1.4%). Revised completion target: 08/2025.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "97.9%",
          "current": "99.2%",
          "delta": "+1.4%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b933648.26 Cr",
          "current": "\u20b935959.97 Cr",
          "delta": "+\u20b92311.71 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "08/2025",
          "current": "08/2025",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702637 (Mumbai Metro Rail Corporation Limited [MMRC]).",
        "Approved date: 07/2013, Work started: 06/2016.",
        "Key focus: Phase-2 (BKC to Cuffe Parade) Integrated Signaling & Station Finishes"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 66
      },
      {
        "date": "August 2026 (P)",
        "score": 69,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 71,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 23136.0,
        "revised": 37276.0,
        "expenditure": 33526.69,
        "forecast": 39139.8
      },
      {
        "period": "May 2026",
        "sanctioned": 23136.0,
        "revised": 37276.0,
        "expenditure": 33648.26,
        "forecast": 39139.8
      },
      {
        "period": "June 2026",
        "sanctioned": 23136.0,
        "revised": 37276.0,
        "expenditure": 33648.26,
        "forecast": 39512.56
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 23136.0,
        "revised": 37276.0,
        "expenditure": 35959.97,
        "forecast": 39397.0
      }
    ],
    "startDate": "06/2016",
    "recommendedActions": [
      "Complete trial runs and obtain final statutory safety certificate."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702668",
    "code": "PAIMANA-702668",
    "name": "Chennai Metro Rail Phase-II Development Project",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Tamil Nadu",
    "stage": "Under Construction",
    "implementingAgency": "Chennai Metro Rail Limited [CMRL]",
    "sanctionedCostCr": 63246.0,
    "revisedCostCr": 63246.0,
    "expenditureCr": 34698.0,
    "forecastCostCr": 63246.0,
    "originalDeadline": "08/2029",
    "predictedCompletionDate": "03/2030",
    "expectedProgress": 64.1,
    "currentPhysicalProgress": 55.73,
    "progressGap": 8.4,
    "financialProgress": 54.9,
    "healthScore": 78,
    "riskLevel": "HIGH",
    "riskTrend": -1.6,
    "costRiskScore": 30,
    "timeRiskScore": 48,
    "executionRiskScore": 42,
    "predictedDelayMonths": 7,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Charnockite Hard-Rock TBM Drives & Underwater Adyar River Crossing",
    "secondaryRiskDriver": "Nodal Agency: Chennai Metro Rail Limited [CMRL]",
    "priorityScore": 39.6,
    "impactScore": 98,
    "escalationStatus": "UNDER_REVIEW",
    "keyMilestones": [
      {
        "id": "m-702668-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2024",
        "actualDate": "10/2024",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702668-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "11/2020",
        "actualDate": "11/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702668-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "08/2029",
        "revisedDate": "03/2030",
        "status": "DELAYED",
        "delayDays": 210,
        "criticalPath": true
      },
      {
        "id": "m-702668-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2030",
        "status": "DELAYED",
        "delayDays": 210
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702668 monitored by MoSPI. Implemented by Chennai Metro Rail Limited [CMRL] in Tamil Nadu. Sanctioned budget of \u20b963,246.00 Cr, current revised cost \u20b963,246.00 Cr with \u20b934,698.00 Cr spent to date (54.9% financial). Physical completion stands at 55.7%. Primary risk driver: Charnockite Hard-Rock TBM Drives & Underwater Adyar River Crossing. Prescriptive action: Deploy high-pressure slurry TBMs and ensure round-the-clock traffic NOCs.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9924.00 Cr with physical progress moving from 53.4% to 55.7% (+2.4%). Revised completion target: 03/2030.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "53.4%",
          "current": "55.7%",
          "delta": "+2.4%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b933774.00 Cr",
          "current": "\u20b934698.00 Cr",
          "delta": "+\u20b9924.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2030",
          "current": "03/2030",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702668 (Chennai Metro Rail Limited [CMRL]).",
        "Approved date: 10/2024, Work started: 11/2020.",
        "Key focus: Charnockite Hard-Rock TBM Drives & Underwater Adyar River Crossing"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 58
      },
      {
        "date": "May 2026",
        "score": 56
      },
      {
        "date": "June 2026",
        "score": 56
      },
      {
        "date": "July 2026 (Live)",
        "score": 22
      },
      {
        "date": "August 2026 (P)",
        "score": 23,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 24,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 63246.0,
        "revised": 63246.0,
        "expenditure": 33129.33,
        "forecast": 66408.3
      },
      {
        "period": "May 2026",
        "sanctioned": 63246.0,
        "revised": 63246.0,
        "expenditure": 33774.0,
        "forecast": 66408.3
      },
      {
        "period": "June 2026",
        "sanctioned": 63246.0,
        "revised": 63246.0,
        "expenditure": 33774.0,
        "forecast": 67040.76
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 63246.0,
        "revised": 63246.0,
        "expenditure": 34698.0,
        "forecast": 63246.0
      }
    ],
    "startDate": "11/2020",
    "recommendedActions": [
      "Deploy high-pressure slurry TBMs and ensure round-the-clock traffic NOCs."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "702628",
    "code": "PAIMANA-702628",
    "name": "Kanpur Metro Rail Project",
    "sector": "Urban Mass Transit",
    "ministry": "MoHUA",
    "state": "Uttar Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Uttar Pradesh Metro Rail Corporation [UPMRC]",
    "sanctionedCostCr": 11076.48,
    "revisedCostCr": 11076.48,
    "expenditureCr": 9463.15,
    "forecastCostCr": 11076.48,
    "originalDeadline": "05/2024",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 83.0,
    "progressGap": 17.0,
    "financialProgress": 85.4,
    "healthScore": 64,
    "riskLevel": "CRITICAL",
    "riskTrend": 1.1,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 59,
    "predictedDelayMonths": 34,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Corridor-1 Underground Chunniganj to Nayaganj TBM Tunneling",
    "secondaryRiskDriver": "Nodal Agency: Uttar Pradesh Metro Rail Corporation [UPMRC]",
    "priorityScore": 63.0,
    "impactScore": 89,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-702628-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "05/2019",
        "actualDate": "05/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702628-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "11/2019",
        "actualDate": "11/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-702628-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "05/2024",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1020,
        "criticalPath": true
      },
      {
        "id": "m-702628-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 1020
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 702628 monitored by MoSPI. Implemented by Uttar Pradesh Metro Rail Corporation [UPMRC] in Uttar Pradesh. Sanctioned budget of \u20b911,076.48 Cr, current revised cost \u20b911,076.48 Cr with \u20b99,463.15 Cr spent to date (85.4% financial). Physical completion stands at 83.0%. Primary risk driver: Corridor-1 Underground Chunniganj to Nayaganj TBM Tunneling. Prescriptive action: Complete underground station diaphragm walls and track fastening.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9332.00 Cr with physical progress moving from 82.5% to 83.0% (+0.5%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "82.5%",
          "current": "83.0%",
          "delta": "+0.5%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b99131.15 Cr",
          "current": "\u20b99463.15 Cr",
          "delta": "+\u20b9332.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 702628 (Uttar Pradesh Metro Rail Corporation [UPMRC]).",
        "Approved date: 05/2019, Work started: 11/2019.",
        "Key focus: Corridor-1 Underground Chunniganj to Nayaganj TBM Tunneling"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 36
      },
      {
        "date": "August 2026 (P)",
        "score": 37,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 39,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 11076.48,
        "revised": 11076.5,
        "expenditure": 9101.15,
        "forecast": 11630.33
      },
      {
        "period": "May 2026",
        "sanctioned": 11076.48,
        "revised": 11076.5,
        "expenditure": 9121.15,
        "forecast": 11630.33
      },
      {
        "period": "June 2026",
        "sanctioned": 11076.48,
        "revised": 11076.5,
        "expenditure": 9131.15,
        "forecast": 11741.09
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 11076.48,
        "revised": 11076.48,
        "expenditure": 9463.15,
        "forecast": 11076.48
      }
    ],
    "startDate": "11/2019",
    "recommendedActions": [
      "Complete underground station diaphragm walls and track fastening."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701263",
    "code": "PAIMANA-701263",
    "name": "Rajasthan Refinery Project (HRRL Pachpadra)",
    "sector": "Petroleum & Natural Gas",
    "ministry": "MoPNG",
    "state": "Rajasthan",
    "stage": "Testing & Commissioning",
    "implementingAgency": "HPCL Rajasthan Refinery Limited",
    "sanctionedCostCr": 43129.0,
    "revisedCostCr": 79459.0,
    "expenditureCr": 69996.68,
    "forecastCostCr": 84908.5,
    "originalDeadline": "10/2022",
    "predictedCompletionDate": "06/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 92.1,
    "progressGap": 7.9,
    "financialProgress": 88.1,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.2,
    "costRiskScore": 89,
    "timeRiskScore": 98,
    "executionRiskScore": 41,
    "predictedDelayMonths": 44,
    "predictedCostOverrunCr": 36330.0,
    "primaryRiskDriver": "Crude Distillation Unit (CDU/VDU) & Petrochemical Fluidized Catalytic Cracking (PFCC)",
    "secondaryRiskDriver": "Nodal Agency: HPCL Rajasthan Refinery Limited",
    "priorityScore": 83.0,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701263-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2017",
        "actualDate": "10/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701263-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "10/2017",
        "actualDate": "10/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701263-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "10/2022",
        "revisedDate": "06/2026",
        "status": "DELAYED",
        "delayDays": 1320,
        "criticalPath": true
      },
      {
        "id": "m-701263-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2026",
        "status": "ON_TRACK",
        "delayDays": 1320
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701263 monitored by MoSPI. Implemented by HPCL Rajasthan Refinery Limited in Rajasthan. Sanctioned budget of \u20b943,129.00 Cr, current revised cost \u20b979,459.00 Cr with \u20b969,996.68 Cr spent to date (88.1% financial). Physical completion stands at 92.1%. Primary risk driver: Crude Distillation Unit (CDU/VDU) & Petrochemical Fluidized Catalytic Cracking (PFCC). Prescriptive action: Initiate steam blowing and hydro-testing of processing units.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 92.1% to 92.1% (+0.0%). Revised completion target: 06/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "92.1%",
          "current": "92.1%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b969996.68 Cr",
          "current": "\u20b969996.68 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "06/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701263 (HPCL Rajasthan Refinery Limited).",
        "Approved date: 10/2017, Work started: 10/2017.",
        "Key focus: Crude Distillation Unit (CDU/VDU) & Petrochemical Fluidized Catalytic Cracking (PFCC)"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 43129.0,
        "revised": 79459.0,
        "expenditure": 69202.21,
        "forecast": 83431.95
      },
      {
        "period": "May 2026",
        "sanctioned": 43129.0,
        "revised": 79459.0,
        "expenditure": 69996.68,
        "forecast": 83431.95
      },
      {
        "period": "June 2026",
        "sanctioned": 43129.0,
        "revised": 79459.0,
        "expenditure": 69996.68,
        "forecast": 84226.54
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 43129.0,
        "revised": 79459.0,
        "expenditure": 69996.68,
        "forecast": 84908.5
      }
    ],
    "startDate": "10/2017",
    "recommendedActions": [
      "Initiate steam blowing and hydro-testing of processing units."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400120",
    "code": "PAIMANA-400120",
    "name": "KG-DWN-98/2 Cluster-II Deepwater Development Project",
    "sector": "Petroleum & Natural Gas",
    "ministry": "MoPNG",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Oil and Natural Gas Corporation Limited [ONGC]",
    "sanctionedCostCr": 25151.96,
    "revisedCostCr": 34012.0,
    "expenditureCr": 23048.58,
    "forecastCostCr": 35341.01,
    "originalDeadline": "06/2020",
    "predictedCompletionDate": "09/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 96.9,
    "progressGap": 3.1,
    "financialProgress": 67.8,
    "healthScore": 47,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.2,
    "costRiskScore": 55,
    "timeRiskScore": 98,
    "executionRiskScore": 31,
    "predictedDelayMonths": 75,
    "predictedCostOverrunCr": 8860.04,
    "primaryRiskDriver": "Subsea Wellhead Tie-back & Floating Production Storage and Offloading (FPSO)",
    "secondaryRiskDriver": "Nodal Agency: Oil and Natural Gas Corporation Limited [ONGC]",
    "priorityScore": 67.4,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-400120-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2016",
        "actualDate": "03/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400120-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2016",
        "actualDate": "03/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400120-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2020",
        "revisedDate": "09/2026",
        "status": "DELAYED",
        "delayDays": 2250,
        "criticalPath": true
      },
      {
        "id": "m-400120-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "09/2026",
        "status": "ON_TRACK",
        "delayDays": 2250
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400120 monitored by MoSPI. Implemented by Oil and Natural Gas Corporation Limited [ONGC] in Andhra Pradesh. Sanctioned budget of \u20b925,151.96 Cr, current revised cost \u20b934,012.00 Cr with \u20b923,048.58 Cr spent to date (67.8% financial). Physical completion stands at 96.9%. Primary risk driver: Subsea Wellhead Tie-back & Floating Production Storage and Offloading (FPSO). Prescriptive action: Ramp up deepwater gas throughput from Cluster-II northern fields.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9-9705.85 Cr with physical progress moving from 96.8% to 96.9% (+0.1%). Revised completion target: 09/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "96.8%",
          "current": "96.9%",
          "delta": "+0.1%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b932754.43 Cr",
          "current": "\u20b923048.58 Cr",
          "delta": "+\u20b9-9705.85 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "09/2026",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400120 (Oil and Natural Gas Corporation Limited [ONGC]).",
        "Approved date: 03/2016, Work started: 03/2016.",
        "Key focus: Subsea Wellhead Tie-back & Floating Production Storage and Offloading (FPSO)"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 53
      },
      {
        "date": "August 2026 (P)",
        "score": 55,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 57,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 25151.96,
        "revised": 34012.0,
        "expenditure": 101617.3,
        "forecast": 35712.6
      },
      {
        "period": "May 2026",
        "sanctioned": 25151.96,
        "revised": 34012.0,
        "expenditure": 103092.24,
        "forecast": 35712.6
      },
      {
        "period": "June 2026",
        "sanctioned": 25151.96,
        "revised": 34012.0,
        "expenditure": 32754.43,
        "forecast": 36052.72
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 25151.96,
        "revised": 34012.0,
        "expenditure": 23048.58,
        "forecast": 35341.01
      }
    ],
    "startDate": "03/2016",
    "recommendedActions": [
      "Ramp up deepwater gas throughput from Cluster-II northern fields."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "604791",
    "code": "PAIMANA-604791",
    "name": "Numaligarh Refinery Expansion Project [3 to 9 MMTPA]",
    "sector": "Petroleum & Natural Gas",
    "ministry": "MoPNG",
    "state": "Assam",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Numaligarh Refinery Limited",
    "sanctionedCostCr": 12366.0,
    "revisedCostCr": 25313.0,
    "expenditureCr": 20411.19,
    "forecastCostCr": 27255.05,
    "originalDeadline": "07/2024",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 87.0,
    "progressGap": 13.0,
    "financialProgress": 80.6,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.8,
    "costRiskScore": 98,
    "timeRiskScore": 98,
    "executionRiskScore": 51,
    "predictedDelayMonths": 32,
    "predictedCostOverrunCr": 12947.0,
    "primaryRiskDriver": "Crude Import Pipeline from Paradip Port & Delayed Coker Unit",
    "secondaryRiskDriver": "Nodal Agency: Numaligarh Refinery Limited",
    "priorityScore": 88.6,
    "impactScore": 97,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-604791-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2020",
        "actualDate": "07/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-604791-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2020",
        "actualDate": "07/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-604791-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "07/2024",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 960,
        "criticalPath": true
      },
      {
        "id": "m-604791-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 960
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 604791 monitored by MoSPI. Implemented by Numaligarh Refinery Limited in Assam. Sanctioned budget of \u20b912,366.00 Cr, current revised cost \u20b925,313.00 Cr with \u20b920,411.19 Cr spent to date (80.6% financial). Physical completion stands at 87.0%. Primary risk driver: Crude Import Pipeline from Paradip Port & Delayed Coker Unit. Prescriptive action: Complete hydro-testing of 1,600 km crude pipeline right of way.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9284.09 Cr with physical progress moving from 86.2% to 87.0% (+0.8%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "86.2%",
          "current": "87.0%",
          "delta": "+0.8%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b920127.10 Cr",
          "current": "\u20b920411.19 Cr",
          "delta": "+\u20b9284.09 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 604791 (Numaligarh Refinery Limited).",
        "Approved date: 07/2020, Work started: 07/2020.",
        "Key focus: Crude Import Pipeline from Paradip Port & Delayed Coker Unit"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 12366.0,
        "revised": 22494.0,
        "expenditure": 19522.33,
        "forecast": 23618.7
      },
      {
        "period": "May 2026",
        "sanctioned": 12366.0,
        "revised": 25313.0,
        "expenditure": 19820.29,
        "forecast": 26578.65
      },
      {
        "period": "June 2026",
        "sanctioned": 12366.0,
        "revised": 25313.0,
        "expenditure": 20127.1,
        "forecast": 26831.78
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 12366.0,
        "revised": 25313.0,
        "expenditure": 20411.19,
        "forecast": 27255.05
      }
    ],
    "startDate": "07/2020",
    "recommendedActions": [
      "Complete hydro-testing of 1,600 km crude pipeline right of way."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701289",
    "code": "PAIMANA-701289",
    "name": "Panipat Refinery Capacity Expansion [15 to 25 MMTPA]",
    "sector": "Petroleum & Natural Gas",
    "ministry": "MoPNG",
    "state": "Haryana",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Indian Oil Corporation Limited [IOCL]",
    "sanctionedCostCr": 34627.0,
    "revisedCostCr": 36225.0,
    "expenditureCr": 28007.35,
    "forecastCostCr": 36464.7,
    "originalDeadline": "09/2024",
    "predictedCompletionDate": "12/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 94.3,
    "progressGap": 5.7,
    "financialProgress": 77.3,
    "healthScore": 63,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.5,
    "costRiskScore": 33,
    "timeRiskScore": 98,
    "executionRiskScore": 36,
    "predictedDelayMonths": 27,
    "predictedCostOverrunCr": 1598.0,
    "primaryRiskDriver": "Polypropylene Unit & Captive Power Plant Integration",
    "secondaryRiskDriver": "Nodal Agency: Indian Oil Corporation Limited [IOCL]",
    "priorityScore": 59.6,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701289-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2021",
        "actualDate": "02/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701289-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "02/2021",
        "actualDate": "02/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701289-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2024",
        "revisedDate": "12/2026",
        "status": "DELAYED",
        "delayDays": 810,
        "criticalPath": true
      },
      {
        "id": "m-701289-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2026",
        "status": "ON_TRACK",
        "delayDays": 810
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701289 monitored by MoSPI. Implemented by Indian Oil Corporation Limited [IOCL] in Haryana. Sanctioned budget of \u20b934,627.00 Cr, current revised cost \u20b936,225.00 Cr with \u20b928,007.35 Cr spent to date (77.3% financial). Physical completion stands at 94.3%. Primary risk driver: Polypropylene Unit & Captive Power Plant Integration. Prescriptive action: Complete pre-commissioning checks on Indmax Catalytic Cracking Unit.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9489.32 Cr with physical progress moving from 94.0% to 94.3% (+0.3%). Revised completion target: 12/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "94.0%",
          "current": "94.3%",
          "delta": "+0.3%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b927518.03 Cr",
          "current": "\u20b928007.35 Cr",
          "delta": "+\u20b9489.32 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2026",
          "current": "12/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701289 (Indian Oil Corporation Limited [IOCL]).",
        "Approved date: 02/2021, Work started: 02/2021.",
        "Key focus: Polypropylene Unit & Captive Power Plant Integration"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 37
      },
      {
        "date": "August 2026 (P)",
        "score": 38,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 40,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 34627.0,
        "revised": 36225.0,
        "expenditure": 27035.45,
        "forecast": 38036.25
      },
      {
        "period": "May 2026",
        "sanctioned": 34627.0,
        "revised": 36225.0,
        "expenditure": 27014.44,
        "forecast": 38036.25
      },
      {
        "period": "June 2026",
        "sanctioned": 34627.0,
        "revised": 36225.0,
        "expenditure": 27518.03,
        "forecast": 38398.5
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 34627.0,
        "revised": 36225.0,
        "expenditure": 28007.35,
        "forecast": 36464.7
      }
    ],
    "startDate": "02/2021",
    "recommendedActions": [
      "Complete pre-commissioning checks on Indmax Catalytic Cracking Unit."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "709798",
    "code": "PAIMANA-709798",
    "name": "Ethylene Cracker Project at Bina Refinery",
    "sector": "Petroleum & Natural Gas",
    "ministry": "MoPNG",
    "state": "Madhya Pradesh",
    "stage": "Under Construction",
    "implementingAgency": "Bharat Petroleum Corporation Limited [BPCL]",
    "sanctionedCostCr": 43367.0,
    "revisedCostCr": 43367.0,
    "expenditureCr": 6104.0,
    "forecastCostCr": 43367.0,
    "originalDeadline": "05/2028",
    "predictedCompletionDate": "05/2028",
    "expectedProgress": 33.5,
    "currentPhysicalProgress": 33.5,
    "progressGap": 0.0,
    "financialProgress": 14.1,
    "healthScore": 79,
    "riskLevel": "WATCH",
    "riskTrend": 2.4,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Petrochemical Complex Piling & Heavy Reactor Foundations",
    "secondaryRiskDriver": "Nodal Agency: Bharat Petroleum Corporation Limited [BPCL]",
    "priorityScore": 29.0,
    "impactScore": 98,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-709798-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "05/2023",
        "actualDate": "05/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-709798-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "05/2023",
        "actualDate": "05/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-709798-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "05/2028",
        "revisedDate": "05/2028",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-709798-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "05/2028",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 709798 monitored by MoSPI. Implemented by Bharat Petroleum Corporation Limited [BPCL] in Madhya Pradesh. Sanctioned budget of \u20b943,367.00 Cr, current revised cost \u20b943,367.00 Cr with \u20b96,104.00 Cr spent to date (14.1% financial). Physical completion stands at 33.5%. Primary risk driver: Petrochemical Complex Piling & Heavy Reactor Foundations. Prescriptive action: Accelerate long-lead equipment procurement (quench towers, cracking furnaces).",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9508.00 Cr with physical progress moving from 30.7% to 33.5% (+2.8%). Revised completion target: 05/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "30.7%",
          "current": "33.5%",
          "delta": "+2.8%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b95596.00 Cr",
          "current": "\u20b96104.00 Cr",
          "delta": "+\u20b9508.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "05/2028",
          "current": "05/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 709798 (Bharat Petroleum Corporation Limited [BPCL]).",
        "Approved date: 05/2023, Work started: 05/2023.",
        "Key focus: Petrochemical Complex Piling & Heavy Reactor Foundations"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 82
      },
      {
        "date": "May 2026",
        "score": 80
      },
      {
        "date": "June 2026",
        "score": 79
      },
      {
        "date": "July 2026 (Live)",
        "score": 21
      },
      {
        "date": "August 2026 (P)",
        "score": 22,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 23,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 43367.0,
        "revised": 43367.0,
        "expenditure": 4802.7,
        "forecast": 45535.35
      },
      {
        "period": "May 2026",
        "sanctioned": 43367.0,
        "revised": 43367.0,
        "expenditure": 5115.7,
        "forecast": 45535.35
      },
      {
        "period": "June 2026",
        "sanctioned": 43367.0,
        "revised": 43367.0,
        "expenditure": 5596.0,
        "forecast": 45969.02
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 43367.0,
        "revised": 43367.0,
        "expenditure": 6104.0,
        "forecast": 43367.0
      }
    ],
    "startDate": "05/2023",
    "recommendedActions": [
      "Accelerate long-lead equipment procurement (quench towers, cracking furnaces)."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "705728",
    "code": "PAIMANA-705728",
    "name": "Mumbai-Ahmedabad High Speed Rail Project [508 km Bullet Train]",
    "sector": "Railways",
    "ministry": "MoR",
    "state": "Multi-States (Dadra & Nagar Haveli and Daman & Diu, Gujarat, Maharashtra)",
    "stage": "Under Construction",
    "implementingAgency": "National High Speed Rail Corporation Limited [NHSRCL]",
    "sanctionedCostCr": 108000.0,
    "revisedCostCr": 108000.0,
    "expenditureCr": 90966.89,
    "forecastCostCr": 108000.0,
    "originalDeadline": "08/2027",
    "predictedCompletionDate": "12/2029",
    "expectedProgress": 95.8,
    "currentPhysicalProgress": 62.16,
    "progressGap": 33.6,
    "financialProgress": 84.2,
    "healthScore": 56,
    "riskLevel": "CRITICAL",
    "riskTrend": -0.3,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 92,
    "predictedDelayMonths": 28,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Undersea Tunnel at Thane Creek & High-Speed Track Slab Laying",
    "secondaryRiskDriver": "Nodal Agency: National High Speed Rail Corporation Limited [NHSRCL]",
    "priorityScore": 69.6,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-705728-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2015",
        "actualDate": "03/2015",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705728-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "09/2017",
        "actualDate": "09/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705728-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "08/2027",
        "revisedDate": "12/2029",
        "status": "DELAYED",
        "delayDays": 840,
        "criticalPath": true
      },
      {
        "id": "m-705728-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2029",
        "status": "DELAYED",
        "delayDays": 840
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 705728 monitored by MoSPI. Implemented by National High Speed Rail Corporation Limited [NHSRCL] in Multi-States (Dadra & Nagar Haveli and Daman & Diu, Gujarat, Maharashtra). Sanctioned budget of \u20b9108,000.00 Cr, current revised cost \u20b9108,000.00 Cr with \u20b990,966.89 Cr spent to date (84.2% financial). Physical completion stands at 62.2%. Primary risk driver: Undersea Tunnel at Thane Creek & High-Speed Track Slab Laying. Prescriptive action: Maintain progress on Gujarat viaduct segments while advancing BKC underground station.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 60.9% to 62.2% (+1.3%). Revised completion target: 12/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "60.9%",
          "current": "62.2%",
          "delta": "+1.3%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b990966.89 Cr",
          "current": "\u20b990966.89 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2029",
          "current": "12/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 705728 (National High Speed Rail Corporation Limited [NHSRCL]).",
        "Approved date: 03/2015, Work started: 09/2017.",
        "Key focus: Undersea Tunnel at Thane Creek & High-Speed Track Slab Laying"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 36
      },
      {
        "date": "May 2026",
        "score": 32
      },
      {
        "date": "June 2026",
        "score": 29
      },
      {
        "date": "July 2026 (Live)",
        "score": 44
      },
      {
        "date": "August 2026 (P)",
        "score": 46,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 48,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 108000.0,
        "revised": 108000.0,
        "expenditure": 90501.89,
        "forecast": 113400.0
      },
      {
        "period": "May 2026",
        "sanctioned": 108000.0,
        "revised": 108000.0,
        "expenditure": 90966.89,
        "forecast": 113400.0
      },
      {
        "period": "June 2026",
        "sanctioned": 108000.0,
        "revised": 108000.0,
        "expenditure": 90966.89,
        "forecast": 114480.0
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 108000.0,
        "revised": 108000.0,
        "expenditure": 90966.89,
        "forecast": 108000.0
      }
    ],
    "startDate": "09/2017",
    "recommendedActions": [
      "Maintain progress on Gujarat viaduct segments while advancing BKC underground station."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "705237",
    "code": "PAIMANA-705237",
    "name": "Western Dedicated Freight Corridor [1504 km]",
    "sector": "Railways",
    "ministry": "MoR",
    "state": "Multi-States (Gujarat, Haryana, Maharashtra, Rajasthan, Uttar Pradesh)",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Dedicated Freight Corridor Corporation of India [DFCCIL]",
    "sanctionedCostCr": 51101.0,
    "revisedCostCr": 124005.0,
    "expenditureCr": 124623.0,
    "forecastCostCr": 134940.6,
    "originalDeadline": "03/2022",
    "predictedCompletionDate": "12/2025",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 96.0,
    "progressGap": 4.0,
    "financialProgress": 100.5,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.0,
    "costRiskScore": 98,
    "timeRiskScore": 98,
    "executionRiskScore": 33,
    "predictedDelayMonths": 45,
    "predictedCostOverrunCr": 72904.0,
    "primaryRiskDriver": "Vaitarna River Bridge & JNPT Port Last-Mile Connection",
    "secondaryRiskDriver": "Nodal Agency: Dedicated Freight Corridor Corporation of India [DFCCIL]",
    "priorityScore": 85.0,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-705237-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2008",
        "actualDate": "02/2008",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705237-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "01/2012",
        "actualDate": "01/2012",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705237-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2022",
        "revisedDate": "12/2025",
        "status": "DELAYED",
        "delayDays": 1350,
        "criticalPath": true
      },
      {
        "id": "m-705237-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2025",
        "status": "ON_TRACK",
        "delayDays": 1350
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 705237 monitored by MoSPI. Implemented by Dedicated Freight Corridor Corporation of India [DFCCIL] in Multi-States (Gujarat, Haryana, Maharashtra, Rajasthan, Uttar Pradesh). Sanctioned budget of \u20b951,101.00 Cr, current revised cost \u20b9124,005.00 Cr with \u20b9124,623.00 Cr spent to date (100.5% financial). Physical completion stands at 96.0%. Primary risk driver: Vaitarna River Bridge & JNPT Port Last-Mile Connection. Prescriptive action: Resolve suburban railway intersection constraints near Dahanu Road.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 96.0% to 96.0% (+0.0%). Revised completion target: 12/2025.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "96.0%",
          "current": "96.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9124623.00 Cr",
          "current": "\u20b9124623.00 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2025",
          "current": "12/2025",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 705237 (Dedicated Freight Corridor Corporation of India [DFCCIL]).",
        "Approved date: 02/2008, Work started: 01/2012.",
        "Key focus: Vaitarna River Bridge & JNPT Port Last-Mile Connection"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 51101.0,
        "revised": 124005.0,
        "expenditure": 124623.0,
        "forecast": 130205.25
      },
      {
        "period": "May 2026",
        "sanctioned": 51101.0,
        "revised": 124005.0,
        "expenditure": 124623.0,
        "forecast": 130205.25
      },
      {
        "period": "June 2026",
        "sanctioned": 51101.0,
        "revised": 124005.0,
        "expenditure": 124623.0,
        "forecast": 131445.3
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 51101.0,
        "revised": 124005.0,
        "expenditure": 124623.0,
        "forecast": 134940.6
      }
    ],
    "startDate": "01/2012",
    "recommendedActions": [
      "Resolve suburban railway intersection constraints near Dahanu Road."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "705429",
    "code": "PAIMANA-705429",
    "name": "Rishikesh-Karnaprayag New Broad Gauge Rail Line [125 km]",
    "sector": "Railways",
    "ministry": "MoR",
    "state": "Uttarakhand",
    "stage": "Under Construction",
    "implementingAgency": "Rail Vikas Nigam Limited [RVNL]",
    "sanctionedCostCr": 38953.0,
    "revisedCostCr": 38953.0,
    "expenditureCr": 28828.18,
    "forecastCostCr": 38953.0,
    "originalDeadline": "12/2025",
    "predictedCompletionDate": "12/2028",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 77.5,
    "progressGap": 22.5,
    "financialProgress": 74.0,
    "healthScore": 62,
    "riskLevel": "CRITICAL",
    "riskTrend": 3.5,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 70,
    "predictedDelayMonths": 36,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Tunnel Boring Machine (TBM) Mining in Fragile Himalayan Geology",
    "secondaryRiskDriver": "Nodal Agency: Rail Vikas Nigam Limited [RVNL]",
    "priorityScore": 65.2,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-705429-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "11/2016",
        "actualDate": "11/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705429-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "08/2018",
        "actualDate": "08/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705429-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "12/2025",
        "revisedDate": "12/2028",
        "status": "DELAYED",
        "delayDays": 1080,
        "criticalPath": true
      },
      {
        "id": "m-705429-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2028",
        "status": "DELAYED",
        "delayDays": 1080
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 705429 monitored by MoSPI. Implemented by Rail Vikas Nigam Limited [RVNL] in Uttarakhand. Sanctioned budget of \u20b938,953.00 Cr, current revised cost \u20b938,953.00 Cr with \u20b928,828.18 Cr spent to date (74.0% financial). Physical completion stands at 77.5%. Primary risk driver: Tunnel Boring Machine (TBM) Mining in Fragile Himalayan Geology. Prescriptive action: Enforce pre-excavation drainage grouting to mitigate water ingress in Tunnel 8.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 77.5% to 77.5% (+0.0%). Revised completion target: 12/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "77.5%",
          "current": "77.5%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b928828.18 Cr",
          "current": "\u20b928828.18 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2028",
          "current": "12/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 705429 (Rail Vikas Nigam Limited [RVNL]).",
        "Approved date: 11/2016, Work started: 08/2018.",
        "Key focus: Tunnel Boring Machine (TBM) Mining in Fragile Himalayan Geology"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 38
      },
      {
        "date": "August 2026 (P)",
        "score": 40,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 41,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 38953.0,
        "revised": 38953.0,
        "expenditure": 28286.15,
        "forecast": 40900.65
      },
      {
        "period": "May 2026",
        "sanctioned": 38953.0,
        "revised": 38953.0,
        "expenditure": 28508.86,
        "forecast": 40900.65
      },
      {
        "period": "June 2026",
        "sanctioned": 38953.0,
        "revised": 38953.0,
        "expenditure": 28828.18,
        "forecast": 41290.18
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 38953.0,
        "revised": 38953.0,
        "expenditure": 28828.18,
        "forecast": 38953.0
      }
    ],
    "startDate": "08/2018",
    "recommendedActions": [
      "Enforce pre-excavation drainage grouting to mitigate water ingress in Tunnel 8."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "705432",
    "code": "PAIMANA-705432",
    "name": "Sivok-Rangpo New Broad Gauge Rail Link Project [45 km]",
    "sector": "Railways",
    "ministry": "MoR",
    "state": "Multi-States (Sikkim, West Bengal)",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Indian Railway Construction International Limited [IRCON]",
    "sanctionedCostCr": 7877.0,
    "revisedCostCr": 11775.05,
    "expenditureCr": 11090.47,
    "forecastCostCr": 12359.76,
    "originalDeadline": "05/2015",
    "predictedCompletionDate": "12/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 80.0,
    "progressGap": 20.0,
    "financialProgress": 94.2,
    "healthScore": 38,
    "riskLevel": "CRITICAL",
    "riskTrend": -13.0,
    "costRiskScore": 65,
    "timeRiskScore": 98,
    "executionRiskScore": 65,
    "predictedDelayMonths": 151,
    "predictedCostOverrunCr": 3898.0499999999993,
    "primaryRiskDriver": "Teesta River Bridge Piers & Tunnel 14 Squeezing Fault Zone",
    "secondaryRiskDriver": "Nodal Agency: Indian Railway Construction International Limited [IRCON]",
    "priorityScore": 78.2,
    "impactScore": 90,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-705432-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "10/2009",
        "actualDate": "10/2009",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705432-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "05/2010",
        "actualDate": "05/2010",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-705432-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "05/2015",
        "revisedDate": "12/2027",
        "status": "DELAYED",
        "delayDays": 4530,
        "criticalPath": true
      },
      {
        "id": "m-705432-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "12/2027",
        "status": "DELAYED",
        "delayDays": 4530
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 705432 monitored by MoSPI. Implemented by Indian Railway Construction International Limited [IRCON] in Multi-States (Sikkim, West Bengal). Sanctioned budget of \u20b97,877.00 Cr, current revised cost \u20b911,775.05 Cr with \u20b911,090.47 Cr spent to date (94.2% financial). Physical completion stands at 80.0%. Primary risk driver: Teesta River Bridge Piers & Tunnel 14 Squeezing Fault Zone. Prescriptive action: Execute slope protection works along Sevoke national highway boundary.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 80.0% to 80.0% (+0.0%). Revised completion target: 12/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "80.0%",
          "current": "80.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b911090.47 Cr",
          "current": "\u20b911090.47 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "12/2027",
          "current": "12/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 705432 (Indian Railway Construction International Limited [IRCON]).",
        "Approved date: 10/2009, Work started: 05/2010.",
        "Key focus: Teesta River Bridge Piers & Tunnel 14 Squeezing Fault Zone"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 62
      },
      {
        "date": "August 2026 (P)",
        "score": 64,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 67,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 7877.0,
        "revised": 11775.0,
        "expenditure": 10770.42,
        "forecast": 12363.75
      },
      {
        "period": "May 2026",
        "sanctioned": 7877.0,
        "revised": 11775.0,
        "expenditure": 10933.68,
        "forecast": 12363.75
      },
      {
        "period": "June 2026",
        "sanctioned": 7877.0,
        "revised": 11775.05,
        "expenditure": 11090.47,
        "forecast": 12481.55
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 7877.0,
        "revised": 11775.05,
        "expenditure": 11090.47,
        "forecast": 12359.76
      }
    ],
    "startDate": "05/2010",
    "recommendedActions": [
      "Execute slope protection works along Sevoke national highway boundary."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "616699",
    "code": "PAIMANA-616699",
    "name": "Multi-tracking of Son Nagar - Andal Coal Freight Corridor [375 km]",
    "sector": "Railways",
    "ministry": "MoR",
    "state": "Multi-States (Bihar, Jharkhand)",
    "stage": "Pre-Construction",
    "implementingAgency": "East Central Railway [ECR]",
    "sanctionedCostCr": 12333.57,
    "revisedCostCr": 12333.57,
    "expenditureCr": 1152.79,
    "forecastCostCr": 12333.57,
    "originalDeadline": "03/2028",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 3.0,
    "currentPhysicalProgress": 3.0,
    "progressGap": 0.0,
    "financialProgress": 9.3,
    "healthScore": 67,
    "riskLevel": "WATCH",
    "riskTrend": 15.5,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Grand Chord Track Tripling & Automatic Signaling Blocks",
    "secondaryRiskDriver": "Nodal Agency: East Central Railway [ECR]",
    "priorityScore": 29.0,
    "impactScore": 90,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-616699-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "08/2023",
        "actualDate": "08/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-616699-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "08/2023",
        "actualDate": "08/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-616699-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2028",
        "revisedDate": "03/2027",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-616699-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 616699 monitored by MoSPI. Implemented by East Central Railway [ECR] in Multi-States (Bihar, Jharkhand). Sanctioned budget of \u20b912,333.57 Cr, current revised cost \u20b912,333.57 Cr with \u20b91,152.79 Cr spent to date (9.3% financial). Physical completion stands at 3.0%. Primary risk driver: Grand Chord Track Tripling & Automatic Signaling Blocks. Prescriptive action: Prioritize bridge span fabrications over Sone and Damodar rivers.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9270.02 Cr with physical progress moving from 18.0% to 3.0% (+-15.0%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "18.0%",
          "current": "3.0%",
          "delta": "+-15.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9882.77 Cr",
          "current": "\u20b91152.79 Cr",
          "delta": "+\u20b9270.02 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2028",
          "current": "03/2027",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 616699 (East Central Railway [ECR]).",
        "Approved date: 08/2023, Work started: 08/2023.",
        "Key focus: Grand Chord Track Tripling & Automatic Signaling Blocks"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 88
      },
      {
        "date": "May 2026",
        "score": 87
      },
      {
        "date": "June 2026",
        "score": 87
      },
      {
        "date": "July 2026 (Live)",
        "score": 33
      },
      {
        "date": "August 2026 (P)",
        "score": 34,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 36,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 12333.57,
        "revised": 12333.6,
        "expenditure": 816.82,
        "forecast": 12950.28
      },
      {
        "period": "May 2026",
        "sanctioned": 12333.57,
        "revised": 12333.6,
        "expenditure": 882.77,
        "forecast": 12950.28
      },
      {
        "period": "June 2026",
        "sanctioned": 12333.57,
        "revised": 12333.6,
        "expenditure": 882.77,
        "forecast": 13073.62
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 12333.57,
        "revised": 12333.57,
        "expenditure": 1152.79,
        "forecast": 12333.57
      }
    ],
    "startDate": "08/2023",
    "recommendedActions": [
      "Prioritize bridge span fabrications over Sone and Damodar rivers."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "618412",
    "code": "PAIMANA-618412",
    "name": "Zojila Tunnel and Connecting Road on NH-1 [Sonamarg-Kargil]",
    "sector": "Roads & Highways",
    "ministry": "MoRTH",
    "state": "Andhra Pradesh",
    "stage": "Under Construction",
    "implementingAgency": "National Highways and Infrastructure Development Corporation [NHIDCL]",
    "sanctionedCostCr": 6808.69,
    "revisedCostCr": 6808.69,
    "expenditureCr": 3574.5,
    "forecastCostCr": 6808.69,
    "originalDeadline": "09/2026",
    "predictedCompletionDate": "02/2028",
    "expectedProgress": 89.2,
    "currentPhysicalProgress": 68.8,
    "progressGap": 20.4,
    "financialProgress": 52.5,
    "healthScore": 68,
    "riskLevel": "CRITICAL",
    "riskTrend": 2.8,
    "costRiskScore": 30,
    "timeRiskScore": 72,
    "executionRiskScore": 66,
    "predictedDelayMonths": 17,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Sub-zero Winter Tunnel Excavation & Avalanche Gallery Construction",
    "secondaryRiskDriver": "Nodal Agency: National Highways and Infrastructure Development Corporation [NHIDCL]",
    "priorityScore": 54.0,
    "impactScore": 84,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-618412-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "01/2018",
        "actualDate": "01/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618412-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "10/2020",
        "actualDate": "10/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618412-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2026",
        "revisedDate": "02/2028",
        "status": "DELAYED",
        "delayDays": 510,
        "criticalPath": true
      },
      {
        "id": "m-618412-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "02/2028",
        "status": "DELAYED",
        "delayDays": 510
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 618412 monitored by MoSPI. Implemented by National Highways and Infrastructure Development Corporation [NHIDCL] in Andhra Pradesh. Sanctioned budget of \u20b96,808.69 Cr, current revised cost \u20b96,808.69 Cr with \u20b93,574.50 Cr spent to date (52.5% financial). Physical completion stands at 68.8%. Primary risk driver: Sub-zero Winter Tunnel Excavation & Avalanche Gallery Construction. Prescriptive action: Deploy heating equipment inside shafts to continue tunneling throughout winter.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b925.43 Cr with physical progress moving from 68.8% to 68.8% (+0.0%). Revised completion target: 02/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "68.8%",
          "current": "68.8%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b93549.07 Cr",
          "current": "\u20b93574.50 Cr",
          "delta": "+\u20b925.43 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "02/2028",
          "current": "02/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 618412 (National Highways and Infrastructure Development Corporation [NHIDCL]).",
        "Approved date: 01/2018, Work started: 10/2020.",
        "Key focus: Sub-zero Winter Tunnel Excavation & Avalanche Gallery Construction"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 40
      },
      {
        "date": "May 2026",
        "score": 38
      },
      {
        "date": "June 2026",
        "score": 35
      },
      {
        "date": "July 2026 (Live)",
        "score": 32
      },
      {
        "date": "August 2026 (P)",
        "score": 33,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 35,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 6808.69,
        "revised": 6808.69,
        "expenditure": 3214.27,
        "forecast": 7149.12
      },
      {
        "period": "May 2026",
        "sanctioned": 6808.69,
        "revised": 6808.69,
        "expenditure": 3215.86,
        "forecast": 7149.12
      },
      {
        "period": "June 2026",
        "sanctioned": 6808.69,
        "revised": 6808.69,
        "expenditure": 3549.07,
        "forecast": 7217.21
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 6808.69,
        "revised": 6808.69,
        "expenditure": 3574.5,
        "forecast": 6808.69
      }
    ],
    "startDate": "10/2020",
    "recommendedActions": [
      "Deploy heating equipment inside shafts to continue tunneling throughout winter."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "618475",
    "code": "PAIMANA-618475",
    "name": "Bangalore-Chennai Expressway Phase-II (Baireddypalle to Bangarupalem)",
    "sector": "Roads & Highways",
    "ministry": "MoRTH",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "National Highways Authority of India [NHAI]",
    "sanctionedCostCr": 2548.04,
    "revisedCostCr": 2548.04,
    "expenditureCr": 1332.41,
    "forecastCostCr": 2548.04,
    "originalDeadline": "06/2025",
    "predictedCompletionDate": "10/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 94.24,
    "progressGap": 5.8,
    "financialProgress": 52.3,
    "healthScore": 76,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.3,
    "costRiskScore": 30,
    "timeRiskScore": 70,
    "executionRiskScore": 37,
    "predictedDelayMonths": 16,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "PQC Rigid Pavement & Forest Wildlife Overpass Bridges",
    "secondaryRiskDriver": "Nodal Agency: National Highways Authority of India [NHAI]",
    "priorityScore": 47.4,
    "impactScore": 75,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-618475-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2021",
        "actualDate": "02/2021",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618475-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "06/2023",
        "actualDate": "06/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618475-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2025",
        "revisedDate": "10/2026",
        "status": "DELAYED",
        "delayDays": 480,
        "criticalPath": true
      },
      {
        "id": "m-618475-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "10/2026",
        "status": "ON_TRACK",
        "delayDays": 480
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 618475 monitored by MoSPI. Implemented by National Highways Authority of India [NHAI] in Andhra Pradesh. Sanctioned budget of \u20b92,548.04 Cr, current revised cost \u20b92,548.04 Cr with \u20b91,332.41 Cr spent to date (52.3% financial). Physical completion stands at 94.2%. Primary risk driver: PQC Rigid Pavement & Forest Wildlife Overpass Bridges. Prescriptive action: Complete smart highway toll plazas and optical fiber ATMS installations.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b94.77 Cr with physical progress moving from 93.3% to 94.2% (+0.9%). Revised completion target: 10/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "93.3%",
          "current": "94.2%",
          "delta": "+0.9%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b91327.64 Cr",
          "current": "\u20b91332.41 Cr",
          "delta": "+\u20b94.77 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "10/2026",
          "current": "10/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 618475 (National Highways Authority of India [NHAI]).",
        "Approved date: 02/2021, Work started: 06/2023.",
        "Key focus: PQC Rigid Pavement & Forest Wildlife Overpass Bridges"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 23
      },
      {
        "date": "May 2026",
        "score": 21
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 24
      },
      {
        "date": "August 2026 (P)",
        "score": 25,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 26,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 2548.04,
        "revised": 2548.04,
        "expenditure": 1226.85,
        "forecast": 2675.44
      },
      {
        "period": "May 2026",
        "sanctioned": 2548.04,
        "revised": 2548.04,
        "expenditure": 1227.08,
        "forecast": 2675.44
      },
      {
        "period": "June 2026",
        "sanctioned": 2548.04,
        "revised": 2548.04,
        "expenditure": 1327.64,
        "forecast": 2700.92
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 2548.04,
        "revised": 2548.04,
        "expenditure": 1332.41,
        "forecast": 2548.04
      }
    ],
    "startDate": "06/2023",
    "recommendedActions": [
      "Complete smart highway toll plazas and optical fiber ATMS installations."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "618373",
    "code": "PAIMANA-618373",
    "name": "Construction of 4-Lane Bridge over River Brahmaputra (Dhubri-Phulbari)",
    "sector": "Roads & Highways",
    "ministry": "MoRTH",
    "state": "Assam",
    "stage": "Under Construction",
    "implementingAgency": "National Highways and Infrastructure Development Corporation [NHIDCL]",
    "sanctionedCostCr": 4997.04,
    "revisedCostCr": 4997.04,
    "expenditureCr": 3081.08,
    "forecastCostCr": 4997.04,
    "originalDeadline": "09/2028",
    "predictedCompletionDate": "09/2028",
    "expectedProgress": 77.1,
    "currentPhysicalProgress": 77.14,
    "progressGap": 0.0,
    "financialProgress": 61.7,
    "healthScore": 96,
    "riskLevel": "STABLE",
    "riskTrend": 2.8,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Deep Well Caisson Foundations in Braided Brahmaputra Channels",
    "secondaryRiskDriver": "Nodal Agency: National Highways and Infrastructure Development Corporation [NHIDCL]",
    "priorityScore": 29.0,
    "impactScore": 81,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-618373-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "05/2019",
        "actualDate": "05/2019",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618373-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "12/2020",
        "actualDate": "12/2020",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618373-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2028",
        "revisedDate": "09/2028",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-618373-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "09/2028",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 618373 monitored by MoSPI. Implemented by National Highways and Infrastructure Development Corporation [NHIDCL] in Assam. Sanctioned budget of \u20b94,997.04 Cr, current revised cost \u20b94,997.04 Cr with \u20b93,081.08 Cr spent to date (61.7% financial). Physical completion stands at 77.1%. Primary risk driver: Deep Well Caisson Foundations in Braided Brahmaputra Channels. Prescriptive action: Maintain barge logistics for pier cap erection during high water flood levels.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b947.49 Cr with physical progress moving from 77.1% to 77.1% (+0.0%). Revised completion target: 09/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "77.1%",
          "current": "77.1%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b93033.59 Cr",
          "current": "\u20b93081.08 Cr",
          "delta": "+\u20b947.49 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "09/2028",
          "current": "09/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 618373 (National Highways and Infrastructure Development Corporation [NHIDCL]).",
        "Approved date: 05/2019, Work started: 12/2020.",
        "Key focus: Deep Well Caisson Foundations in Braided Brahmaputra Channels"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 48
      },
      {
        "date": "May 2026",
        "score": 47
      },
      {
        "date": "June 2026",
        "score": 46
      },
      {
        "date": "July 2026 (Live)",
        "score": 4
      },
      {
        "date": "August 2026 (P)",
        "score": 4,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 4,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 4997.04,
        "revised": 4997.04,
        "expenditure": 2808.4,
        "forecast": 5246.89
      },
      {
        "period": "May 2026",
        "sanctioned": 4997.04,
        "revised": 4997.04,
        "expenditure": 2837.17,
        "forecast": 5246.89
      },
      {
        "period": "June 2026",
        "sanctioned": 4997.04,
        "revised": 4997.04,
        "expenditure": 3033.59,
        "forecast": 5296.86
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 4997.04,
        "revised": 4997.04,
        "expenditure": 3081.08,
        "forecast": 4997.04
      }
    ],
    "startDate": "12/2020",
    "recommendedActions": [
      "Maintain barge logistics for pier cap erection during high water flood levels."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "618738",
    "code": "PAIMANA-618738",
    "name": "Patna Ring Road Ganga Bridge & Approaches (Sherpur to Dighwara)",
    "sector": "Roads & Highways",
    "ministry": "MoRTH",
    "state": "Bihar",
    "stage": "Under Construction",
    "implementingAgency": "National Highways Authority of India [NHAI]",
    "sanctionedCostCr": 6291.69,
    "revisedCostCr": 3351.62,
    "expenditureCr": 734.19,
    "forecastCostCr": 3351.62,
    "originalDeadline": "09/2027",
    "predictedCompletionDate": "03/2029",
    "expectedProgress": 43.6,
    "currentPhysicalProgress": 22.05,
    "progressGap": 21.6,
    "financialProgress": 21.9,
    "healthScore": 48,
    "riskLevel": "CRITICAL",
    "riskTrend": 1.4,
    "costRiskScore": 30,
    "timeRiskScore": 75,
    "executionRiskScore": 68,
    "predictedDelayMonths": 18,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Extra-dosed Cable Stayed Spans over River Ganga & Approach Embankments",
    "secondaryRiskDriver": "Nodal Agency: National Highways Authority of India [NHAI]",
    "priorityScore": 55.6,
    "impactScore": 78,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-618738-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "09/2022",
        "actualDate": "09/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618738-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "09/2023",
        "actualDate": "09/2023",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-618738-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "09/2027",
        "revisedDate": "03/2029",
        "status": "DELAYED",
        "delayDays": 540,
        "criticalPath": true
      },
      {
        "id": "m-618738-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2029",
        "status": "DELAYED",
        "delayDays": 540
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 618738 monitored by MoSPI. Implemented by National Highways Authority of India [NHAI] in Bihar. Sanctioned budget of \u20b96,291.69 Cr, current revised cost \u20b93,351.62 Cr with \u20b9734.19 Cr spent to date (21.9% financial). Physical completion stands at 22.1%. Primary risk driver: Extra-dosed Cable Stayed Spans over River Ganga & Approach Embankments. Prescriptive action: Accelerate pylon pile cap casting before monsoon discharge surge.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.26 Cr with physical progress moving from 21.2% to 22.1% (+0.8%). Revised completion target: 03/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "21.2%",
          "current": "22.1%",
          "delta": "+0.8%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b9733.93 Cr",
          "current": "\u20b9734.19 Cr",
          "delta": "+\u20b90.26 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2029",
          "current": "03/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 618738 (National Highways Authority of India [NHAI]).",
        "Approved date: 09/2022, Work started: 09/2023.",
        "Key focus: Extra-dosed Cable Stayed Spans over River Ganga & Approach Embankments"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 72
      },
      {
        "date": "May 2026",
        "score": 70
      },
      {
        "date": "June 2026",
        "score": 67
      },
      {
        "date": "July 2026 (Live)",
        "score": 52
      },
      {
        "date": "August 2026 (P)",
        "score": 54,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 56,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 6291.69,
        "revised": 3351.62,
        "expenditure": 581.87,
        "forecast": 3519.2
      },
      {
        "period": "May 2026",
        "sanctioned": 6291.69,
        "revised": 3351.62,
        "expenditure": 660.36,
        "forecast": 3519.2
      },
      {
        "period": "June 2026",
        "sanctioned": 6291.69,
        "revised": 3351.62,
        "expenditure": 733.93,
        "forecast": 3552.72
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 6291.69,
        "revised": 3351.62,
        "expenditure": 734.19,
        "forecast": 3351.62
      }
    ],
    "startDate": "09/2023",
    "recommendedActions": [
      "Accelerate pylon pile cap casting before monsoon discharge surge."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "706775",
    "code": "PAIMANA-706775",
    "name": "BharatNet Telecom Infrastructure Project",
    "sector": "Telecommunications",
    "ministry": "MoC&IT",
    "state": "PAN India",
    "stage": "Near Completion",
    "implementingAgency": "Department of Telecommunications [DoT]",
    "sanctionedCostCr": 61109.0,
    "revisedCostCr": 12709.0,
    "expenditureCr": 48809.69,
    "forecastCostCr": 12709.0,
    "originalDeadline": "08/2023",
    "predictedCompletionDate": "03/2019",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 99.98,
    "progressGap": 0.0,
    "financialProgress": 384.1,
    "healthScore": 96,
    "riskLevel": "STABLE",
    "riskTrend": 17.6,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Gram Panchayat Fiber Optic Last-Mile Connectivity & GP Equipment Upgrades",
    "secondaryRiskDriver": "Nodal Agency: Department of Telecommunications [DoT]",
    "priorityScore": 29.0,
    "impactScore": 90,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-706775-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2017",
        "actualDate": "07/2017",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-706775-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "10/2011",
        "actualDate": "10/2011",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-706775-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "08/2023",
        "revisedDate": "03/2019",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-706775-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2019",
        "status": "ON_TRACK",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 706775 monitored by MoSPI. Implemented by Department of Telecommunications [DoT] in PAN India. Sanctioned budget of \u20b961,109.00 Cr, current revised cost \u20b912,709.00 Cr with \u20b948,809.69 Cr spent to date (384.1% financial). Physical completion stands at 100.0%. Primary risk driver: Gram Panchayat Fiber Optic Last-Mile Connectivity & GP Equipment Upgrades. Prescriptive action: Expand BharatNet Amended Phase across rural block aggregation hubs.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 100.0% to 100.0% (+0.0%). Revised completion target: 03/2019.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "100.0%",
          "current": "100.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b948809.69 Cr",
          "current": "\u20b948809.69 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2019",
          "delta": "Extended",
          "type": "increase",
          "impact": "adverse",
          "isSignificant": true
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 706775 (Department of Telecommunications [DoT]).",
        "Approved date: 07/2017, Work started: 10/2011.",
        "Key focus: Gram Panchayat Fiber Optic Last-Mile Connectivity & GP Equipment Upgrades"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 42
      },
      {
        "date": "May 2026",
        "score": 42
      },
      {
        "date": "June 2026",
        "score": 30
      },
      {
        "date": "July 2026 (Live)",
        "score": 4
      },
      {
        "date": "August 2026 (P)",
        "score": 4,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 4,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 61109.0,
        "revised": 188000.0,
        "expenditure": 46431.54,
        "forecast": 197400.0
      },
      {
        "period": "May 2026",
        "sanctioned": 61109.0,
        "revised": 188000.0,
        "expenditure": 46431.54,
        "forecast": 197400.0
      },
      {
        "period": "June 2026",
        "sanctioned": 61109.0,
        "revised": 188000.0,
        "expenditure": 48809.69,
        "forecast": 199280.0
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 61109.0,
        "revised": 12709.0,
        "expenditure": 48809.69,
        "forecast": 12709.0
      }
    ],
    "startDate": "10/2011",
    "recommendedActions": [
      "Expand BharatNet Amended Phase across rural block aggregation hubs."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "400013",
    "code": "PAIMANA-400013",
    "name": "Saturation 4G Mobile Coverage in Uncovered Villages through USOF",
    "sector": "Telecommunications",
    "ministry": "MoC&IT",
    "state": "PAN India",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Department of Telecommunications [DoT]",
    "sanctionedCostCr": 26316.0,
    "revisedCostCr": 15392.84,
    "expenditureCr": 8722.82,
    "forecastCostCr": 15392.84,
    "originalDeadline": "06/2024",
    "predictedCompletionDate": "03/2027",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 87.7,
    "progressGap": 12.3,
    "financialProgress": 56.7,
    "healthScore": 65,
    "riskLevel": "CRITICAL",
    "riskTrend": -1.7,
    "costRiskScore": 30,
    "timeRiskScore": 98,
    "executionRiskScore": 50,
    "predictedDelayMonths": 33,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Solar-Powered Telecom Towers in Remote Border & Tribal Villages",
    "secondaryRiskDriver": "Nodal Agency: Department of Telecommunications [DoT]",
    "priorityScore": 61.2,
    "impactScore": 92,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-400013-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "07/2022",
        "actualDate": "07/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400013-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "07/2022",
        "actualDate": "07/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-400013-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2024",
        "revisedDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 990,
        "criticalPath": true
      },
      {
        "id": "m-400013-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2027",
        "status": "DELAYED",
        "delayDays": 990
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 400013 monitored by MoSPI. Implemented by Department of Telecommunications [DoT] in PAN India. Sanctioned budget of \u20b926,316.00 Cr, current revised cost \u20b915,392.84 Cr with \u20b98,722.82 Cr spent to date (56.7% financial). Physical completion stands at 87.7%. Primary risk driver: Solar-Powered Telecom Towers in Remote Border & Tribal Villages. Prescriptive action: Clear state forest clearances for battery backup transmission access.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9169.72 Cr with physical progress moving from 85.0% to 87.7% (+2.7%). Revised completion target: 03/2027.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "85.0%",
          "current": "87.7%",
          "delta": "+2.7%",
          "type": "increase",
          "impact": "favorable",
          "isSignificant": true
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b98553.10 Cr",
          "current": "\u20b98722.82 Cr",
          "delta": "+\u20b9169.72 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2027",
          "current": "03/2027",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 400013 (Department of Telecommunications [DoT]).",
        "Approved date: 07/2022, Work started: 07/2022.",
        "Key focus: Solar-Powered Telecom Towers in Remote Border & Tribal Villages"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 35
      },
      {
        "date": "August 2026 (P)",
        "score": 36,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 38,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 26316.0,
        "revised": 30620.0,
        "expenditure": 9791.8,
        "forecast": 32151.0
      },
      {
        "period": "May 2026",
        "sanctioned": 26316.0,
        "revised": 15392.8,
        "expenditure": 9791.8,
        "forecast": 16162.44
      },
      {
        "period": "June 2026",
        "sanctioned": 26316.0,
        "revised": 15392.8,
        "expenditure": 8553.1,
        "forecast": 16316.37
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 26316.0,
        "revised": 15392.84,
        "expenditure": 8722.82,
        "forecast": 15392.84
      }
    ],
    "startDate": "07/2022",
    "recommendedActions": [
      "Clear state forest clearances for battery backup transmission access."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701415",
    "code": "PAIMANA-701415",
    "name": "Polavaram National Irrigation Project",
    "sector": "Water Resources",
    "ministry": "MoJS",
    "state": "Andhra Pradesh",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Water Resources Department - AP",
    "sanctionedCostCr": 10151.04,
    "revisedCostCr": 55548.87,
    "expenditureCr": 27961.55,
    "forecastCostCr": 62358.54,
    "originalDeadline": "04/2022",
    "predictedCompletionDate": "03/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 86.15,
    "progressGap": 13.8,
    "financialProgress": 50.3,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": -0.0,
    "costRiskScore": 98,
    "timeRiskScore": 98,
    "executionRiskScore": 53,
    "predictedDelayMonths": 47,
    "predictedCostOverrunCr": 45397.83,
    "primaryRiskDriver": "Earth-cum-Rockfill (ECRF) Dam Main Gap-1 Vibro-Stone Columns",
    "secondaryRiskDriver": "Nodal Agency: Water Resources Department - AP",
    "priorityScore": 89.0,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701415-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "01/2009",
        "actualDate": "01/2009",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701415-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "11/2009",
        "actualDate": "11/2009",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701415-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "04/2022",
        "revisedDate": "03/2026",
        "status": "DELAYED",
        "delayDays": 1410,
        "criticalPath": true
      },
      {
        "id": "m-701415-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2026",
        "status": "DELAYED",
        "delayDays": 1410
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701415 monitored by MoSPI. Implemented by Water Resources Department - AP in Andhra Pradesh. Sanctioned budget of \u20b910,151.04 Cr, current revised cost \u20b955,548.87 Cr with \u20b927,961.55 Cr spent to date (50.3% financial). Physical completion stands at 86.2%. Primary risk driver: Earth-cum-Rockfill (ECRF) Dam Main Gap-1 Vibro-Stone Columns. Prescriptive action: Complete diaphragm wall deep grouting inspection with Central Water Commission.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b9235.40 Cr with physical progress moving from 86.1% to 86.2% (+0.0%). Revised completion target: 03/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "86.1%",
          "current": "86.2%",
          "delta": "+0.0%",
          "type": "increase",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b927726.15 Cr",
          "current": "\u20b927961.55 Cr",
          "delta": "+\u20b9235.40 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2026",
          "current": "03/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701415 (Water Resources Department - AP).",
        "Approved date: 01/2009, Work started: 11/2009.",
        "Key focus: Earth-cum-Rockfill (ECRF) Dam Main Gap-1 Vibro-Stone Columns"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 10151.04,
        "revised": 55548.9,
        "expenditure": 26674.77,
        "forecast": 58326.35
      },
      {
        "period": "May 2026",
        "sanctioned": 10151.04,
        "revised": 55548.9,
        "expenditure": 27061.89,
        "forecast": 58326.35
      },
      {
        "period": "June 2026",
        "sanctioned": 10151.04,
        "revised": 55548.9,
        "expenditure": 27726.15,
        "forecast": 58881.83
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 10151.04,
        "revised": 55548.87,
        "expenditure": 27961.55,
        "forecast": 62358.54
      }
    ],
    "startDate": "11/2009",
    "recommendedActions": [
      "Complete diaphragm wall deep grouting inspection with Central Water Commission."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701372",
    "code": "PAIMANA-701372",
    "name": "Sardar Sarovar Project",
    "sector": "Water Resources",
    "ministry": "MoJS",
    "state": "Gujarat",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Sardar Sarovar Narmada Nigam Limited",
    "sanctionedCostCr": 20718.17,
    "revisedCostCr": 33412.5,
    "expenditureCr": 31969.4,
    "forecastCostCr": 35316.65,
    "originalDeadline": "12/2019",
    "predictedCompletionDate": "03/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 93.7,
    "progressGap": 6.3,
    "financialProgress": 95.7,
    "healthScore": 34,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.0,
    "costRiskScore": 73,
    "timeRiskScore": 98,
    "executionRiskScore": 38,
    "predictedDelayMonths": 75,
    "predictedCostOverrunCr": 12694.330000000002,
    "primaryRiskDriver": "Distributary Canal Lining & Sub-surface Micro-Irrigation Network",
    "secondaryRiskDriver": "Nodal Agency: Sardar Sarovar Narmada Nigam Limited",
    "priorityScore": 76.0,
    "impactScore": 98,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701372-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "04/1996",
        "actualDate": "04/1996",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701372-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "04/1996",
        "actualDate": "04/1996",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701372-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "12/2019",
        "revisedDate": "03/2026",
        "status": "DELAYED",
        "delayDays": 2250,
        "criticalPath": true
      },
      {
        "id": "m-701372-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2026",
        "status": "ON_TRACK",
        "delayDays": 2250
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701372 monitored by MoSPI. Implemented by Sardar Sarovar Narmada Nigam Limited in Gujarat. Sanctioned budget of \u20b920,718.17 Cr, current revised cost \u20b933,412.50 Cr with \u20b931,969.40 Cr spent to date (95.7% financial). Physical completion stands at 93.7%. Primary risk driver: Distributary Canal Lining & Sub-surface Micro-Irrigation Network. Prescriptive action: Finish minor sub-branch canal solarization and tail-end canal links.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b926.25 Cr with physical progress moving from 93.7% to 93.7% (+0.0%). Revised completion target: 03/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "93.7%",
          "current": "93.7%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b931943.15 Cr",
          "current": "\u20b931969.40 Cr",
          "delta": "+\u20b926.25 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2026",
          "current": "03/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701372 (Sardar Sarovar Narmada Nigam Limited).",
        "Approved date: 04/1996, Work started: 04/1996.",
        "Key focus: Distributary Canal Lining & Sub-surface Micro-Irrigation Network"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 66
      },
      {
        "date": "August 2026 (P)",
        "score": 69,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 71,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 20718.17,
        "revised": 33412.5,
        "expenditure": 31860.86,
        "forecast": 35083.12
      },
      {
        "period": "May 2026",
        "sanctioned": 20718.17,
        "revised": 33412.5,
        "expenditure": 31943.15,
        "forecast": 35083.12
      },
      {
        "period": "June 2026",
        "sanctioned": 20718.17,
        "revised": 33412.5,
        "expenditure": 31943.15,
        "forecast": 35417.25
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 20718.17,
        "revised": 33412.5,
        "expenditure": 31969.4,
        "forecast": 35316.65
      }
    ],
    "startDate": "04/1996",
    "recommendedActions": [
      "Finish minor sub-branch canal solarization and tail-end canal links."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701386",
    "code": "PAIMANA-701386",
    "name": "Gosikhurd National Irrigation Project",
    "sector": "Water Resources",
    "ministry": "MoJS",
    "state": "Maharashtra",
    "stage": "Under Construction",
    "implementingAgency": "Vidarbha Irrigation Development Corporation",
    "sanctionedCostCr": 7196.47,
    "revisedCostCr": 12770.1,
    "expenditureCr": 14439.46,
    "forecastCostCr": 13606.14,
    "originalDeadline": "12/2019",
    "predictedCompletionDate": "06/2028",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 72.65,
    "progressGap": 27.3,
    "financialProgress": 113.1,
    "healthScore": 25,
    "riskLevel": "CRITICAL",
    "riskTrend": 0.0,
    "costRiskScore": 84,
    "timeRiskScore": 98,
    "executionRiskScore": 80,
    "predictedDelayMonths": 102,
    "predictedCostOverrunCr": 5573.63,
    "primaryRiskDriver": "Right Bank Main Canal Concrete Lining & Lift Irrigation Schemes",
    "secondaryRiskDriver": "Nodal Agency: Vidarbha Irrigation Development Corporation",
    "priorityScore": 88.8,
    "impactScore": 90,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701386-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "04/2008",
        "actualDate": "04/2008",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701386-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "04/2008",
        "actualDate": "04/2008",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701386-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "12/2019",
        "revisedDate": "06/2028",
        "status": "DELAYED",
        "delayDays": 3060,
        "criticalPath": true
      },
      {
        "id": "m-701386-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2028",
        "status": "DELAYED",
        "delayDays": 3060
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701386 monitored by MoSPI. Implemented by Vidarbha Irrigation Development Corporation in Maharashtra. Sanctioned budget of \u20b97,196.47 Cr, current revised cost \u20b912,770.10 Cr with \u20b914,439.46 Cr spent to date (113.1% financial). Physical completion stands at 72.7%. Primary risk driver: Right Bank Main Canal Concrete Lining & Lift Irrigation Schemes. Prescriptive action: Resolve village land acquisition arbitration in Bhandara district.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b953.73 Cr with physical progress moving from 72.7% to 72.7% (+0.0%). Revised completion target: 06/2028.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "72.7%",
          "current": "72.7%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b914385.73 Cr",
          "current": "\u20b914439.46 Cr",
          "delta": "+\u20b953.73 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2028",
          "current": "06/2028",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701386 (Vidarbha Irrigation Development Corporation).",
        "Approved date: 04/2008, Work started: 04/2008.",
        "Key focus: Right Bank Main Canal Concrete Lining & Lift Irrigation Schemes"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 75
      },
      {
        "date": "August 2026 (P)",
        "score": 78,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 81,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 7196.47,
        "revised": 12770.1,
        "expenditure": 14339.36,
        "forecast": 13408.61
      },
      {
        "period": "May 2026",
        "sanctioned": 7196.47,
        "revised": 12770.1,
        "expenditure": 14374.0,
        "forecast": 13408.61
      },
      {
        "period": "June 2026",
        "sanctioned": 7196.47,
        "revised": 12770.1,
        "expenditure": 14385.73,
        "forecast": 13536.31
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 7196.47,
        "revised": 12770.1,
        "expenditure": 14439.46,
        "forecast": 13606.14
      }
    ],
    "startDate": "04/2008",
    "recommendedActions": [
      "Resolve village land acquisition arbitration in Bhandara district."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701530",
    "code": "PAIMANA-701530",
    "name": "Ken-Betwa River Link Project",
    "sector": "Water Resources",
    "ministry": "MoJS",
    "state": "Multi-States (Madhya Pradesh, Uttar Pradesh)",
    "stage": "Pre-Construction",
    "implementingAgency": "National Water Development Agency",
    "sanctionedCostCr": 21030.0,
    "revisedCostCr": 21030.0,
    "expenditureCr": 8530.86,
    "forecastCostCr": 21030.0,
    "originalDeadline": "03/2029",
    "predictedCompletionDate": "03/2029",
    "expectedProgress": 0.0,
    "currentPhysicalProgress": 0.0,
    "progressGap": 0.0,
    "financialProgress": 40.6,
    "healthScore": 66,
    "riskLevel": "WATCH",
    "riskTrend": 0.0,
    "costRiskScore": 30,
    "timeRiskScore": 30,
    "executionRiskScore": 25,
    "predictedDelayMonths": 0.0,
    "predictedCostOverrunCr": 0.0,
    "primaryRiskDriver": "Daudhan Dam Construction & Panna National Park Buffer Environmental Compliance",
    "secondaryRiskDriver": "Nodal Agency: National Water Development Agency",
    "priorityScore": 29.0,
    "impactScore": 95,
    "escalationStatus": "RESOLVED",
    "keyMilestones": [
      {
        "id": "m-701530-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "03/2022",
        "actualDate": "03/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701530-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "03/2022",
        "actualDate": "03/2022",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701530-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "03/2029",
        "revisedDate": "03/2029",
        "status": "ON_TRACK",
        "delayDays": 0,
        "criticalPath": true
      },
      {
        "id": "m-701530-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "03/2029",
        "status": "DELAYED",
        "delayDays": 0
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701530 monitored by MoSPI. Implemented by National Water Development Agency in Multi-States (Madhya Pradesh, Uttar Pradesh). Sanctioned budget of \u20b921,030.00 Cr, current revised cost \u20b921,030.00 Cr with \u20b98,530.86 Cr spent to date (40.6% financial). Physical completion stands at 0.0%. Primary risk driver: Daudhan Dam Construction & Panna National Park Buffer Environmental Compliance. Prescriptive action: Execute afforestation compensation in degraded forest land tranches.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b90.00 Cr with physical progress moving from 0.0% to 0.0% (+0.0%). Revised completion target: 03/2029.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "0.0%",
          "current": "0.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b98530.86 Cr",
          "current": "\u20b98530.86 Cr",
          "delta": "+\u20b90.00 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "03/2029",
          "current": "03/2029",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701530 (National Water Development Agency).",
        "Approved date: 03/2022, Work started: 03/2022.",
        "Key focus: Daudhan Dam Construction & Panna National Park Buffer Environmental Compliance"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 95
      },
      {
        "date": "May 2026",
        "score": 95
      },
      {
        "date": "June 2026",
        "score": 95
      },
      {
        "date": "July 2026 (Live)",
        "score": 34
      },
      {
        "date": "August 2026 (P)",
        "score": 35,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 37,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 21030.0,
        "revised": 21030.0,
        "expenditure": 8530.86,
        "forecast": 22081.5
      },
      {
        "period": "May 2026",
        "sanctioned": 21030.0,
        "revised": 21030.0,
        "expenditure": 8530.86,
        "forecast": 22081.5
      },
      {
        "period": "June 2026",
        "sanctioned": 21030.0,
        "revised": 21030.0,
        "expenditure": 8530.86,
        "forecast": 22291.8
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 21030.0,
        "revised": 21030.0,
        "expenditure": 8530.86,
        "forecast": 21030.0
      }
    ],
    "startDate": "03/2022",
    "recommendedActions": [
      "Execute afforestation compensation in degraded forest land tranches."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  },
  {
    "id": "701410",
    "code": "PAIMANA-701410",
    "name": "Relining of Rajasthan Feeder & Sirhind Feeder Canal",
    "sector": "Water Resources",
    "ministry": "MoJS",
    "state": "Punjab",
    "stage": "Testing & Commissioning",
    "implementingAgency": "Department of Water Resources - Punjab",
    "sanctionedCostCr": 1441.26,
    "revisedCostCr": 2462.16,
    "expenditureCr": 2364.12,
    "forecastCostCr": 2615.29,
    "originalDeadline": "06/2021",
    "predictedCompletionDate": "06/2026",
    "expectedProgress": 100.0,
    "currentPhysicalProgress": 95.0,
    "progressGap": 5.0,
    "financialProgress": 96.0,
    "healthScore": 30,
    "riskLevel": "CRITICAL",
    "riskTrend": 5.0,
    "costRiskScore": 80,
    "timeRiskScore": 98,
    "executionRiskScore": 35,
    "predictedDelayMonths": 60,
    "predictedCostOverrunCr": 1020.8999999999999,
    "primaryRiskDriver": "Canal Closure Window Concrete Bed Lining & Seepage Control",
    "secondaryRiskDriver": "Nodal Agency: Department of Water Resources - Punjab",
    "priorityScore": 78.2,
    "impactScore": 75,
    "escalationStatus": "UNRESOLVED",
    "keyMilestones": [
      {
        "id": "m-701410-1",
        "title": "Project Sanction & Inter-agency Feasibility Approval",
        "targetDate": "02/2016",
        "actualDate": "02/2016",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701410-2",
        "title": "Groundbreaking, Land Handover & Site Mobilization",
        "targetDate": "04/2018",
        "actualDate": "04/2018",
        "status": "COMPLETED",
        "delayDays": 0
      },
      {
        "id": "m-701410-3",
        "title": "Civil Structural Erection & Major Spans Completion",
        "targetDate": "06/2021",
        "revisedDate": "06/2026",
        "status": "DELAYED",
        "delayDays": 1800,
        "criticalPath": true
      },
      {
        "id": "m-701410-4",
        "title": "Final Testing, Safety Sign-off & Commercial Commissioning",
        "targetDate": "06/2026",
        "status": "ON_TRACK",
        "delayDays": 1800
      }
    ],
    "aiSummary": "Official PAIMANA Project ID 701410 monitored by MoSPI. Implemented by Department of Water Resources - Punjab in Punjab. Sanctioned budget of \u20b91,441.26 Cr, current revised cost \u20b92,462.16 Cr with \u20b92,364.12 Cr spent to date (96.0% financial). Physical completion stands at 95.0%. Primary risk driver: Canal Closure Window Concrete Bed Lining & Seepage Control. Prescriptive action: Complete remaining bed relining before kharif season canal release.",
    "changeIntelligence": {
      "previousCycleDate": "June 2026 Flash Report",
      "currentCycleDate": "July 2026 Flash Report",
      "summary": "In July 2026, cumulative expenditure advanced by +\u20b922.07 Cr with physical progress moving from 95.0% to 95.0% (+0.0%). Revised completion target: 06/2026.",
      "metrics": [
        {
          "metric": "Physical Progress Delta",
          "previous": "95.0%",
          "current": "95.0%",
          "delta": "+0.0%",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        },
        {
          "metric": "Monthly Expenditure Drawdown",
          "previous": "\u20b92342.05 Cr",
          "current": "\u20b92364.12 Cr",
          "delta": "+\u20b922.07 Cr",
          "type": "increase",
          "impact": "neutral"
        },
        {
          "metric": "Target Date of Completion",
          "previous": "06/2026",
          "current": "06/2026",
          "delta": "Unchanged",
          "type": "neutral",
          "impact": "neutral",
          "isSignificant": false
        }
      ],
      "highlightNotes": [
        "Official PAIMANA Record ID: 701410 (Department of Water Resources - Punjab).",
        "Approved date: 02/2016, Work started: 04/2018.",
        "Key focus: Canal Closure Window Concrete Bed Lining & Seepage Control"
      ]
    },
    "riskTrajectory": [
      {
        "date": "April 2026",
        "score": 20
      },
      {
        "date": "May 2026",
        "score": 20
      },
      {
        "date": "June 2026",
        "score": 20
      },
      {
        "date": "July 2026 (Live)",
        "score": 70
      },
      {
        "date": "August 2026 (P)",
        "score": 73,
        "forecast": true
      },
      {
        "date": "September 2026 (P)",
        "score": 76,
        "forecast": true
      }
    ],
    "costTrend": [
      {
        "period": "April 2026",
        "sanctioned": 1441.26,
        "revised": 2462.16,
        "expenditure": 2222.34,
        "forecast": 2585.27
      },
      {
        "period": "May 2026",
        "sanctioned": 1441.26,
        "revised": 2462.16,
        "expenditure": 2337.42,
        "forecast": 2585.27
      },
      {
        "period": "June 2026",
        "sanctioned": 1441.26,
        "revised": 2462.16,
        "expenditure": 2342.05,
        "forecast": 2609.89
      },
      {
        "period": "July 2026 (Live)",
        "sanctioned": 1441.26,
        "revised": 2462.16,
        "expenditure": 2364.12,
        "forecast": 2615.29
      }
    ],
    "startDate": "04/2018",
    "recommendedActions": [
      "Complete remaining bed relining before kharif season canal release."
    ],
    "isUserCreated": false,
    "calculationMethodology": "Official MoSPI PAIMANA Flash Report (April-July 2026)"
  }
];
