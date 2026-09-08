import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'hi';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // App & Brand
    'app.title': 'INFRA-PREDICT AI',
    'app.subtitle': 'Decision Intelligence',

    // Navigation
    'nav.sectionTitle': 'Platform Navigation',
    'nav.commandCenter': 'Command Center',
    'nav.nationalRiskMap': 'National Risk Map',
    'nav.projects': 'Projects',
    'nav.earlyWarnings': 'Early Warnings',
    'nav.predictions': 'AI Predictions',
    'nav.explainableAI': 'Explainable AI',
    'nav.peerBenchmarking': 'Peer Benchmarking',
    'nav.dataCenter': 'Data Intelligence',
    'nav.analytics': 'Portfolio Analytics',
    'nav.aiReports': 'AI Risk Briefs',
    'nav.settings': 'Settings',

    // Assistant
    'assistant.title': 'Infra-Assist AI',
    'assistant.openButton': 'Open Infra-Assist AI',

    // Common Risk
    'common.riskCritical': 'CRITICAL',
    'common.riskHigh': 'HIGH RISK',
    'common.riskWatch': 'WATCH LIST',
    'common.riskStable': 'STABLE',

    // Dashboard Hero
    'dashboard.hero.title': 'AI Priority Decision Queue',
    'dashboard.hero.description':
      'Projects requiring immediate executive attention based on multi-factor predictive risk modeling and schedule delay forecasts.',
    'dashboard.hero.actionCritical': 'Immediate Executive Review Required',
    'dashboard.hero.actionHigh': 'Senior Review Scheduled',
    'dashboard.hero.actionWatch': 'Under Active Watch',
    'dashboard.hero.actionStable': 'Normal Monitoring',
    'dashboard.hero.health': 'Health',
    'dashboard.hero.primaryRisk': 'Primary Risk Driver',
    'dashboard.hero.recommendedAction': 'Recommended Action',
    'dashboard.hero.investigateButton': 'Investigate Project',
  },
  hi: {
    // App & Brand
    'app.title': 'इन्फ्रा-प्रेडिक्ट एआई',
    'app.subtitle': 'निर्णय बुद्धिमत्ता',

    // Navigation
    'nav.sectionTitle': 'प्लेटफ़ॉर्म नेविगेशन',
    'nav.commandCenter': 'कमांड सेंटर',
    'nav.nationalRiskMap': 'राष्ट्रीय जोखिम मानचित्र',
    'nav.projects': 'परियोजनाएं',
    'nav.earlyWarnings': 'पूर्व चेतावनी',
    'nav.predictions': 'एआई भविष्यवाणियां',
    'nav.explainableAI': 'व्याख्यात्मक एआई',
    'nav.peerBenchmarking': 'तुलनात्मक मूल्यांकन',
    'nav.dataCenter': 'डेटा इंटेलिजेंस',
    'nav.analytics': 'पोर्टफोलियो विश्लेषण',
    'nav.aiReports': 'एआई जोखिम विवरण',
    'nav.settings': 'सेटिंग्स',

    // Assistant
    'assistant.title': 'इन्फ्रा-असिस्ट एआई',
    'assistant.openButton': 'इन्फ्रा-असिस्ट एआई खोलें',

    // Common Risk
    'common.riskCritical': 'गंभीर',
    'common.riskHigh': 'उच्च जोखिम',
    'common.riskWatch': 'निगरानी सूची',
    'common.riskStable': 'स्थिर',

    // Dashboard Hero
    'dashboard.hero.title': 'एआई प्राथमिकता निर्णय कतार',
    'dashboard.hero.description':
      'बहु-कारक भविष्यसूचक जोखिम मॉडलिंग और अनुसूची विलंब पूर्वानुमानों के आधार पर तत्काल कार्यकारी ध्यान देने योग्य परियोजनाएं।',
    'dashboard.hero.actionCritical': 'तत्काल कार्यकारी समीक्षा आवश्यक',
    'dashboard.hero.actionHigh': 'वरिष्ठ समीक्षा निर्धारित',
    'dashboard.hero.actionWatch': 'सक्रिय निगरानी में',
    'dashboard.hero.actionStable': 'सामान्य निगरानी',
    'dashboard.hero.health': 'स्वास्थ्य',
    'dashboard.hero.primaryRisk': 'प्राथमिक जोखिम चालक',
    'dashboard.hero.recommendedAction': 'अनुशंसित कार्रवाई',
    'dashboard.hero.investigateButton': 'परियोजना की जांच करें',
  },
};

const defaultTranslate = (key: string, lang: SupportedLanguage = 'en', fallback?: string): string => {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  if (translations.en[key]) {
    return translations.en[key];
  }
  if (fallback) {
    return fallback;
  }
  // Convert key 'nav.commandCenter' to 'Command Center' if missing
  const lastPart = key.split('.').pop() || key;
  return lastPart.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
};

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => defaultTranslate(key, 'en', fallback),
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('infra_lang');
      if (saved === 'en' || saved === 'hi') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('infra_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    return defaultTranslate(key, language, fallback);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};
