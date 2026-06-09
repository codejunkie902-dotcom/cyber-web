'use client';

import { LoadingScreen } from '@/components/loading-screen';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { InteractiveTerminal } from '@/components/interactive-terminal';
import { ThreatMap } from '@/components/threat-map';
import { LearningPath } from '@/components/learning-path';
import { Testimonials } from '@/components/testimonials';
import { Footer } from '@/components/footer';
import { AIChatbot } from '@/components/ai-chatbot';
import { AuthModalProvider } from '@/components/auth-modal';

export default function Home() {
  return (
    <AuthModalProvider>
      <LoadingScreen />
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <InteractiveTerminal />
        <ThreatMap />
        <LearningPath />
        <Testimonials />
      </main>

      <Footer />
      <AIChatbot />
    </AuthModalProvider>
  );
}
