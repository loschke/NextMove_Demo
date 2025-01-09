'use client';

import { useState } from 'react';
import { CustomQuicktask, InputFieldForm } from '../types/quicktasks';
import InputFieldBuilder from './InputFieldBuilder';
import { useCustomQuicktasks } from '../hooks/useCustomQuicktasks';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function QuicktaskManager() {
    const { quicktasks, addQuicktask, updateQuicktask, deleteQuicktask, toggleQuicktaskActive } = useCustomQuicktasks();
    const [editingQuicktask, setEditingQuicktask] = useState<Partial<CustomQuicktask>>({
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
        if (editingQuicktask.id) {
            updateQuicktask(editingQuicktask.id, editingQuicktask);
        } else {
            addQuicktask(editingQuicktask as Omit<CustomQuicktask, 'id' | 'createdAt' | 'updatedAt'>);
        }
        setEditingQuicktask({
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
        setEditingQuicktask(prev => ({ ...prev, inputs: fields }));
    };

    const startEditing = (quicktask: CustomQuicktask) => {
        setEditingQuicktask(quicktask);
        setIsCreating(true);
    };

    const ICONS = ['🤖', '💡', '📝', '✍️', '📊', '🎯', '📈', '🔍', '📧', '💬'];

    return (
        <div className="space-y-8">
            {!isCreating ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Meine Quicktasks</h3>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            aria-label="Neue Quicktask erstellen"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Neue Quicktask
                        </button>
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {quicktasks.map((quicktask) => (
                            <div key={quicktask.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{quicktask.icon}</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{quicktask.title}</h4>
                                            <p className="text-sm text-gray-500">{quicktask.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => startEditing(quicktask)}
                                            className="text-gray-400 hover:text-gray-600"
                                            aria-label="Quicktask bearbeiten"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteQuicktask(quicktask.id)}
                                            className="text-gray-400 hover:text-red-600"
                                            aria-label="Quicktask löschen"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{quicktask.description}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => toggleQuicktaskActive(quicktask.id)}
                                        className={`px-3 py-1 rounded-full text-sm ${quicktask.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {quicktask.isActive ? 'Aktiv' : 'Inaktiv'}
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
                                {editingQuicktask.id ? 'Quicktask bearbeiten' : 'Neue Quicktask'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingQuicktask({
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
                                    Name der Quicktask
                                </label>
                                <input
                                    type="text"
                                    value={editingQuicktask.title}
                                    onChange={(e) => setEditingQuicktask(prev => ({ ...prev, title: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="z.B. Content Writer, SEO Analyse"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Beschreibung
                                </label>
                                <textarea
                                    value={editingQuicktask.description}
                                    onChange={(e) => setEditingQuicktask(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Beschreiben Sie die Hauptaufgabe der Quicktask"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Kategorie
                                </label>
                                <input
                                    type="text"
                                    value={editingQuicktask.category}
                                    onChange={(e) => setEditingQuicktask(prev => ({ ...prev, category: e.target.value }))}
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
                                            onClick={() => setEditingQuicktask(prev => ({ ...prev, icon }))}
                                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${editingQuicktask.icon === icon
                                                ? 'bg-blue-100 border-2 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                                }`}
                                            aria-label={`Icon ${icon} auswählen`}
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
                            fields={(editingQuicktask.inputs || []).map(input => ({
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
                                Definieren Sie hier das Verhalten und die Fähigkeiten der Quicktask.
                                Nutzen Sie {"{feldname}"} um auf die Eingabefelder zu verweisen.
                            </p>
                            <textarea
                                value={editingQuicktask.systemPrompt}
                                onChange={(e) => setEditingQuicktask(prev => ({ ...prev, systemPrompt: e.target.value }))}
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
                            {editingQuicktask.id ? 'Änderungen speichern' : 'Quicktask erstellen'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
