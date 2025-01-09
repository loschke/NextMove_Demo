'use client';

import { useChat, Message } from 'ai/react';
import { Send, Loader2, Bot, User, Search, X, Library, PanelRightClose, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useChatPrompts } from '../hooks/useChatPrompts';

interface Assistant {
    title: string;
    description: string;
    category: string;
    icon: string;
    inputs?: {
        id: string;
        label: string;
        type: string;
        placeholder?: string;
        required: boolean;
        options?: string[];
    }[];
}

export default function Chat() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isPromptSidebarOpen, setIsPromptSidebarOpen] = useState<boolean>(false);
    const [isAssistantSidebarOpen, setIsAssistantSidebarOpen] = useState(false);
    const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const [isLoadingAssistants, setIsLoadingAssistants] = useState(true);

    const { messages: chatMessages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages } = useChat();

    const { promptsByCategory, prompts, isLoading: isLoadingPrompts } = useChatPrompts();

    useEffect(() => {
        setIsLoadingAssistants(true);
        fetch('/api/assistants')
            .then(res => res.json())
            .then(data => setAssistants(data.assistants))
            .catch(err => console.error('Error loading assistants:', err))
            .finally(() => setIsLoadingAssistants(false));
    }, []);

    const handleAssistantSelect = (assistant: Assistant) => {
        setSelectedAssistant(assistant);
        setIsAssistantSidebarOpen(false);
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: `Hallo! Ich bin ${assistant.title}. ${assistant.description} Wie kann ich dir heute helfen?`
        }]);
    };

    const handleResetAssistant = () => {
        setSelectedAssistant(null);
        setIsAssistantSidebarOpen(false);
        setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: 'Willkommen! Ich bin dein KI-Assistent. Du kannst jederzeit einen spezialisierten Assistenten auswählen, um von dessen Expertise zu profitieren.'
        }]);
    };

    const filteredPrompts = searchTerm
        ? prompts.filter(prompt =>
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handlePromptSelect = (prompt: string) => {
        setInput(prompt);
        setIsPromptSidebarOpen(false);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col relative">
            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto p-4">
                        {chatMessages.length === 0 ? (
                            <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                                <div className="text-center max-w-lg mx-auto">
                                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                                        Willkommen!
                                    </h1>
                                    <p className="text-gray-600 mb-8">
                                        Wie kann ich dir helfen?
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => setIsAssistantSidebarOpen(true)}
                                            className="group px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02]"
                                        >
                                            <Users className="w-5 h-5" />
                                            <span>Experte auswählen</span>
                                        </button>
                                        <button
                                            onClick={() => setIsPromptSidebarOpen(true)}
                                            className="group px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 border shadow-sm hover:scale-[1.02]"
                                        >
                                            <Library className="w-5 h-5" />
                                            <span>Promptvorlagen öffnen</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 pb-32">
                                {chatMessages.map((m: Message) => (
                                    <div key={m.id} className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {m.role === 'user' ? (
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                                                <User className="w-5 h-5 text-blue-500" />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                                                {selectedAssistant ? (
                                                    <span className="text-lg">{selectedAssistant.icon}</span>
                                                ) : (
                                                    <Bot className="w-5 h-5 text-gray-600" />
                                                )}
                                            </div>
                                        )}
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
                                            <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap [&>div]:mb-2 last:[&>div]:mb-0">
                                                {m.content.split('\n').map((line, i) => {
                                                    const isNumberedList = /^\d+\.\s/.test(line);
                                                    const isBulletList = /^[-•]\s/.test(line);

                                                    if (isNumberedList) {
                                                        return <div key={i} className="ml-4 pl-2">{line}</div>;
                                                    } else if (isBulletList) {
                                                        return <div key={i} className="ml-4 pl-2">{line}</div>;
                                                    } else {
                                                        return line ? <div key={i} className="min-h-[1.5em]">{line}</div> : <div key={i} className="h-4" />;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex-shrink-0 border-t bg-white">
                    <div className="max-w-4xl mx-auto p-4">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAssistantSidebarOpen(true)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    title="Experte auswählen"
                                >
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm whitespace-nowrap">
                                        {selectedAssistant ? (
                                            <span className="flex items-center gap-1">
                                                <span className="text-lg">{selectedAssistant.icon}</span>
                                                {selectedAssistant.title}
                                            </span>
                                        ) : (
                                            'Experte'
                                        )}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPromptSidebarOpen(true)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    title="Promptvorlagen öffnen"
                                >
                                    <Library className="w-5 h-5" />
                                    <span className="text-sm">Prompts</span>
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={input}
                                    placeholder={selectedAssistant ? `Schreibe eine Nachricht an ${selectedAssistant.title}...` : "Schreibe eine Nachricht..."}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <div className="absolute -top-8 left-0 flex gap-2">
                                    {!selectedAssistant && (
                                        <>
                                            <button
                                                onClick={() => handleAssistantSelect({
                                                    title: "Marketing Experte",
                                                    description: "Hilft bei Marketing-Aufgaben",
                                                    category: "Marketing",
                                                    icon: "📢"
                                                })}
                                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                                            >
                                                Marketing 📢
                                            </button>
                                            <button
                                                onClick={() => handleAssistantSelect({
                                                    title: "SEO Experte",
                                                    description: "Hilft bei SEO-Optimierung",
                                                    category: "SEO",
                                                    icon: "🔍"
                                                })}
                                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                                            >
                                                SEO 🔍
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                title="Nachricht senden"
                                aria-label="Nachricht senden"
                                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ease-in-out ${(isAssistantSidebarOpen || isPromptSidebarOpen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ zIndex: 40 }}
                onClick={() => {
                    setIsAssistantSidebarOpen(false);
                    setIsPromptSidebarOpen(false);
                }}
            />

            {/* Assistant Selection Sidebar */}
            <aside className={`fixed right-0 top-16 bottom-0 w-96 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l shadow-xl z-50 ${isAssistantSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Experte</h2>
                    <button
                        onClick={() => setIsAssistantSidebarOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Schließen"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isLoadingAssistants ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {selectedAssistant && (
                            <button
                                onClick={handleResetAssistant}
                                className="w-full p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Bot className="w-4 h-4" />
                                <span>Ohne Experte fortfahren</span>
                            </button>
                        )}
                        {assistants.map((assistant) => (
                            <button
                                key={assistant.title}
                                onClick={() => handleAssistantSelect(assistant)}
                                className={`w-full flex flex-col p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left ${selectedAssistant?.title === assistant.title ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{assistant.icon}</span>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{assistant.title}</h3>
                                        <p className="text-sm text-gray-600">{assistant.category}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{assistant.description}</p>
                            </button>
                        ))}
                    </div>
                )}
            </aside>

            {/* Prompt Library Sidebar */}
            <aside className={`fixed right-0 top-16 bottom-0 w-[448px] bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out border-l shadow-2xl z-50 ${isPromptSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Sticky Header */}
                <div className="sticky top-0 bg-white z-10 border-b">
                    <div className="flex items-center justify-between p-6">
                        <h2 className="text-xl font-bold text-gray-900">Prompt Bibliothek</h2>
                        <button
                            onClick={() => setIsPromptSidebarOpen(false)}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Schließen"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="px-6 pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Prompts durchsuchen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                            />
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Suche löschen"
                                    aria-label="Suche löschen"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {searchTerm ? (
                        <div className="space-y-3">
                            {filteredPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePromptSelect(prompt.prompt)}
                                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                                    title={prompt.title}
                                    aria-label={`${prompt.title} aus Kategorie ${prompt.category} auswählen`}
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 flex items-center gap-2 mb-1">
                                                    {prompt.title}
                                                    {prompt.isCustom && (
                                                        <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                                            Eigener Prompt
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">{prompt.category}</div>
                                            </div>
                                            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">{prompt.description}</p>
                                        <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
                                            {prompt.useCase}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        Object.entries(promptsByCategory).map(([category, { description, length, prompts }]) => (
                            <div key={category} className="space-y-3">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        {category}
                                        <span className="text-sm font-normal text-gray-500">
                                            ({length})
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-600">{description}</p>
                                </div>
                                <div className="grid gap-3">
                                    {prompts.map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handlePromptSelect(prompt.prompt)}
                                            className="w-full text-left p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                                            title={prompt.title}
                                            aria-label={`${prompt.title} aus Kategorie ${category} auswählen`}
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="font-medium text-gray-900 flex items-center gap-2">
                                                            {prompt.title}
                                                            {prompt.isCustom && (
                                                                <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    Eigener Prompt
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {prompt.description && (
                                                    <div className="text-sm text-gray-600">{prompt.description}</div>
                                                )}
                                                {prompt.useCase && (
                                                    <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded flex items-center gap-2">
                                                        <span className="shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                        <span className="line-clamp-2">{prompt.useCase}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </div>
    );
}
