'use client';

import { useState } from 'react';
import { InputFieldForm, InputTypeOption } from '../types/assistants';
import { PlusCircle, X, GripVertical, Edit2, Check, Trash2 } from 'lucide-react';

const INPUT_TYPES: InputTypeOption[] = [
    { value: 'text', label: 'Text', icon: '📝' },
    { value: 'textarea', label: 'Mehrzeiliger Text', icon: '📄' },
    { value: 'select', label: 'Auswahl', icon: '📋' },
    { value: 'checkbox', label: 'Checkbox', icon: '☑️' },
];

interface InputFieldBuilderProps {
    fields: InputFieldForm[];
    onChange: (fields: InputFieldForm[]) => void;
}

export default function InputFieldBuilder({ fields, onChange }: InputFieldBuilderProps) {
    const [newField, setNewField] = useState<Partial<InputFieldForm>>({
        type: 'text',
        required: false,
        options: [],
    });

    const addField = () => {
        if (!newField.label) return;

        const field: InputFieldForm = {
            id: crypto.randomUUID(),
            label: newField.label || '',
            type: newField.type || 'text',
            placeholder: newField.placeholder,
            required: newField.required || false,
            options: newField.type === 'select' ? newField.options || [] : [],
            isEditing: false,
        };

        onChange([...fields, field]);
        setNewField({ type: 'text', required: false, options: [] });
    };

    const updateField = (id: string, updates: Partial<InputFieldForm>) => {
        onChange(
            fields.map(field =>
                field.id === id ? { ...field, ...updates } : field
            )
        );
    };

    const removeField = (id: string) => {
        onChange(fields.filter(field => field.id !== id));
    };

    const handleOptionsChange = (id: string, optionsText: string) => {
        const options = optionsText.split(',').map(opt => opt.trim()).filter(Boolean);
        updateField(id, { options });
    };

    return (
        <div className="space-y-6">
            {/* Existing Fields */}
            <div className="space-y-4">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="bg-white rounded-lg border p-4 relative group"
                    >
                        {field.isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor={`field-label-${field.id}`} className="block text-sm font-medium text-gray-700">
                                        Feldbezeichnung
                                    </label>
                                    <input
                                        id={`field-label-${field.id}`}
                                        type="text"
                                        value={field.label}
                                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        aria-label={`Feldbezeichnung für ${field.label}`}
                                        placeholder="Geben Sie eine Feldbezeichnung ein"
                                    />
                                </div>

                                <div>
                                    <label htmlFor={`field-type-${field.id}`} className="block text-sm font-medium text-gray-700">
                                        Feldtyp
                                    </label>
                                    <select
                                        id={`field-type-${field.id}`}
                                        value={field.type}
                                        onChange={(e) => updateField(field.id, { type: e.target.value as InputFieldForm['type'] })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        aria-label={`Feldtyp für ${field.label}`}
                                    >
                                        {INPUT_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.icon} {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {field.type !== 'checkbox' && (
                                    <div>
                                        <label htmlFor={`field-placeholder-${field.id}`} className="block text-sm font-medium text-gray-700">
                                            Platzhalter
                                        </label>
                                        <input
                                            id={`field-placeholder-${field.id}`}
                                            type="text"
                                            value={field.placeholder || ''}
                                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            aria-label={`Platzhalter für ${field.label}`}
                                            placeholder="Platzhaltertext für das neue Feld eingeben"
                                        />
                                    </div>
                                )}

                                {field.type === 'select' && (
                                    <div>
                                        <label htmlFor={`field-options-${field.id}`} className="block text-sm font-medium text-gray-700">
                                            Optionen (kommagetrennt)
                                        </label>
                                        <input
                                            id={`field-options-${field.id}`}
                                            type="text"
                                            value={field.options.join(', ')}
                                            onChange={(e) => handleOptionsChange(field.id, e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            aria-label={`Optionen für ${field.label}`}
                                            placeholder="Option 1, Option 2, Option 3"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`required-field-${field.id}`}
                                        checked={field.required}
                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor={`required-field-${field.id}`}
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Pflichtfeld
                                    </label>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => updateField(field.id, { isEditing: false })}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Fertig
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <GripVertical className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {field.label}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {INPUT_TYPES.find(t => t.value === field.type)?.label}
                                            {field.required && ' • Pflichtfeld'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateField(field.id, { isEditing: true })}
                                        className="text-gray-400 hover:text-gray-600"
                                        title={`${field.label} bearbeiten`}
                                        aria-label={`${field.label} bearbeiten`}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => removeField(field.id)}
                                        className="text-gray-400 hover:text-red-600"
                                        title={`${field.label} löschen`}
                                        aria-label={`${field.label} löschen`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add New Field */}
            <div className="bg-gray-50 rounded-lg border border-dashed p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Neues Feld hinzufügen</h4>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="new-field-label" className="block text-sm font-medium text-gray-700">
                            Feldbezeichnung
                        </label>
                        <input
                            id="new-field-label"
                            type="text"
                            value={newField.label || ''}
                            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            aria-label="Neue Feldbezeichnung"
                            placeholder="z.B. Name, Email, Kategorie"
                        />
                    </div>

                    <div>
                        <label htmlFor="new-field-type" className="block text-sm font-medium text-gray-700">
                            Feldtyp
                        </label>
                        <select
                            id="new-field-type"
                            value={newField.type}
                            onChange={(e) => setNewField({ ...newField, type: e.target.value as InputFieldForm['type'] })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            aria-label="Neuer Feldtyp"
                        >
                            {INPUT_TYPES.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.icon} {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {newField.type !== 'checkbox' && (
                        <div>
                            <label htmlFor="new-field-placeholder" className="block text-sm font-medium text-gray-700">
                                Platzhalter
                            </label>
                            <input
                                id="new-field-placeholder"
                                type="text"
                                value={newField.placeholder || ''}
                                onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                aria-label="Platzhalter für neues Feld"
                                placeholder="Geben Sie einen Platzhaltertext ein"
                            />
                        </div>
                    )}

                    {newField.type === 'select' && (
                        <div>
                            <label htmlFor="new-field-options" className="block text-sm font-medium text-gray-700">
                                Optionen (kommagetrennt)
                            </label>
                            <input
                                id="new-field-options"
                                type="text"
                                value={newField.options?.join(', ') || ''}
                                onChange={(e) => setNewField({
                                    ...newField,
                                    options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                aria-label="Auswahloptionen für neues Feld"
                                placeholder="Option 1, Option 2, Option 3"
                            />
                        </div>
                    )}

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="new-field-required"
                            checked={newField.required || false}
                            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="new-field-required"
                            className="ml-2 block text-sm text-gray-700"
                        >
                            Pflichtfeld
                        </label>
                    </div>

                    <button
                        onClick={addField}
                        disabled={!newField.label}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Feld hinzufügen
                    </button>
                </div>
            </div>
        </div>
    );
}
