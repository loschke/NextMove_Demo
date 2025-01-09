'use client';

export default function WarumPage() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FA186B] to-[#FF7B00]">
                    Warum wir das machen sollten
                </h1>

                {/* Quote Section */}
                <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg mb-12 backdrop-blur-sm">
                    <blockquote className="text-lg text-gray-800">
                        "Als Agenturen stehen wir täglich neben unseren Kunden und sehen, wie sie mit KI im Marketing kämpfen. Die einen haben 10 Tools parallel am Laufen und verlieren den Überblick, die anderen wissen gar nicht, wo sie anfangen sollen."
                    </blockquote>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column - Unsere Position */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FA186B] to-[#FF4B40]">
                            Unsere Position
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#FA186B] mr-2">•</span>
                                Wir kennen die Probleme unserer Kunden
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FF4B40] mr-2">•</span>
                                Wir haben die Marketing-Expertise
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FF7B00] mr-2">•</span>
                                Wir verstehen Enterprise-Anforderungen
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FA186B] mr-2">•</span>
                                Wir müssen unser Geschäft transformieren
                            </li>
                        </ul>
                    </div>

                    {/* Right Column - Der Zeitpunkt */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B40] to-[#FF7B00]">
                            Der Zeitpunkt
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-[#FF7B00] mr-2">•</span>
                                Markt ist noch nicht konsolidiert
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FA186B] mr-2">•</span>
                                Kunden suchen nach Orientierung
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FF4B40] mr-2">•</span>
                                Techplayer verstehen kein Marketing
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#FF7B00] mr-2">•</span>
                                Wir können jetzt die Lösung bauen
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Second Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FA186B] to-[#FF7B00]">
                        Was wir täglich hören → Was wir bauen
                    </h2>

                    {/* Problem-Solution Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Wir haben keine Best Practices"</h3>
                            <p className="text-gray-800">
                                → Quicktask Assistenten mit vordefinierten Workflows und Templates von Marketing-Experten
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Uns fehlt Marketing-Expertise"</h3>
                            <p className="text-gray-800">
                                → Expert Chat mit echtem Marketing-Know-how und strategischer Beratung
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Alles dauert viel zu lange"</h3>
                            <p className="text-gray-800">
                                → Workflow Agenten für automatisierte Marketing-Prozesse und Qualitätskontrolle
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Das ist alles nicht CI-konform"</h3>
                            <p className="text-gray-800">
                                → Custom Training für Bildstile, Tonalität und Corporate Wording
                            </p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Uns fehlt KI Know-how"</h3>
                            <p className="text-gray-800">
                                → Umfassende Schulungen und persönliches Guiding für effektiven KI-Einsatz
                            </p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-2">"Wir verlieren den Überblick"</h3>
                            <p className="text-gray-800">
                                → Zentrale Orchestrierung aller KI-Marketing Tools in einer Suite
                            </p>
                        </div>
                    </div>

                    {/* Bottom Banner */}
                    <div className="mt-12 bg-gradient-to-r from-[#FA186B] to-[#FF7B00] text-white p-6 rounded-lg text-center">
                        <p className="text-lg font-semibold">
                            Wir bauen keine "noch eine KI-Plattform" - wir lösen echte Probleme, die wir täglich bei unseren Kunden sehen
                        </p>
                    </div>
                </div>

                {/* Third Section - Unique Positioning */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FA186B] to-[#FF7B00]">
                        Unsere Alleinstellung
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-4 text-lg">Know-how aus zwei Top-Agenturen mit Enterprise-Expertise</h3>
                            <p className="text-gray-800">
                                Jahrelange Erfahrung in der Entwicklung und Umsetzung von Marketing-Strategien für führende Unternehmen
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-4 text-lg">Marketing-First statt Tech-First Ansatz</h3>
                            <p className="text-gray-800">
                                Wir denken von der Marketing-Strategie her und entwickeln KI-Lösungen, die echte Marketing-Herausforderungen lösen - nicht andersherum
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gradient-to-br from-[#FA186B]/5 via-[#FF4B40]/5 to-[#FF7B00]/5 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-bold mb-4 text-lg">Enterprise-Ready von Anfang an</h3>
                            <p className="text-gray-800">
                                Maßgeschneiderte Anpassung an Corporate-Anforderungen ist bei uns kein Extra, sondern integraler Bestandteil unserer Lösung
                            </p>
                        </div>
                    </div>

                    {/* Bottom Banner */}
                    <div className="mt-12 bg-gradient-to-r from-[#FA186B] to-[#FF7B00] text-white p-6 rounded-lg text-center">
                        <p className="text-lg font-semibold">
                            Eine einmalige Chance, uns als Vorreiter im KI-Marketing zu positionieren
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
