import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDemoStore } from '../../store/demoStore';
import { UserRole } from '../../config/roles';
import { InfraProject } from '../../types/projects';
import { DecisionModeView } from '../../components/dashboard/DecisionModeView';
import { ProjectDetailModal } from '../../components/dashboard/ProjectDetailModal';
import { UploadDataModal } from '../../components/dashboard/UploadDataModal';
import { GenerateBriefModal } from '../../components/dashboard/GenerateBriefModal';
import { InfraAssistModal } from '../../components/dashboard/InfraAssistModal';

// Role-specific dashboard views
import { ExecutiveDashboardView } from '../../components/dashboard/roles/ExecutiveDashboardView';
import { ProjectManagerDashboardView } from '../../components/dashboard/roles/ProjectManagerDashboardView';
import { MonitoringDashboardView } from '../../components/dashboard/roles/MonitoringDashboardView';
import { MinistryDashboardView } from '../../components/dashboard/roles/MinistryDashboardView';
import { AuditorDashboardView } from '../../components/dashboard/roles/AuditorDashboardView';
import { AdminDashboardView } from '../../components/dashboard/roles/AdminDashboardView';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { isDecisionMode, setDecisionMode } = useDemoStore();

  const currentRole: UserRole = user?.role || 'Senior Decision Maker';

  // Selected project for dossier modal
  const [selectedProjectForDossier, setSelectedProjectForDossier] = useState<InfraProject | null>(null);

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [assistModalOpen, setAssistModalOpen] = useState(false);

  // If in Decision Mode, render the signature Decision Mode view
  if (isDecisionMode) {
    return <DecisionModeView onExitDecisionMode={() => setDecisionMode(false)} />;
  }

  // Render role-tailored dashboard view
  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'Senior Decision Maker':
        return (
          <ExecutiveDashboardView
            onSelectProject={(p) => setSelectedProjectForDossier(p)}
            onOpenUpload={() => setUploadModalOpen(true)}
            onOpenBrief={() => setBriefModalOpen(true)}
            onOpenAssist={() => setAssistModalOpen(true)}
          />
        );

      case 'Project Manager':
        return (
          <ProjectManagerDashboardView
            onSelectProject={(p) => setSelectedProjectForDossier(p)}
          />
        );

      case 'Monitoring Officer':
        return (
          <MonitoringDashboardView
            onSelectProject={(p) => setSelectedProjectForDossier(p)}
          />
        );

      case 'Ministry / Department':
        return (
          <MinistryDashboardView
            onSelectProject={(p) => setSelectedProjectForDossier(p)}
          />
        );

      case 'Auditor / Viewer':
        return <AuditorDashboardView />;

      case 'Administrator':
        return <AdminDashboardView />;

      default:
        return (
          <ExecutiveDashboardView
            onSelectProject={(p) => setSelectedProjectForDossier(p)}
            onOpenUpload={() => setUploadModalOpen(true)}
            onOpenBrief={() => setBriefModalOpen(true)}
            onOpenAssist={() => setAssistModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {renderRoleDashboard()}

      {/* SHARED MODALS */}
      <ProjectDetailModal
        project={selectedProjectForDossier}
        isOpen={!!selectedProjectForDossier}
        onClose={() => setSelectedProjectForDossier(null)}
      />

      {/* Upload modal only accessible if authorized */}
      <UploadDataModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <GenerateBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        project={selectedProjectForDossier}
      />

      <InfraAssistModal
        isOpen={assistModalOpen}
        onClose={() => setAssistModalOpen(false)}
      />
    </div>
  );
};
