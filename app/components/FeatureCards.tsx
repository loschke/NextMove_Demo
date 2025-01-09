import React from 'react';
import { Zap, MessageSquare, Workflow, Image, Video, Wrench } from 'lucide-react';

const FeatureCards = () => {
    return (
        <div className="bg-white p-8">
            <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
                {/* Quicktask Assistenten */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Zap className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Quicktask Assistenten</h3>
                            <p className="text-gray-600 mb-4">
                                Vorlagenbasierte KI-Assistenten für wiederkehrende Marketing-Aufgaben. Die Assistenten nutzen strukturierte Formulare für optimale Ergebnisse.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Spart Zeit bei Standard-Marketing-Tasks</li>
                                    <li>• Garantiert konsistente Qualität</li>
                                    <li>• Nutzt bewährte Best Practices</li>
                                    <li>• Minimiert KI-Einarbeitungszeit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marketing Expert Chat */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Marketing Expert Chat</h3>
                            <p className="text-gray-600 mb-4">
                                Dialogbasierte KI-Interaktion mit spezialisierten Marketing-Experten-Profilen. Multi-LLM-Strategie für optimale Antworten.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Marketing-Expertise on demand</li>
                                    <li>• Strategische Beratung durch KI</li>
                                    <li>• Spezialisierte Fachexpertise</li>
                                    <li>• Flexible Problemlösung</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Workflow Agenten */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Workflow className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Workflow Agenten</h3>
                            <p className="text-gray-600 mb-4">
                                Automatisierte Mehrstufen-Workflows für komplexe Marketing-Aufgaben mit Qualitätskontrolle und Validierung.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Automatisiert komplexe Prozesse</li>
                                    <li>• Sichert Qualitätsstandards</li>
                                    <li>• Ermöglicht Skalierung</li>
                                    <li>• Integriert Validierungsprozesse</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KI-Bildgenerierung */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Image className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">KI-Bildgenerierung</h3>
                            <p className="text-gray-600 mb-4">
                                Marketing-optimierte Bildgenerierung mit Custom Training für Corporate Design und Prompt-Formeln System.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• CI-konforme Visuals on demand</li>
                                    <li>• Konsistente Bildsprache</li>
                                    <li>• Effiziente Asset-Produktion</li>
                                    <li>• Marketing-optimierte Prompts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multimedia Tools */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Video className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Multimedia Tools</h3>
                            <p className="text-gray-600 mb-4">
                                Umfassende Tools für Video, Audio und YouTube-Content mit KI-gestützter Optimierung und Verarbeitung.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Professionelle Medienverarbeitung</li>
                                    <li>• Content Repurposing</li>
                                    <li>• Optimierte Distribution</li>
                                    <li>• Multi-Format Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Utility Tools */}
                <div className="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 h-full">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wrench className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Utility Tools</h3>
                            <p className="text-gray-600 mb-4">
                                Sammlung technischer Hilfswerkzeuge für Sprache, Datenkonvertierung und Web-Data-Tools in einer zentralen Toolbox.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold mb-2">Warum wichtig?</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Zentrale Tool-Verwaltung</li>
                                    <li>• Kostenoptimierung</li>
                                    <li>• Workflow-Integration</li>
                                    <li>• Einheitliche Oberfläche</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureCards;
