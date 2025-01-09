'use client';

import { useState } from 'react';
import AgentDetailPanel from '../components/AgentDetailPanel';

interface Agent {
    id: string;
    name: string;
    description: string;
    type: 'content-briefing' | 'seo' | 'social-media';
}

export default function Agenten() {
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    const handleStartWorkflow = (agent: Agent) => {
        setSelectedAgent(agent);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Agenten</h1>
                <p className="text-xl text-muted-foreground">
                    Hier finden Sie eine Übersicht aller verfügbaren Workflow-Agenten.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Content Briefing Agent Card */}
                <div className="bg-white rounded-xl border hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Content Briefing Agent</h2>
                        <p className="text-gray-600 mb-6">
                            Erstellt automatisiert umfassende Content-Briefings basierend auf Ihrem Thema und Ihrer Zielgruppe.
                        </p>

                        {/* Metadata Section */}
                        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Durchlaufzeit</span>
                                </div>
                                <p className="text-sm text-gray-600">~15-20 Minuten</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Abgeschlossen</span>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">243 Workflows</a>
                            </div>
                        </div>

                        {/* History Button */}
                        <button className="w-full mb-6 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Verlauf anzeigen</span>
                        </button>

                        {/* Workflow Steps */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">1</div>
                                <div>
                                    <h3 className="font-semibold">Thema & Zielgruppe</h3>
                                    <p className="text-sm text-gray-500">Eingabe des Themas und Definition der Zielgruppe</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">2</div>
                                <div>
                                    <h3 className="font-semibold">Webrecherche</h3>
                                    <p className="text-sm text-gray-500">Analyse von Trends und bestehenden Inhalten</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">3</div>
                                <div>
                                    <h3 className="font-semibold">Konkurrenzanalyse</h3>
                                    <p className="text-sm text-gray-500">Untersuchung erfolgreicher Content-Strategien</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">4</div>
                                <div>
                                    <h3 className="font-semibold">Zielgruppenanalyse</h3>
                                    <p className="text-sm text-gray-500">Identifikation von Painpoints und Bedürfnissen</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">5</div>
                                <div>
                                    <h3 className="font-semibold">Titel-Generierung</h3>
                                    <p className="text-sm text-gray-500">Entwicklung optimierter Überschriften</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">6</div>
                                <div>
                                    <h3 className="font-semibold">Briefing-Erstellung</h3>
                                    <p className="text-sm text-gray-500">Zusammenstellung aller Erkenntnisse in einem Dokument</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleStartWorkflow({
                                id: 'content-briefing',
                                name: 'Content Briefing Agent',
                                description: 'Erstellt automatisiert umfassende Content-Briefings basierend auf Ihrem Thema und Ihrer Zielgruppe.',
                                type: 'content-briefing'
                            })}
                            className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Workflow starten
                        </button>
                    </div>
                </div>

                {/* SEO Optimization Agent Card */}
                <div className="bg-white rounded-xl border hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">SEO Optimierungs-Agent</h2>
                        <p className="text-gray-600 mb-6">
                            Analysiert und optimiert Inhalte für bessere Suchmaschinenplatzierungen.
                        </p>

                        {/* Metadata Section */}
                        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Durchlaufzeit</span>
                                </div>
                                <p className="text-sm text-gray-600">~10 Minuten</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Abgeschlossen</span>
                                </div>
                                <a href="#" className="text-sm text-green-600 hover:text-green-800 hover:underline">167 Workflows</a>
                            </div>
                        </div>

                        {/* History Button */}
                        <button className="w-full mb-6 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Verlauf anzeigen</span>
                        </button>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">1</div>
                                <div>
                                    <h3 className="font-semibold">Content-Analyse</h3>
                                    <p className="text-sm text-gray-500">Bewertung des bestehenden Contents</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">2</div>
                                <div>
                                    <h3 className="font-semibold">Keyword-Recherche</h3>
                                    <p className="text-sm text-gray-500">Identifikation relevanter Keywords</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">3</div>
                                <div>
                                    <h3 className="font-semibold">Optimierungsvorschläge</h3>
                                    <p className="text-sm text-gray-500">Konkrete Verbesserungsempfehlungen</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleStartWorkflow({
                                id: 'seo',
                                name: 'SEO Optimierungs-Agent',
                                description: 'Analysiert und optimiert Inhalte für bessere Suchmaschinenplatzierungen.',
                                type: 'seo'
                            })}
                            className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Workflow starten
                        </button>
                    </div>
                </div>

                {/* Social Media Campaign Agent Card */}
                <div className="bg-white rounded-xl border hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Social Media Campaign Agent</h2>
                        <p className="text-gray-600 mb-6">
                            Plant und strukturiert Social Media Kampagnen für maximale Reichweite.
                        </p>

                        {/* Metadata Section */}
                        <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Durchlaufzeit</span>
                                </div>
                                <p className="text-sm text-gray-600">~25 Minuten</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Abgeschlossen</span>
                                </div>
                                <a href="#" className="text-sm text-purple-600 hover:text-purple-800 hover:underline">89 Workflows</a>
                            </div>
                        </div>

                        {/* History Button */}
                        <button className="w-full mb-6 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Verlauf anzeigen</span>
                        </button>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">1</div>
                                <div>
                                    <h3 className="font-semibold">Zieldefinition</h3>
                                    <p className="text-sm text-gray-500">Festlegung der Kampagnenziele</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">2</div>
                                <div>
                                    <h3 className="font-semibold">Content-Planung</h3>
                                    <p className="text-sm text-gray-500">Entwicklung der Content-Strategie</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">3</div>
                                <div>
                                    <h3 className="font-semibold">Zeitplan-Erstellung</h3>
                                    <p className="text-sm text-gray-500">Optimaler Posting-Zeitplan</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleStartWorkflow({
                                id: 'social-media',
                                name: 'Social Media Campaign Agent',
                                description: 'Plant und strukturiert Social Media Kampagnen für maximale Reichweite.',
                                type: 'social-media'
                            })}
                            className="mt-6 w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            Workflow starten
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ease-in-out ${selectedAgent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: 40 }}
                onClick={() => setSelectedAgent(null)}
            />

            {/* Detail Panel */}
            <aside className={`fixed right-0 top-16 bottom-0 w-96 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l shadow-xl z-50 ${selectedAgent ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedAgent && (
                    <AgentDetailPanel
                        isOpen={true}
                        onClose={() => setSelectedAgent(null)}
                        agent={selectedAgent}
                    />
                )}
            </aside>
        </div>
    );
}
