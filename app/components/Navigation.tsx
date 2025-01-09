'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <aside className={`bg-white min-h-screen border-r transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="relative">
                <div className="p-3 border-b text-center">
                    <Link href="/" className="block hover:opacity-80">
                        <div className="w-8 h-8 mx-auto bg-gradient-to-br from-[#FA186B] to-[#FF7B00] rounded-lg flex items-center justify-center text-white">
                            <span className="text-sm">AI</span>
                        </div>
                    </Link>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-4 bg-white border rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors z-50 text-gray-500 text-sm"
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>
            <nav className="flex flex-col h-[calc(100vh-6rem)]">
                <div className="p-4 flex-grow">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg mb-2 ${pathname === item.href
                                ? "bg-pink-50 text-[#FA186B]"
                                : "text-gray-700 hover:bg-orange-50"
                                }`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className={`text-sm font-medium text-gray-500 mb-2 px-4 ${isCollapsed ? 'hidden' : 'block'}`}>Administration</div>
                    {adminItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg mb-2 ${pathname === item.href
                                ? "bg-pink-50 text-[#FA186B]"
                                : "text-gray-700 hover:bg-orange-50"
                                }`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
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
        <header className="bg-gradient-to-r from-[#FA186B] to-[#FF7B00] shadow-sm">
            <div className="flex justify-between items-center h-14 px-6">
                {/* Empty div for layout balance */}
                <div className="w-48"></div>

                {/* Center Logo */}
                <Link href="/" className="text-center hover:opacity-80 -mt-1">
                    <h2 className="text-lg font-bold text-white">NextMoveAI</h2>
                    <p className="text-xs text-white/80">Living Prompts for Marketing</p>
                </Link>

                {/* User Menu */}
                <div className="flex items-center space-x-4 w-48 justify-end">
                    <button className="text-white/80 hover:text-white transition-colors">
                        <span className="text-xl">🔔</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
                            U
                        </div>
                        <span className="text-white">User</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
