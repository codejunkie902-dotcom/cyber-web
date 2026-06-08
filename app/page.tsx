'use client';

import { LoadingScreen } from '@/components/loading-screen';
import { CustomCursor } from '@/components/custom-cursor';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { InteractiveTerminal } from '@/components/interactive-terminal';
import { ThreatMap } from '@/components/threat-map';
import { LearningPath } from '@/components/learning-path';
import { StatsSection } from '@/components/stats-section';
import { Testimonials } from '@/components/testimonials';
import { Footer } from '@/components/footer';
import { AIChatbot } from '@/components/ai-chatbot';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <InteractiveTerminal />
        <ThreatMap />
        <LearningPath />
        <StatsSection />
        <Testimonials />
      </main>

      <Footer />
      <AIChatbot />
    </>
  );
}
