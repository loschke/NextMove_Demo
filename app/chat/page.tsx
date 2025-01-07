'use client';

import { useChat } from 'ai/react';
import { Send, Loader2, Bot, User, Search, X, Library, PanelRightClose } from 'lucide-react';
import { useState } from 'react';
import { useChatPrompts } from '../hooks/useChatPrompts';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat();
    const { promptsByCategory, prompts, isLoading: isLoadingPrompts } = useChatPrompts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const filteredPrompts = searchTerm
        ? prompts.filter(prompt =>
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handlePromptSelect = (prompt: string) => {
        setInput(prompt);
        setIsSidebarOpen(false);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col relative">
            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto p-4">
                        {messages.length === 0 ? (
                            <div className="h-[calc(100vh-12rem)] flex items-center justify-center text-center">
                                <div>
                                    <Bot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                        Willkommen im Chat!
                                    </h2>
                                    <p className="text-gray-600">
                                        Wähle einen Prompt aus der Bibliothek oder starte direkt eine Konversation.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 pb-32">
                                {messages.map(m => (
                                    <div key={m.id} className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                            {m.role === 'user' ? (
                                                <User className="w-5 h-5 text-blue-500" />
                                            ) : (
                                                <Bot className="w-5 h-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
                                            <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap [&>div]:mb-2 last:[&>div]:mb-0">
                                                {m.content.split('\n').map((line, i) => {
                                                    // Check if line starts with a number followed by a dot
                                                    const isNumberedList = /^\d+\.\s/.test(line);
                                                    // Check if line starts with a dash or bullet
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
                            <input
                                className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={input}
                                placeholder="Schreibe eine Nachricht..."
                                onChange={handleInputChange}
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-3 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                                    title={isSidebarOpen ? "Prompt-Bibliothek schließen" : "Prompt-Bibliothek öffnen"}
                                    aria-label={isSidebarOpen ? "Prompt-Bibliothek schließen" : "Prompt-Bibliothek öffnen"}
                                >
                                    {isSidebarOpen ? (
                                        <PanelRightClose className="w-5 h-5" />
                                    ) : (
                                        <Library className="w-5 h-5" />
                                    )}
                                </button>
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
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Prompt Library Sidebar */}
            <aside className={`fixed right-0 top-16 bottom-0 w-80 bg-gray-50 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l shadow-lg z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Prompt Bibliothek</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Prompts durchsuchen..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                title="Suche löschen"
                                aria-label="Suche löschen"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {searchTerm ? (
                        <div className="space-y-2">
                            {filteredPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePromptSelect(prompt.prompt)}
                                    className={`w-full text-left p-3 rounded-lg hover:bg-white border transition-colors relative ${prompt.isCustom
                                            ? prompt.isActive
                                                ? 'border-blue-200 bg-blue-50 hover:bg-blue-50'
                                                : 'border-gray-200'
                                            : 'border-transparent hover:border-gray-200'
                                        }`}
                                    title={prompt.title}
                                    aria-label={`${prompt.title} aus Kategorie ${prompt.category} auswählen`}
                                >
                                    <div className="font-medium text-sm text-gray-900 flex items-center gap-2">
                                        {prompt.title}
                                        {prompt.isCustom && (
                                            <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                                Eigener Prompt
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{prompt.category}</div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        Object.entries(promptsByCategory).map(([category, categoryPrompts]) => (
                            <div key={category}>
                                <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
                                <div className="space-y-1">
                                    {categoryPrompts.map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handlePromptSelect(prompt.prompt)}
                                            className={`w-full text-left p-2 text-sm rounded transition-colors relative group ${prompt.isCustom
                                                    ? prompt.isActive
                                                        ? 'bg-blue-50 hover:bg-blue-100'
                                                        : 'hover:bg-white'
                                                    : 'hover:bg-white'
                                                }`}
                                            title={prompt.title}
                                            aria-label={`${prompt.title} aus Kategorie ${category} auswählen`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span>{prompt.title}</span>
                                                {prompt.isCustom && (
                                                    <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Eigener Prompt
                                                    </span>
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
