'use client';

import PromptManager from '../../components/PromptManager';

export default function CustomPromptsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Meine Prompts verwalten</h1>
            <p className="text-gray-600 mb-6">
                Hier können Sie Ihre benutzerdefinierten Prompts erstellen, bearbeiten und verwalten.
                Aktivierte Prompts werden in der Chat-Bibliothek hervorgehoben angezeigt.
            </p>
            <PromptManager />
        </div>
    );
}
