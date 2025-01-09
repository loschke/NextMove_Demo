'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/favoriten", label: "Favoriten", icon: "⭐" },
        { href: "/assistenten", label: "Assistenten", icon: "🤖" },
        { href: "/chat", label: "Chat", icon: "💬" },
        { href: "/bilder", label: "Bilder", icon: "🖼️" },
        { href: "/agenten", label: "Agenten", icon: "👥" },
        { href: "/multimedia", label: "Multimedia", icon: "🎥" },
        { href: "/tools", label: "Tools", icon: "🛠️" },
    ];

    const adminItems = [
        { href: "/admin/prompts", label: "Meine Prompts", icon: "📝" },
        { href: "/admin/assistants", label: "Meine Assistenten", icon: "🤖" },
        { href: "/admin/company", label: "Unternehmensdaten", icon: "🏢" },
        { href: "/admin/styles", label: "Schreibstile", icon: "✍️" },
    ];

    return (
        <aside className="bg-white w-64 min-h-screen border-r">
            <div className="p-4 border-b">
                <Link href="/" className="block hover:opacity-80">
                    <h2 className="text-xl font-bold">NextMoveAI</h2>
                    <p className="text-sm text-gray-600">Living Prompts for Marketing</p>
                </Link>
            </div>
            <nav className="flex flex-col h-[calc(100vh-6rem)]">
                <div className="p-4 flex-grow">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${pathname === item.href
                                ? "bg-pink-50 text-[#FA186B]"
                                : "text-gray-700 hover:bg-orange-50"
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="text-sm font-medium text-gray-500 mb-2 px-4">Administration</div>
                    {adminItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${pathname === item.href
                                ? "bg-pink-50 text-[#FA186B]"
                                : "text-gray-700 hover:bg-orange-50"
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
}

export function Header() {
    const pathname = usePathname();
    return (
        <header className="bg-white border-b">
            <div className="flex justify-between items-center h-16 px-6">
                {/* Static Navigation */}
                <div className="flex-1 flex justify-center">
                    <nav className="flex space-x-12">
                        <Link
                            href="/static/was"
                            className={`text-sm font-medium px-3 py-2 transition-all duration-200 ${pathname === '/static/was'
                                ? 'text-[#FA186B] border-b-2 border-[#FA186B]'
                                : 'text-gray-700 hover:text-[#FA186B] hover:border-b-2 hover:border-[#FF7B00]'
                                }`}
                        >
                            Problem & Lösung
                        </Link>
                        <Link
                            href="/static/warum"
                            className={`text-sm font-medium px-3 py-2 transition-all duration-200 ${pathname === '/static/warum'
                                ? 'text-[#FA186B] border-b-2 border-[#FA186B]'
                                : 'text-gray-700 hover:text-[#FA186B] hover:border-b-2 hover:border-[#FF7B00]'
                                }`}
                        >
                            Unser Vorteil
                        </Link>
                    </nav>
                </div>
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-800">
                        <span className="text-xl">🔔</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#FA186B] to-[#FF7B00] rounded-full flex items-center justify-center text-white">
                            U
                        </div>
                        <span className="text-gray-700">User</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
