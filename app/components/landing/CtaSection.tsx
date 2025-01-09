'use client';

export default function CtaSection() {
    return (
        <div className="bg-gradient-to-br from-[#FA186B] via-[#FF4B40] to-[#FF7B00] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 relative">
                {/* Unique Positioning */}
                <div className="mx-auto max-w-7xl mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <h3 className="font-bold mb-4 text-lg text-white">Know-how aus Top-Agenturen</h3>
                            <p className="text-white/90">
                                Jahrelange Erfahrung in der Entwicklung und Umsetzung von Marketing-Strategien für führende Unternehmen
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <h3 className="font-bold mb-4 text-lg text-white">Marketing-First Ansatz</h3>
                            <p className="text-white/90">
                                Wir denken von der Marketing-Strategie her und entwickeln KI-Lösungen, die echte Marketing-Herausforderungen lösen
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                            <h3 className="font-bold mb-4 text-lg text-white">Enterprise-Ready</h3>
                            <p className="text-white/90">
                                Maßgeschneiderte Anpassung an Corporate-Anforderungen ist bei uns kein Extra, sondern integraler Bestandteil
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Content */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Bereit für den nächsten Schritt?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
                        Transformieren Sie Ihr Marketing-Team mit einer zentralen KI-Suite, die alle Tools und Prozesse intelligent orchestriert.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/tools"
                            className="rounded-md bg-white/90 backdrop-blur-sm px-6 py-3 text-lg font-semibold text-[#FA186B] shadow-lg hover:bg-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Demo anfordern
                        </a>
                        <a
                            href="/warum"
                            className="text-lg font-semibold leading-6 text-white/90 hover:text-white transition-colors duration-200"
                        >
                            Unsere Vision <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
