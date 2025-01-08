'use client';
import { useState } from "react";
import { useAssistants } from '../hooks/useAssistants';
import FavoriteButton from '../components/FavoriteButton';

interface InputField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    required?: boolean;
    options?: string[];
    default?: string | boolean;
}

interface Assistant {
    title: string;
    description: string;
    category: string;
    icon: string;
    inputs?: InputField[];
}

interface MarketingData {
    categories: string[];
    assistants: Assistant[];
}

interface GeneratedResponse {
    content: string;
    timestamp: string;
    inputs: Record<string, string | boolean>;
    assistant: {
        title: string;
        inputs?: InputField[];
    };
}

type InputValues = {
    [key: string]: string | boolean;
};

export default function Assistenten() {
    const { assistants, categories, isLoading } = useAssistants();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<InputValues>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [responses, setResponses] = useState<GeneratedResponse[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentResponse, setCurrentResponse] = useState("");

    const filteredAssistants = assistants.filter(assistant => {
        const matchesCategory = selectedCategory === "All" || assistant.category === selectedCategory;
        const matchesSearch = assistant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assistant.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const currentAssistant = assistants.find(a => a.title === selectedAssistant);

    const handleAssistantClick = (assistant: Assistant) => {
        setSelectedAssistant(assistant.title);
        setIsSidebarOpen(true);
        // Initialize input values with defaults
        const initialValues: InputValues = {};
        assistant.inputs?.forEach(input => {
            if (input.type === 'checkbox') {
                initialValues[input.id] = input.default || false;
            } else if (input.type === 'select' && input.options?.length) {
                initialValues[input.id] = input.default || input.options[0];
            } else {
                initialValues[input.id] = '';
            }
        });
        setInputValues(initialValues);
    };

    const handleInputChange = (id: string, value: string | boolean) => {
        setInputValues(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        if (!selectedAssistant || !currentAssistant) return;

        setIsGenerating(true);
        setCurrentResponse("");
        setIsSidebarOpen(false);

        try {
            const response = await fetch('/api/assistants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assistantTitle: selectedAssistant,
                    inputs: inputValues,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate content');
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error('Failed to read response');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                setCurrentResponse(prev => prev + chunk);
            }

            // Add the completed response to the responses array
            setResponses(prev => [...prev, {
                content: currentResponse,
                timestamp: new Date().toLocaleString(),
                inputs: { ...inputValues },
                assistant: {
                    title: currentAssistant.title,
                    inputs: currentAssistant.inputs || []
                }
            }]);

        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetState = (showAll: boolean = false) => {
        setIsGenerating(false);

        if (showAll) {
            setResponses([]);
            setCurrentResponse("");
            setSelectedAssistant(null);
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: 40 }}
                onClick={() => {
                    setIsSidebarOpen(false);
                    setSelectedAssistant(null);
                }}
            />

            {/* Sidebar */}
            <aside className={`fixed right-0 top-16 bottom-0 w-96 bg-white border-l shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ zIndex: 50 }}>
                <div className="h-full overflow-y-auto">
                    {currentAssistant && (
                        <div className="p-6 pb-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">{currentAssistant.title}</h2>
                                <button
                                    onClick={() => {
                                        setIsSidebarOpen(false);
                                        setSelectedAssistant(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                                {currentAssistant.inputs?.map((input) => (
                                    <div key={input.id} className="space-y-2">
                                        <label
                                            htmlFor={input.id}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {input.label}
                                            {input.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>

                                        {input.type === 'textarea' ? (
                                            <textarea
                                                id={input.id}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={input.placeholder}
                                                required={input.required}
                                                value={inputValues[input.id] as string}
                                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                                rows={4}
                                            />
                                        ) : input.type === 'select' ? (
                                            <select
                                                id={input.id}
                                                className="w-full p-2 border rounded-md"
                                                required={input.required}
                                                value={inputValues[input.id] as string}
                                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                                aria-label={input.label}
                                            >
                                                {input.options?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : input.type === 'checkbox' ? (
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    id={input.id}
                                                    type="checkbox"
                                                    checked={inputValues[input.id] as boolean}
                                                    onChange={(e) => handleInputChange(input.id, e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm text-gray-600">Enable</span>
                                            </label>
                                        ) : (
                                            <input
                                                id={input.id}
                                                type={input.type}
                                                className="w-full p-2 border rounded-md"
                                                placeholder={input.placeholder}
                                                required={input.required}
                                                value={inputValues[input.id] as string}
                                                onChange={(e) => handleInputChange(input.id, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate'
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </aside>

            <div className="min-h-[calc(100vh-4rem)] flex flex-col">
                {!isGenerating && responses.length === 0 && (
                    <>
                        <header className="text-center p-6 pb-0">
                            <h1 className="text-4xl font-bold mb-4">
                                Marketing AI Assistant
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Streamline your marketing tasks with AI-powered solutions
                            </p>

                            {/* Search and Filter Section */}
                            <div className="max-w-3xl mx-auto mb-8">
                                <input
                                    type="text"
                                    placeholder="Search assistants..."
                                    className="w-full p-3 rounded-lg border mb-4 bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                            ${selectedCategory === category
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {filteredAssistants.map((assistant) => (
                                <div
                                    key={assistant.title}
                                    className="group bg-white rounded-xl border hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={() => handleAssistantClick(assistant)}
                                >
                                    {/* Header Section */}
                                    <div className="relative">
                                        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl p-3 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform">
                                                    {assistant.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                                        {assistant.title}
                                                    </h2>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full font-medium">
                                                            {assistant.category}
                                                        </span>
                                                        {assistant.isCustom && (
                                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                                                Eigener Assistent
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <FavoriteButton
                                                id={assistant.title}
                                                type="assistant"
                                                title={assistant.title}
                                                description={assistant.description}
                                                icon={assistant.icon}
                                                category={assistant.category}
                                            />
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className="p-6">
                                        <p className="text-gray-600 leading-relaxed">
                                            {assistant.description}
                                        </p>

                                        {/* Input Fields Preview */}
                                        {assistant.inputs && assistant.inputs.length > 0 && (
                                            <div className="mt-4 pt-4 border-t">
                                                <h3 className="text-sm font-medium text-gray-700 mb-2">
                                                    Benötigte Eingaben:
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {assistant.inputs.map((input) => (
                                                        <span
                                                            key={input.id}
                                                            className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md border"
                                                        >
                                                            {input.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    {isGenerating ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        <h2 className="text-xl font-semibold text-gray-900">Generating Content...</h2>
                                    </div>
                                    <button
                                        onClick={() => resetState(true)}
                                        className="text-sm px-3 py-1 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {currentResponse && (
                                    <div className="whitespace-pre-wrap">{currentResponse}</div>
                                )}
                            </div>
                        </div>
                    ) : (responses.length > 0 || currentResponse) ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow">
                                <div className="sticky top-0 z-10 bg-white border-b">
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{currentAssistant?.icon}</span>
                                            <div>
                                                <h2 className="text-xl font-semibold">{currentAssistant?.title}</h2>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {responses.length + (currentResponse ? 1 : 0)} Responses Generated
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => resetState(true)}
                                                className="text-sm px-3 py-1 text-gray-600 hover:text-gray-800"
                                            >
                                                Show All Assistants
                                            </button>
                                            <button
                                                onClick={() => resetState(false)}
                                                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y">
                                    {responses.map((response, index) => (
                                        <div key={index} className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-sm text-gray-500">
                                                    Generated at {response.timestamp}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const el = document.getElementById(`settings-${index}`);
                                                        if (el) {
                                                            el.classList.toggle('hidden');
                                                        }
                                                    }}
                                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                                >
                                                    Settings
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div id={`settings-${index}`} className="hidden mb-4 p-4 bg-gray-50 rounded-lg">
                                                {response.assistant.inputs?.map(input => (
                                                    <div key={input.id} className="text-sm mb-2">
                                                        <span className="font-medium">{input.label}:</span>{' '}
                                                        <span className="text-gray-600">
                                                            {input.type === 'checkbox'
                                                                ? (response.inputs[input.id] ? 'Yes' : 'No')
                                                                : response.inputs[input.id] || 'Not specified'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="whitespace-pre-wrap">{response.content}</div>
                                        </div>
                                    ))}
                                    {currentResponse && (
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-sm text-gray-500">
                                                    Latest Response
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const el = document.getElementById('settings-current');
                                                        if (el) {
                                                            el.classList.toggle('hidden');
                                                        }
                                                    }}
                                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                                >
                                                    Settings
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div id="settings-current" className="hidden mb-4 p-4 bg-gray-50 rounded-lg">
                                                {currentAssistant?.inputs?.map(input => (
                                                    <div key={input.id} className="text-sm mb-2">
                                                        <span className="font-medium">{input.label}:</span>{' '}
                                                        <span className="text-gray-600">
                                                            {input.type === 'checkbox'
                                                                ? (inputValues[input.id] ? 'Yes' : 'No')
                                                                : inputValues[input.id] || 'Not specified'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="whitespace-pre-wrap">{currentResponse}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
