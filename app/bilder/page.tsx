'use client';

import { useState } from 'react';
import imagePromptsData from '../data/image_prompts_v2.json';
import PromptDetailPanel from '../components/PromptDetailPanel';
import FavoriteButton from '../components/FavoriteButton';

// Type assertion for the imported JSON data
const imagePrompts = imagePromptsData as PromptFormula[];

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
    Status?: string;
    "Medium / Typ"?: string;
    Verwendung?: string;
    Legende?: string;
}

export default function Bilder() {
    const [selectedFormula, setSelectedFormula] = useState<PromptFormula | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleFormulaClick = (formula: PromptFormula) => {
        setSelectedFormula(formula);
        setIsPanelOpen(true);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Prompt Formeln</h1>
                <p className="text-xl text-muted-foreground">
                    Entdecken Sie unsere Sammlung von KI Prompt Formeln für Bildgenerierung.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {imagePrompts.map((formula: PromptFormula, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer relative bg-white rounded-xl border hover:shadow-xl transition-all duration-300"
                        onClick={() => handleFormulaClick(formula)}
                    >
                        {formula.Beispiele && formula.Beispiele.length > 0 && (
                            <div className="relative aspect-square overflow-hidden rounded-t-xl">
                                <img
                                    src={formula.Beispiele[0].url}
                                    alt={formula.Name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <FavoriteButton
                                    id={formula.id}
                                    type="image"
                                    title={formula.Name}
                                    description={formula.Beschreibung}
                                    imageUrl={formula.Beispiele[0]?.url}
                                    category={formula["Medium / Typ"]}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-lg font-medium">Details anzeigen</span>
                                </div>
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{formula.Name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{formula.Legende}</p>
                        </div>
                    </div>
                ))}
            </div>

            <PromptDetailPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                formula={selectedFormula}
            />
        </div>
    );
}
