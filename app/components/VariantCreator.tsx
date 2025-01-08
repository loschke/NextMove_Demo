'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { fal } from "@fal-ai/client";
import type { Result } from "@fal-ai/client";

interface FalImageResponse {
    images: Array<{
        url: string;
        content_type: string;
    }>;
    seed: number;
    has_nsfw_concepts: boolean[];
    prompt: string;
}

// Configure fal.ai client
fal.config({
    credentials: process.env.NEXT_PUBLIC_FAL_KEY
});

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

type Mode = 'simple' | 'expert';

interface GeneratedPrompt {
    prompt: string;
    selected?: boolean;
}

export default function VariantCreator({ formula }: VariantCreatorProps) {
    const { register, handleSubmit, watch, setValue } = useForm();
    const [mode, setMode] = useState<Mode>('simple'); // simple mode is the default
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
    const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);

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

    const generatePrompts = async () => {
        try {
            setIsGeneratingPrompts(true);
            setError(null);
            setGeneratedPrompts([]);

            const response = await fetch('/api/prompt-generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: description,
                    formula: formula["Prompt Formel"]
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate prompts');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (!reader) {
                throw new Error('Failed to read response');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                fullText += chunk;

                // Extract prompts from the numbered list format
                const prompts = fullText
                    .split('\n')
                    .filter(line => /^\d+\./.test(line)) // Lines starting with numbers
                    .map(line => ({
                        prompt: line.replace(/^\d+\.\s*/, '').trim() // Remove number and whitespace
                    }));

                if (prompts.length > 0) {
                    setGeneratedPrompts(prompts);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Fehler bei der Generierung der Vorschläge');
            console.error('Prompt generation error:', err);
        } finally {
            setIsGeneratingPrompts(false);
        }
    };

    const selectPrompt = (index: number) => {
        setGeneratedPrompts(prev =>
            prev.map((p, i) => ({
                ...p,
                selected: i === index
            }))
        );
        setGeneratedPrompt(generatedPrompts[index].prompt);
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);
            setGeneratedImage(null);

            const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
                input: {
                    prompt: mode === 'expert' ? generatedPrompt : (generatedPrompts.find(p => p.selected)?.prompt || generatedPrompt),
                    num_images: 1,
                    aspect_ratio: "16:9"
                }
            });

            if (result.data.images && result.data.images.length > 0) {
                setGeneratedImage(result.data.images[0].url);
            } else {
                setError("No image was generated");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate image");
            console.error("Image generation error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Variante erstellen</h2>
                <div className="flex gap-2 bg-accent/50 rounded-lg p-1">
                    <button
                        onClick={() => setMode('simple')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'simple'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                            }`}
                    >
                        Einfach
                    </button>
                    <button
                        onClick={() => setMode('expert')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'expert'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                            }`}
                    >
                        Experte
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {mode === 'expert' ? (
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
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Promptvorschläge generieren
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 rounded-md border border-input bg-background px-3 py-2"
                                placeholder="Beschreiben Sie hier in Ihren eigenen Worten, was Sie sich vorstellen..."
                            />
                        </div>

                        <button
                            type="button"
                            onClick={generatePrompts}
                            disabled={isGeneratingPrompts || !description}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md"
                        >
                            {isGeneratingPrompts ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generiere Vorschläge...
                                </span>
                            ) : (
                                "Vorschläge generieren"
                            )}
                        </button>

                        {generatedPrompts.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Wählen Sie einen Prompt</h3>
                                <div className="space-y-2">
                                    {generatedPrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => selectPrompt(index)}
                                            className={`w-full text-left p-3 rounded-md border transition-colors ${prompt.selected
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary'
                                                }`}
                                        >
                                            {prompt.prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {mode === 'expert' && (
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
                )}

                {(mode === 'expert' || (mode === 'simple' && generatedPrompt)) && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generiere Bild...
                                    </span>
                                ) : (
                                    "Variante generieren"
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        {generatedImage && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Generiertes Bild</h3>
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <img
                                        src={generatedImage}
                                        alt="Generated variant"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
