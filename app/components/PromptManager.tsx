'use client';

import { useState } from 'react';
import { useCustomPrompts } from '../hooks/useCustomPrompts';
import { CustomPrompt } from '../types/prompts';

export default function PromptManager() {
    const { prompts, isLoading, addPrompt, updatePrompt, deletePrompt, togglePromptActive } = useCustomPrompts();
    const [editingPrompt, setEditingPrompt] = useState<CustomPrompt | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        prompt: '',
        category: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPrompt) {
            updatePrompt(editingPrompt.id, formData);
        } else {
            addPrompt(formData);
        }

        // Reset form
        setFormData({ title: '', prompt: '', category: '' });
        setEditingPrompt(null);
    };

    const editPrompt = (prompt: CustomPrompt) => {
        setEditingPrompt(prompt);
        setFormData({
            title: prompt.title,
            prompt: prompt.prompt,
            category: prompt.category,
        });
    };


    return (
        <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Titel
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Kategorie
                    </label>
                    <input
                        type="text"
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                        Prompt
                    </label>
                    <textarea
                        id="prompt"
                        value={formData.prompt}
                        onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {editingPrompt ? 'Aktualisieren' : 'Erstellen'}
                </button>
            </form>

            {/* Prompts List */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Meine Prompts
                    </h3>
                    <div className="space-y-4">
                        {prompts.map((prompt) => (
                            <div
                                key={prompt.id}
                                className="border rounded-lg p-4 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">
                                        {prompt.title}
                                    </h4>
                                    <p className="text-sm text-gray-500">{prompt.category}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => togglePromptActive(prompt.id)}
                                        className={`px-3 py-1 rounded-full text-sm ${prompt.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {prompt.isActive ? 'Aktiv' : 'Inaktiv'}
                                    </button>
                                    <button
                                        onClick={() => editPrompt(prompt)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => deletePrompt(prompt.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
