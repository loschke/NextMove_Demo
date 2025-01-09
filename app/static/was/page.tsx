'use client';
import FeatureCards from "../../components/FeatureCards";

export default function WasPage() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                {/* Daily Feedback Section */}
                <div className="mb-24">
                    <h1 className="text-4xl font-bold mb-12 text-[#24276E]">
                        Das hören wir täglich von Marketing-Teams
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Alltägliche Probleme */}
                        <div className="bg-red-50/50 p-6 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-[#FA186B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h2 className="font-bold text-lg">Alltägliche Probleme</h2>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                                <li>"Wir verbringen mehr Zeit mit Prompts als mit Marketing"</li>
                                <li>"Die Qualität ist total unterschiedlich"</li>
                                <li>"Jeder nutzt andere Tools - das ist ein Chaos"</li>
                                <li>"KI ja, aber wie kriegen wir das skaliert?"</li>
                            </ul>
                        </div>

                        {/* Enterprise Sorgen */}
                        <div className="bg-blue-50/50 p-6 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path>
                                </svg>
                                <h2 className="font-bold text-lg">Enterprise Sorgen</h2>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                                <li>"Ich kann nicht jedes KI Tool lizenzieren!"</li>
                                <li>"Wie kriegen wir das in unsere Systeme?"</li>
                                <li>"Das muss alles CI-konform sein"</li>
                                <li>"Wer hat eigentlich den Überblick?"</li>
                            </ul>
                        </div>

                        {/* KI-Chaos */}
                        <div className="bg-red-50/50 p-6 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-[#FA186B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                <h2 className="font-bold text-lg">KI-Chaos</h2>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                                <li>"Keiner weiß, welches Tool wirklich gut ist"</li>
                                <li>"Wir haben keine Best Practices"</li>
                                <li>"Es fehlt an System und Struktur"</li>
                                <li>"Total unübersichtlich, was es alles gibt"</li>
                            </ul>
                        </div>

                        {/* Budget & ROI */}
                        <div className="bg-purple-50/50 p-6 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h2 className="font-bold text-lg">Budget & ROI</h2>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                                <li>"Die Kosten laufen aus dem Ruder"</li>
                                <li>"Jedes Tool ein Abo - das summiert sich"</li>
                                <li>"Wie rechnet sich das für uns?"</li>
                            </ul>
                        </div>
                    </div>

                    {/* Quote Box */}
                    <div className="bg-yellow-50/50 p-6 rounded-lg border border-yellow-200">
                        <blockquote className="text-gray-700 italic">
                            "Wir wollen KI nutzen, aber es fehlt an allem: Zeit, Know-how, System und Struktur. Wir brauchen einen Partner, der uns an die Hand nimmt."
                        </blockquote>
                    </div>
                </div>

                {/* Solution Section */}
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FA186B] to-[#FF7B00]">
                    Die Lösung: NextMoveAI Suite
                </h1>

                {/* Ganzheitlicher Lösungsansatz Section */}
                <div className="bg-green-50 p-6 rounded-lg mb-12">
                    <div className="flex items-start gap-3">
                        <div className="text-green-600 mt-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Ganzheitlicher Lösungsansatz</h2>
                            <p className="text-gray-700">Enterprise KI-Marketing Suite mit vollständiger Integration aller notwendigen Tools und Prozesse</p>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <FeatureCards />
                {/* Quote Box */}
                <div className="bg-yellow-50/50 p-6 rounded-lg border border-yellow-200 mt-12">
                    <blockquote className="text-gray-700 italic">
                        "Mit NextMoveAI haben wir für jeden Marketing-Task das optimale KI-Tool zur Hand - von ChatGPT und Claude für Texte bis zu Midjourney und Ideogram für Bilder. Durch die Integration der besten KI-Provider wie OpenAI, Anthropic und Google erhalten wir durchgängig hochwertige Ergebnisse."
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
