import "./globals.css";

import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google"
import Navbar from "@/components/navbar"
import {cn} from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "A simple issue tracker built with Next.js and Prisma",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <AuthProvider>
            <Navbar/>
            <main className={"max-w-7xl mx-auto p-5"}>{children}</main>
        </AuthProvider>
        </body>
        </html>
    );
}
