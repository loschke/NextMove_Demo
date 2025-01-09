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
                <h2 className="text-xl font-bold">NextMove</h2>
                <p className="text-sm text-gray-600">AI Marketing Assistant</p>
            </div>
            <nav className="flex flex-col h-[calc(100vh-6rem)]">
                <div className="p-4 flex-grow">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${pathname === item.href
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
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
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
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
    return (
        <header className="bg-white border-b">
            <div className="flex justify-end items-center h-16 px-6">
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-800">
                        <span className="text-xl">🔔</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            U
                        </div>
                        <span className="text-gray-700">User</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
