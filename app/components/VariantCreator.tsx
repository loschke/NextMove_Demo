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
    onClose: () => void;
}

export default function VariantCreator({ formula, onClose }: VariantCreatorProps) {
    const { register, handleSubmit, watch, setValue } = useForm();
    const [generatedPrompt, setGeneratedPrompt] = useState('');

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

    const onSubmit = (data: any) => {
        updatePrompt(data);
        // Here we would typically call an API to generate the image
        console.log('Generated Prompt:', generatedPrompt);
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-[400px] bg-background border-l border-border shadow-xl p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Neue Variante erstellen</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full"
                        aria-label="Schließen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 pr-8"
                                    placeholder="Eigenen Text eingeben..."
                                />
                                {placeholder.beispiele.length > 0 && (
                                    <div className="relative group">
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            aria-label="Beispiele anzeigen"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 16v-4" />
                                                <path d="M12 8h.01" />
                                            </svg>
                                        </button>
                                        <div className="absolute right-0 top-8 w-64 bg-popover text-popover-foreground shadow-lg rounded-md p-2 hidden group-hover:block z-50">
                                            <div className="text-sm font-medium mb-2">Beispiele:</div>
                                            <div className="space-y-1">
                                                {placeholder.beispiele.map((beispiel, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            const field = register(placeholder.id).name;
                                                            setValue(field, beispiel, { shouldDirty: true });
                                                        }}
                                                        className="block w-full text-left px-2 py-1 text-sm rounded hover:bg-accent truncate"
                                                    >
                                                        {beispiel}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Vorschau</h3>
                        <div className="p-4 rounded-lg bg-accent/50 text-sm">
                            {generatedPrompt || formula["Prompt Formel"]}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                    >
                        Variante generieren
                    </button>
                </form>
            </div>
        </div>
    );
}
