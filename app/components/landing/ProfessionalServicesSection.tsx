'use client';

export default function ProfessionalServicesSection() {
    return (
        <div className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-[#FA186B]">Professional Services</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Ihr Partner für die KI-Transformation
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Wir begleiten Sie auf Ihrem Weg zur KI-gestützten Marketing-Organisation - von der Strategie über die Implementierung bis zum Training Ihrer Teams
                    </p>
                </div>

                {/* Service Categories */}
                <div className="grid lg:grid-cols-3 gap-12 mt-16">
                    {/* Transformation */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Transformation</h3>
                            <p className="text-gray-600 mb-4">
                                Entwickeln Sie eine zukunftssichere KI-Strategie für Ihr Marketing
                            </p>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">KI-Marketing Readiness Assessment</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Change Management & Adoption</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Prozessoptimierung & Automation</span>
                            </li>
                        </ul>
                    </div>

                    {/* Implementation */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Implementation</h3>
                            <p className="text-gray-600 mb-4">
                                Professionelle Integration der KI-Tools in Ihre Systeme
                            </p>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">System-Integration & API Setup</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Custom Development & Anpassung</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Workflow Setup & Automatisierung</span>
                            </li>
                        </ul>
                    </div>

                    {/* Training */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Training</h3>
                            <p className="text-gray-600 mb-4">
                                Befähigen Sie Ihre Teams für die KI-gestützte Zukunft
                            </p>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Basis Workshops & Grundlagen</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Expert Training & Best Practices</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-[#FA186B] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-600">Team Enablement & Support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-20 bg-gradient-to-r from-[#FA186B] to-[#FF7B00] rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6 text-center">Ihre Vorteile</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h4 className="font-semibold">Schnellere Adoption</h4>
                            </div>
                            <p className="text-white/80">Verkürzen Sie die Einführungszeit durch professionelle Begleitung</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 className="font-semibold">Risikominimierung</h4>
                            </div>
                            <p className="text-white/80">Vermeiden Sie kostspielige Fehler und Umwege</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <h4 className="font-semibold">Maximale Effizienz</h4>
                            </div>
                            <p className="text-white/80">Optimieren Sie Prozesse von Anfang an richtig</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h4 className="font-semibold">Team Empowerment</h4>
                            </div>
                            <p className="text-white/80">Befähigen Sie Ihre Mitarbeiter für die KI-Zukunft</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
