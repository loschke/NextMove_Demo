'use client';

import QuicktaskManager from '../../components/QuicktaskManager';

export default function ManageQuicktasksPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Meine Quicktasks verwalten</h1>
            <p className="text-gray-600 mb-6">
                Hier können Sie Ihre persönlichen Quicktasks erstellen, anpassen und verwalten.
            </p>
            <QuicktaskManager />
        </div>
    );
}
