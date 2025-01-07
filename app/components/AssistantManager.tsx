'use client';

import { useState } from 'react';
import { CustomAssistant, InputFieldForm } from '../types/assistants';
import InputFieldBuilder from './InputFieldBuilder';
import { useCustomAssistants } from '../hooks/useCustomAssistants';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function AssistantManager() {
    const { assistants, addAssistant, updateAssistant, deleteAssistant, toggleAssistantActive } = useCustomAssistants();
    const [editingAssistant, setEditingAssistant] = useState<Partial<CustomAssistant>>({
        title: '',
        description: '',
        category: '',
        icon: '🤖',
        inputs: [],
        isActive: true,
        systemPrompt: '',
    });
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAssistant.id) {
            updateAssistant(editingAssistant.id, editingAssistant);
        } else {
            addAssistant(editingAssistant as Omit<CustomAssistant, 'id' | 'createdAt' | 'updatedAt'>);
        }
        setEditingAssistant({
            title: '',
            description: '',
            category: '',
            icon: '🤖',
            inputs: [],
            isActive: true,
            systemPrompt: '',
        });
        setIsCreating(false);
    };

    const handleInputFieldsChange = (fields: InputFieldForm[]) => {
        setEditingAssistant(prev => ({ ...prev, inputs: fields }));
    };

    const startEditing = (assistant: CustomAssistant) => {
        setEditingAssistant(assistant);
        setIsCreating(true);
    };

    const ICONS = ['🤖', '💡', '📝', '✍️', '📊', '🎯', '📈', '🔍', '📧', '💬'];

    return (
        <div className="space-y-8">
            {!isCreating ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Meine Assistenten</h3>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Neuer Assistent
                        </button>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {assistants.map((assistant) => (
                            <div key={assistant.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{assistant.icon}</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{assistant.title}</h4>
                                            <p className="text-sm text-gray-500">{assistant.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => startEditing(assistant)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteAssistant(assistant.id)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{assistant.description}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => toggleAssistantActive(assistant.id)}
                                        className={`px-3 py-1 rounded-full text-sm ${assistant.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {assistant.isActive ? 'Aktiv' : 'Inaktiv'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {editingAssistant.id ? 'Assistent bearbeiten' : 'Neuer Assistent'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingAssistant({
                                        title: '',
                                        description: '',
                                        category: '',
                                        icon: '🤖',
                                        inputs: [],
                                        isActive: true,
                                        systemPrompt: '',
                                    });
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                Abbrechen
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name des Assistenten
                                </label>
                                <input
                                    type="text"
                                    value={editingAssistant.title}
                                    onChange={(e) => setEditingAssistant(prev => ({ ...prev, title: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="z.B. Content Writer, SEO Analyst"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Beschreibung
                                </label>
                                <textarea
                                    value={editingAssistant.description}
                                    onChange={(e) => setEditingAssistant(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Beschreiben Sie die Hauptaufgabe des Assistenten"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Kategorie
                                </label>
                                <input
                                    type="text"
                                    value={editingAssistant.category}
                                    onChange={(e) => setEditingAssistant(prev => ({ ...prev, category: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="z.B. Content Marketing, SEO"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {ICONS.map((icon) => (
                                        <button
                                            key={icon}
                                            type="button"
                                            onClick={() => setEditingAssistant(prev => ({ ...prev, icon }))}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${editingAssistant.icon === icon
                                                ? 'bg-blue-100 border-2 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                                }`}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Eingabefelder</h3>
                        <InputFieldBuilder
                            fields={(editingAssistant.inputs || []).map(input => ({
                                ...input,
                                isEditing: false,
                                options: input.options || []
                            }))}
                            onChange={handleInputFieldsChange}
                        />
                    </div>

                    {/* System Prompt */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">System Prompt</h3>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Definieren Sie hier das Verhalten und die Fähigkeiten des Assistenten.
                                Nutzen Sie {"{feldname}"} um auf die Eingabefelder zu verweisen.
                            </p>
                            <textarea
                                value={editingAssistant.systemPrompt}
                                onChange={(e) => setEditingAssistant(prev => ({ ...prev, systemPrompt: e.target.value }))}
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Du bist ein Marketing-Assistent. Erstelle Content für {thema} im Stil von {tonalitaet}..."
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {editingAssistant.id ? 'Änderungen speichern' : 'Assistenten erstellen'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
