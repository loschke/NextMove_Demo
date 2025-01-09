'use client';
import FeatureCards from '../FeatureCards';

export default function FeaturesSection() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="py-24 bg-gradient-to-b from-white via-orange-50/20 to-white sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Problems Section */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold mb-12 text-[#24276E] text-center">
                            Das hören wir täglich von Marketing-Teams
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Alltägliche Probleme */}
                            <div className="bg-red-50/50 p-6 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-6 h-6 text-[#FA186B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <h3 className="font-bold text-lg">Alltägliche Probleme</h3>
                                </div>
                                <ul className="space-y-2 text-gray-700">
                                    <li>"Wir verbringen mehr Zeit mit Prompts als mit Marketing"</li>
                                    <li>"Die Qualität ist total unterschiedlich"</li>
                                    <li>"Jeder nutzt andere Tools - das ist ein Chaos"</li>
                                </ul>
                            </div>

                            {/* Enterprise Sorgen */}
                            <div className="bg-blue-50/50 p-6 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path>
                                    </svg>
                                    <h3 className="font-bold text-lg">Enterprise Sorgen</h3>
                                </div>
                                <ul className="space-y-2 text-gray-700">
                                    <li>"Ich kann nicht jedes KI Tool lizenzieren!"</li>
                                    <li>"Das muss alles CI-konform sein"</li>
                                    <li>"Wer hat eigentlich den Überblick?"</li>
                                </ul>
                            </div>
                        </div>

                        {/* Solution Banner */}
                        <div className="bg-gradient-to-r from-[#FA186B] to-[#FF7B00] text-white p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold mb-2">Die Lösung: NextMoveAI Suite</h3>
                            <p>Enterprise KI-Marketing Suite mit vollständiger Integration aller notwendigen Tools und Prozesse</p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-[#FA186B]">Unsere Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Alle KI-Tools zentral orchestriert
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Von ChatGPT und Claude für Texte bis zu Midjourney und Ideogram für Bilder - die besten KI-Provider in einer Suite, plus umfassende Beratung und Schulung für Ihre erfolgreiche KI-Transformation
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <FeatureCards />
                </div>
            </div>
        </div>
    );
}
