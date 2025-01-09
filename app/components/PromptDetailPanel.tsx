'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface Example {
    filename: string;
    url: string;
}

interface PromptFormula {
    id: string;
    Name: string;
    Beschreibung: string;
    "Prompt Formel": string;
    Beispiele: Example[];
}

interface PromptDetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    formula: PromptFormula | null;
}

export default function PromptDetailPanel({ isOpen, onClose, formula }: PromptDetailPanelProps) {
    const router = useRouter();

    if (!formula) return null;

    const handleVariantClick = () => {
        router.push(`/prompts/${formula.id}`);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: 40 }}
                onClick={onClose}
            />

            {/* Panel */}
            <aside className={`fixed right-0 top-16 bottom-0 w-96 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l shadow-xl z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">{formula.Name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
                        <p className="text-gray-600 whitespace-pre-line">{formula.Beschreibung}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Prompt Formel</h3>
                        <p className="whitespace-pre-line bg-gray-50 p-4 rounded-lg text-gray-700">{formula["Prompt Formel"]}</p>
                    </div>

                    {formula.Beispiele && formula.Beispiele.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Beispiel</h3>
                            <img
                                src={formula.Beispiele[0].url}
                                alt={formula.Beispiele[0].filename}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleVariantClick}
                        className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Varianten generieren
                    </button>
                </div>
            </aside>
        </>
    );
}
