'use client';

import { useState } from 'react';
import FavoriteButton from '../components/FavoriteButton';

export default function MultimediaPage() {
    const tools = [
        {
            id: 'transcription',
            name: 'Audio Transcription',
            icon: '🎙️',
            description: 'Convert audio files to text'
        },
        {
            id: 'youtube',
            name: 'YouTube Tools',
            icon: '▶️',
            description: 'Transcribe YouTube videos'
        },
        {
            id: 'text-to-audio',
            name: 'Text to Audio',
            icon: '🔊',
            description: 'Convert text to natural-sounding speech'
        },
        {
            id: 'web-scraping',
            name: 'Web Scraping',
            icon: '🌐',
            description: 'Extract data from websites'
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Multimedia</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className="bg-white p-4 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer relative"
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{tool.icon}</span>
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                        </div>
                        <p className="text-gray-600">{tool.description}</p>
                        <FavoriteButton
                            id={tool.id}
                            type="multimedia"
                            title={tool.name}
                            description={tool.description}
                            icon={tool.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
