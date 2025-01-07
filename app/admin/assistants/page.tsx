'use client';

import AssistantManager from '../../components/AssistantManager';

export default function ManageAssistantsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Meine Assistenten verwalten</h1>
            <p className="text-gray-600 mb-6">
                Hier können Sie Ihre persönlichen Assistenten erstellen, anpassen und verwalten.
            </p>
            <AssistantManager />
        </div>
    );
}
