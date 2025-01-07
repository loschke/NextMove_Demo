'use client';

import { useState } from 'react';
import imagePromptsData from '../data/image_prompts_v2.json';

// Type assertion for the imported JSON data
const imagePrompts = imagePromptsData as PromptFormula[];
import PromptDetailPanel from '../components/PromptDetailPanel';
import VariantCreator from '../components/VariantCreator';
import FavoriteButton from '../components/FavoriteButton';

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
    const [isVariantCreatorOpen, setIsVariantCreatorOpen] = useState(false);

    const handleFormulaClick = (formula: PromptFormula) => {
        setSelectedFormula(formula);
        setIsPanelOpen(true);
    };

    const handleVariantCreate = (formula: PromptFormula) => {
        setSelectedFormula(formula);
        setIsVariantCreatorOpen(true);
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">Prompt Formeln</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Entdecken Sie unsere Sammlung von KI Prompt Formeln für Bildgenerierung.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {imagePrompts.map((formula: PromptFormula, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer relative"
                        onClick={() => handleFormulaClick(formula)}
                    >
                        {formula.Beispiele && formula.Beispiele.length > 0 && (
                            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
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
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVariantCreate(formula);
                                        }}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                                    >
                                        Neue Variante erstellen
                                    </button>
                                    <span className="text-white text-lg font-medium">Details anzeigen</span>
                                </div>
                            </div>
                        )}
                        <h3 className="text-lg font-semibold">{formula.Name}</h3>
                        <p className="text-muted-foreground line-clamp-2">{formula.Legende}</p>
                    </div>
                ))}
            </div>

            <PromptDetailPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                formula={selectedFormula}
            />

            {isVariantCreatorOpen && selectedFormula && (
                <VariantCreator
                    formula={selectedFormula}
                    onClose={() => setIsVariantCreatorOpen(false)}
                />
            )}
        </div>
    );
}
