import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../pages/auth/LoginPage';
import { ProfileSetupPage } from '../pages/auth/ProfileSetupPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ProjectsPage } from '../pages/projects/ProjectsPage';
import { ProjectDetailPage } from '../pages/projects/ProjectDetailPage';
import { PredictionsPage } from '../pages/predictions/PredictionsPage';
import { ExplainabilityPage } from '../pages/explainability/ExplainabilityPage';
import { AlertsPage } from '../pages/alerts/AlertsPage';
import { BenchmarkingPage } from '../pages/benchmarking/BenchmarkingPage';
import { AssistantPage } from '../pages/assistant/AssistantPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { NationalRiskMapPage } from '../pages/map/NationalRiskMapPage';
import { CostExpenditurePage } from '../pages/cost/CostExpenditurePage';
import { RecommendedActionsPage } from '../pages/actions/RecommendedActionsPage';
import { FieldVerificationPage } from '../pages/verification/FieldVerificationPage';
import { DataValidationPage } from '../pages/validation/DataValidationPage';
import { RiskHistoryPage } from '../pages/history/RiskHistoryPage';
import { UsersAccessPage } from '../pages/admin/UsersAccessPage';
import { AuditLogsPage } from '../pages/admin/AuditLogsPage';
import { SystemHealthPage } from '../pages/admin/SystemHealthPage';
import { DataIngestionPage } from '../pages/admin/DataIngestionPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';

export const AppRoutes: React.FC = () => {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Profile Setup (Single Page) */}
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Application Layout & Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<NationalRiskMapPage />} />
        <Route path="/national-risk-map" element={<NationalRiskMapPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/alerts" element={<AlertsPage />} />

        {/* Role & Permission-Guarded Operational Routes */}
        <Route
          path="/cost-expenditure"
          element={
            <ProtectedRoute requiredPermission="view:cost_expenditure">
              <CostExpenditurePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommended-actions"
          element={
            <ProtectedRoute requiredPermission="view:recommended_actions">
              <RecommendedActionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/field-verification"
          element={
            <ProtectedRoute requiredPermission="view:field_verification">
              <FieldVerificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-validation"
          element={
            <ProtectedRoute requiredPermission="view:data_validation">
              <DataValidationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/risk-history"
          element={
            <ProtectedRoute requiredPermission="view:risk_history">
              <RiskHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/predictions"
          element={
            <ProtectedRoute requiredPermission="view:predictions">
              <PredictionsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/explainability" element={<ExplainabilityPage />} />
        <Route
          path="/benchmarking"
          element={
            <ProtectedRoute requiredPermission="view:benchmarking">
              <BenchmarkingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/data" element={<Navigate to="/dashboard" replace />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute requiredPermission="view:settings">
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Administrator & Governance Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Administrator']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['Administrator']} requiredPermission="manage:users">
              <UsersAccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-ingestion"
          element={
            <ProtectedRoute allowedRoles={['Administrator']} requiredPermission="ingest:data">
              <DataIngestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/system-health"
          element={
            <ProtectedRoute allowedRoles={['Administrator']} requiredPermission="view:system_health">
              <SystemHealthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute allowedRoles={['Administrator', 'Auditor / Viewer']} requiredPermission="view:audit_logs">
              <AuditLogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['Administrator']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ai-config"
          element={
            <ProtectedRoute allowedRoles={['Administrator']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['Administrator']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Root & Fallback Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
