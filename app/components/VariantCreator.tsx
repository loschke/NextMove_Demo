'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

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
}

interface VariantCreatorProps {
    formula: PromptFormula;
}

export default function VariantCreator({ formula }: VariantCreatorProps) {
    const { register, handleSubmit, watch, setValue } = useForm();
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    // Watch all fields for live preview
    const formValues = watch();

    // Generate prompt from template and values
    const updatePrompt = useCallback((values: any) => {
        let prompt = formula["Prompt Formel"];
        formula.Platzhalter.forEach(placeholder => {
            const value = values[placeholder.id] || `[${placeholder.name}]`;
            prompt = prompt.replace(`[${placeholder.name}]`, value);
        });
        setGeneratedPrompt(prompt);
    }, [formula]);

    // Update preview on form changes
    useEffect(() => {
        updatePrompt(formValues);
    }, [formValues, updatePrompt]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt || formula["Prompt Formel"]);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    const onSubmit = (data: any) => {
        updatePrompt(data);
        // Here we would typically call an API to generate the image
        console.log('Generated Prompt:', generatedPrompt);
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Variante erstellen</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {formula.Platzhalter.map((placeholder) => (
                        <div key={placeholder.id} className="space-y-2">
                            <label
                                htmlFor={placeholder.id}
                                className="block text-sm font-medium"
                            >
                                {placeholder.name}
                                {placeholder.erforderlich && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <p className="text-sm text-muted-foreground">{placeholder.beschreibung}</p>

                            <div className="relative">
                                <input
                                    type="text"
                                    id={placeholder.id}
                                    {...register(placeholder.id, { required: placeholder.erforderlich })}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 pr-12"
                                    placeholder="Eigenen Text eingeben..."
                                />
                                {placeholder.beispiele.length > 0 && (
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                                        <div className="relative group">
                                            <button
                                                type="button"
                                                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-1.5 transition-colors"
                                                aria-label="Beispiele anzeigen"
                                                title="Klicken Sie hier für Beispiele"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 16v-4" />
                                                    <path d="M12 8h.01" />
                                                </svg>
                                            </button>
                                            <div className="absolute right-0 top-full mt-2 w-72 bg-popover/95 text-popover-foreground shadow-xl rounded-md p-4 hidden group-hover:block z-50 border border-border backdrop-blur-sm">
                                                <div className="absolute -top-2 right-4 w-4 h-4 bg-popover/95 border-t border-l border-border rotate-45"></div>
                                                <div className="text-base font-medium mb-3 text-primary">Beispiele:</div>
                                                <div className="space-y-1">
                                                    {placeholder.beispiele.map((beispiel, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => {
                                                                const field = register(placeholder.id).name;
                                                                setValue(field, beispiel, { shouldDirty: true });
                                                            }}
                                                            className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent truncate"
                                                        >
                                                            {beispiel}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Vorschau</h3>
                        <div className="flex items-center gap-2">
                            {showCopySuccess && (
                                <span className="text-sm text-primary bg-primary/10 py-1 px-2 rounded">Kopiert!</span>
                            )}
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="p-2 bg-accent hover:bg-accent/80 rounded-md transition-colors"
                                title="In Zwischenablage kopieren"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/50 text-sm">
                        {generatedPrompt || formula["Prompt Formel"]}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                    >
                        Variante generieren
                    </button>
                </div>
            </form>
        </div>
    );
}
