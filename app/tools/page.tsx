'use client';

import { useState } from 'react';
import FavoriteButton from '../components/FavoriteButton';

export default function ToolsPage() {
    const toolClusters = [
        {
            id: 'language',
            name: 'Language Tools',
            icon: '🌍',
            description: 'Advanced language processing tools',
            tools: [
                {
                    id: 'translation',
                    name: 'Smart Translation',
                    description: 'Context-aware language translation'
                },
                {
                    id: 'grammar-check',
                    name: 'Grammar Assistant',
                    description: 'Advanced grammar and style checking'
                },
                {
                    id: 'language-learning',
                    name: 'Learning Helper',
                    description: 'AI-powered language learning tools'
                }
            ]
        },
        {
            id: 'data-conversion',
            name: 'Data Conversion',
            icon: '📊',
            description: 'Convert between different data formats',
            tools: [
                {
                    id: 'csv-json',
                    name: 'CSV to JSON',
                    description: 'Convert CSV files to structured JSON format'
                },
                {
                    id: 'xml-json',
                    name: 'XML to JSON',
                    description: 'Transform XML documents into JSON format'
                },
                {
                    id: 'excel-json',
                    name: 'Excel to JSON',
                    description: 'Convert Excel spreadsheets to JSON data'
                }
            ]
        },
        {
            id: 'web-data',
            name: 'Web Data Tools',
            icon: '🌐',
            description: 'Extract and process web data',
            tools: [
                {
                    id: 'web-scraping',
                    name: 'Web Scraping',
                    description: 'Extract structured data from websites'
                },
                {
                    id: 'table-extractor',
                    name: 'Table Extractor',
                    description: 'Extract and convert web tables to structured data'
                },
                {
                    id: 'api-tester',
                    name: 'API Tester',
                    description: 'Test and validate API endpoints'
                }
            ]
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Tools</h1>
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
