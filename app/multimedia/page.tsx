'use client';

import { useState } from 'react';
import FavoriteButton from '../components/FavoriteButton';

export default function MultimediaPage() {
    const toolClusters = [
        {
            id: 'youtube',
            name: 'YouTube Tools',
            icon: '▶️',
            description: 'Tools for YouTube content creation and analysis',
            tools: [
                {
                    id: 'youtube-transcription',
                    name: 'Video Transcription',
                    description: 'Generate accurate transcripts from YouTube videos'
                },
                {
                    id: 'youtube-summary',
                    name: 'Video Summary',
                    description: 'Create concise summaries of video content'
                },
                {
                    id: 'youtube-script',
                    name: 'Script Generator',
                    description: 'Convert videos into structured scripts'
                }
            ]
        },
        {
            id: 'video',
            name: 'Video Tools',
            icon: '🎥',
            description: 'Professional video processing tools',
            tools: [
                {
                    id: 'video-trim',
                    name: 'Video Trimmer',
                    description: 'Cut and trim videos with precision'
                },
                {
                    id: 'video-subtitle',
                    name: 'Subtitle Generator',
                    description: 'Create and edit video subtitles'
                },
                {
                    id: 'video-compress',
                    name: 'Video Compressor',
                    description: 'Compress videos while maintaining quality'
                }
            ]
        },
        {
            id: 'audio',
            name: 'Audio Tools',
            icon: '🎙️',
            description: 'Professional audio processing tools',
            tools: [
                {
                    id: 'audio-transcription',
                    name: 'Audio Transcription',
                    description: 'Convert audio files to text with high accuracy'
                },
                {
                    id: 'text-to-speech',
                    name: 'Text to Speech',
                    description: 'Convert text to natural-sounding audio'
                },
                {
                    id: 'audio-editing',
                    name: 'Audio Enhancement',
                    description: 'Improve audio quality and clarity'
                }
            ]
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Multimedia</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolClusters.map((cluster) => (
                    <div
                        key={cluster.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="p-5 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl">{cluster.icon}</span>
                                <div>
                                    <h2 className="text-xl font-bold">{cluster.name}</h2>
                                    <p className="text-sm text-gray-600">{cluster.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            {cluster.tools.map((tool) => (
                                <div
                                    key={tool.id}
                                    className="group relative bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                                    <div className="absolute top-3 right-3">
                                        <FavoriteButton
                                            id={tool.id}
                                            type="multimedia"
                                            title={tool.name}
                                            description={tool.description}
                                            icon={cluster.icon}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
