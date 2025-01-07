import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Sidebar, Header } from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "NextMove - AI Marketing Assistant",
    description: "AI-powered marketing automation and assistance platform",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen bg-gray-50">
                    <Sidebar />
                    <div className="flex-1">
                        <Header />
                        <main className="min-h-[calc(100vh-4rem)]">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
