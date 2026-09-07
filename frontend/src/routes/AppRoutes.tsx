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
import { DataCenterPage } from '../pages/data/DataCenterPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { NationalRiskMapPage } from '../pages/map/NationalRiskMapPage';
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
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/explainability" element={<ExplainabilityPage />} />
        <Route path="/benchmarking" element={<BenchmarkingPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/data" element={<DataCenterPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Root & Fallback Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
