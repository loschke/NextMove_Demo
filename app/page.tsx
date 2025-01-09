'use client';

import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import ProfessionalServicesSection from './components/landing/ProfessionalServicesSection';
import CtaSection from './components/landing/CtaSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <FeaturesSection />
            <ProfessionalServicesSection />
            <CtaSection />

            {/* Simple Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-gray-400">
                            &copy; 2024 NextMoveAI - Living Prompts für Marketing und Agenturen. Alle Rechte vorbehalten.
                        </p>
                    </div>
                    <div className="flex justify-center space-x-6 md:order-2">
                        <a href="/tools" className="text-gray-400 hover:text-gray-300">
                            Tools
                        </a>
                        <a href="/prompts" className="text-gray-400 hover:text-gray-300">
                            Prompts
                        </a>
                        <a href="/assistenten" className="text-gray-400 hover:text-gray-300">
                            Assistenten
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
