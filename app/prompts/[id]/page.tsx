'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VariantCreator from '../../components/VariantCreator';

interface Placeholder {
    id: string;
    name: string;
    beschreibung: string;
    beispiele: string[];
    erforderlich: boolean;
    typ: 'select' | 'text';
}

interface Example {
    filename: string;
    url: string;
}

interface PromptFormula {
    id: string;
    Name: string;
    Beschreibung: string;
    "Prompt Formel": string;
    Platzhalter: Placeholder[];
    Beispiele: Example[];
    Status: string;
    "Medium / Typ": string;
    Verwendung: string;
}

export default function PromptFormulaDetail() {
    const params = useParams();
    const [formula, setFormula] = useState<PromptFormula | null>(null);
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(formula?.["Prompt Formel"] || "");
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    useEffect(() => {
        const fetchFormula = async () => {
            try {
                const response = await fetch('/api/image-prompts');
                const data = await response.json();
                const foundFormula = data.find((f: PromptFormula) => f.id === params.id);
                if (foundFormula) {
                    setFormula(foundFormula);
                } else {
                    console.error('Formula not found for id:', params.id);
                }
            } catch (error) {
                console.error('Error fetching prompt formula:', error);
            }
        };

        fetchFormula();
    }, [params.id]);

    if (!formula) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-muted-foreground">Lade Prompt Formel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-6xl mx-auto space-y-4">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-xl font-bold mb-1">{formula.Name}</h1>
                            <p className="text-sm text-muted-foreground">{formula.Beschreibung}</p>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{formula["Medium / Typ"]}</span>
                            <span>•</span>
                            <span>{formula.Status}</span>
                            <span>•</span>
                            <span>{formula.Verwendung}</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-[1fr,2fr] gap-6">
                        {formula.Beispiele && formula.Beispiele.length > 0 && (
                            <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                                <img
                                    src={formula.Beispiele[0].url}
                                    alt={formula.Beispiele[0].filename}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="relative flex items-center min-h-[240px]">
                            <div className="w-full">
                                <h2 className="text-base font-semibold mb-3">Prompt Formel</h2>
                                <div className="relative">
                                    <p className="whitespace-pre-line bg-accent p-6 rounded-lg text-base leading-relaxed">{formula["Prompt Formel"]}</p>
                                    <div className="absolute top-2 right-2 flex items-center gap-2">
                                        {showCopySuccess && (
                                            <span className="text-sm text-primary bg-primary/10 py-1 px-2 rounded">Kopiert!</span>
                                        )}
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 bg-background/80 hover:bg-background rounded-md backdrop-blur-sm transition-colors"
                                            title="In Zwischenablage kopieren"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <VariantCreator formula={formula} />
            </div>
        </div>
    );
}
