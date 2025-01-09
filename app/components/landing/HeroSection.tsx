'use client';

export default function HeroSection() {
    return (
        <div className="bg-gradient-to-br from-[#FA186B] via-[#FF4B40] to-[#FF7B00] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">
                        Enterprise KI-Marketing Suite
                    </h1>
                    <p className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-white">
                        Die All-in-One Lösung für Marketing-Teams: Von ChatGPT bis Midjourney - alle KI-Tools zentral orchestriert
                    </p>
                    <div className="mt-8 flex flex-col items-center space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl">
                            <p className="text-white/90 text-lg italic">
                                "Mit NextMoveAI haben wir für jeden Marketing-Task das optimale KI-Tool zur Hand - durchgängig hochwertige Ergebnisse durch Integration der besten KI-Provider."
                            </p>
                        </div>
                        <div className="mt-12 flex gap-4">
                            <a
                                href="/tools"
                                className="rounded-md bg-white/90 backdrop-blur-sm px-8 py-3 text-lg font-semibold text-[#FA186B] shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                Demo anfordern
                            </a>
                            <a
                                href="/was"
                                className="rounded-md bg-white/20 backdrop-blur-sm px-8 py-3 text-lg font-semibold text-white hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                Mehr erfahren
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
