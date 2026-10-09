import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroIntro } from './components/HeroIntro';
import { ConsoleDevice } from './components/ConsoleDevice';
import { CredibilityStrip } from './components/CredibilityStrip';
import { ContactSection } from './components/ContactSection';
import { ModalDialog } from './components/ModalDialog';
import { ModalSection } from './types/console';
import { toggleSound, isSoundEnabled } from './utils/audio';

export const App: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('debbie_console_name');
      if (stored && stored.trim()) return stored.trim();
    }
    return 'Debbie';
  });

  const [activeModal, setActiveModal] = useState<ModalSection>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const handleUpdateName = (newName: string) => {
    setDisplayName(newName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('debbie_console_name', newName);
    }
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <div className="min-h-screen bg-[#111113] text-[#F3F4F6] relative flex flex-col justify-between selection:bg-[#EC6426] selection:text-white overflow-x-hidden">
      {/* Ambient background radial gradient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(236,100,38,0.06)_0%,rgba(228,165,202,0.03)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(46,87,58,0.05)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Navigation Header */}
        <Header
          onOpenSection={(sec) => setActiveModal(sec)}
          soundEnabled={soundOn}
          onToggleSound={handleToggleSound}
          displayName={displayName}
        />

        {/* Main Hero Container */}
        <main className="flex-1 flex flex-col justify-center">
          <HeroIntro
            displayName={displayName}
            onUpdateName={handleUpdateName}
          />

          <ConsoleDevice
            displayName={displayName}
            onOpenSection={(sec) => setActiveModal(sec)}
            isModalOpen={activeModal !== null}
          />

          <CredibilityStrip />

          <ContactSection
            onOpenContactModal={() => setActiveModal('contact')}
          />
        </main>
      </div>

      {/* Accessible Modals */}
      <ModalDialog
        section={activeModal}
        displayName={displayName}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default App;
