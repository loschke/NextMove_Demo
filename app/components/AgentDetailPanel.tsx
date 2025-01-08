'use client';

import { useState } from 'react';

interface AgentDetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    agent: {
        id: string;
        name: string;
        description: string;
        type: 'content-briefing' | 'seo' | 'social-media';
    };
}

export default function AgentDetailPanel({ isOpen, onClose, agent }: AgentDetailPanelProps) {
    const [isLoading, setIsLoading] = useState(false);

    const getInputFields = () => {
        switch (agent.type) {
            case 'content-briefing':
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thema</label>
                            <input
                                type="text"
                                placeholder="z.B. Nachhaltiges Marketing"
                                className="w-full p-2 border rounded-lg"
                                aria-label="Thema eingeben"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Zielgruppe</label>
                            <input
                                type="text"
                                placeholder="z.B. Marketing Manager in KMUs"
                                className="w-full p-2 border rounded-lg"
                                aria-label="Zielgruppe eingeben"
                            />
                        </div>
                    </>
                );
            case 'seo':
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium">URL oder Text</label>
                        <textarea
                            placeholder="Fügen Sie die zu optimierende URL oder den Text ein"
                            className="w-full p-2 border rounded-lg h-24"
                            aria-label="URL oder Text zur SEO-Optimierung eingeben"
                        />
                    </div>
                );
            case 'social-media':
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="campaign-goal">Kampagnenziel</label>
                            <select
                                id="campaign-goal"
                                className="w-full p-2 border rounded-lg"
                                aria-label="Kampagnenziel auswählen"
                            >
                                <option value="">Bitte wählen...</option>
                                <option value="awareness">Brand Awareness</option>
                                <option value="engagement">Engagement</option>
                                <option value="conversion">Conversion</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Hauptthema</label>
                            <input
                                type="text"
                                placeholder="z.B. Produkteinführung"
                                className="w-full p-2 border rounded-lg"
                                aria-label="Hauptthema eingeben"
                            />
                        </div>
                    </>
                );
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{agent.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Schließen"
                            title="Panel schließen"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">{agent.description}</p>

                    <div className="space-y-6">
                        {getInputFields()}
                    </div>

                    <button
                        onClick={() => setIsLoading(true)}
                        disabled={isLoading}
                        className={`mt-8 w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : agent.type === 'content-briefing'
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : agent.type === 'seo'
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-purple-500 hover:bg-purple-600'
                            }`}
                        aria-label={isLoading ? 'Workflow wird gestartet' : 'Workflow starten'}
                    >
                        {isLoading ? 'Wird gestartet...' : 'Workflow starten'}
                    </button>
                </div>
            </div>
        </div>
    );
}
