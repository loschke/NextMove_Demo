'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Example {
    filename: string;
    url: string;
}

interface Placeholder {
    id: string;
    name: string;
    beschreibung: string;
    beispiele: string[];
    erforderlich: boolean;
    typ: 'select' | 'text';
}

interface PromptFormula {
    id: string;
    Name: string;
    Beschreibung: string;
    "Prompt Formel": string;
    Platzhalter: Placeholder[];
    Beispiele: Example[];
}

interface PromptDetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    formula: PromptFormula | null;
}

export default function PromptDetailPanel({ isOpen, onClose, formula }: PromptDetailPanelProps) {
    const router = useRouter();

    if (!isOpen || !formula) return null;

    const handleVariantClick = () => {
        router.push(`/prompts/${formula.id}`);
    };

    return (
        <div className="fixed inset-y-0 right-0 w-1/3 bg-background border-l border-border shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{formula.Name}</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-accent rounded-full"
                    aria-label="Close panel"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Beschreibung</h3>
                    <p className="whitespace-pre-line text-muted-foreground">{formula.Beschreibung}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Prompt Formel</h3>
                    <p className="whitespace-pre-line bg-accent p-4 rounded-lg">{formula["Prompt Formel"]}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Beispiele</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {formula.Beispiele.map((example, index) => (
                            <img
                                key={index}
                                src={example.url}
                                alt={example.filename}
                                className="w-full h-auto rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleVariantClick}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
                    >
                        Varianten generieren
                    </button>
                </div>
            </div>
        </div>
    );
}
