'use client'
import {usePathname} from "next/navigation";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {Card, CardContent} from "@/components/ui/card";

const ProfileLayout = ({children}: {
    children: React.ReactNode
}) => {
    const {data, status} = useSession()
    const pathname = usePathname()
    const links = [
        {
            name: "My Profile",
            href: "/me",
        },
        {
            name: "My Issues",
            href: "/my-issues"
        }
    ]
    return (
        <>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Welcome back, User!</h1>
                <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your profile.</p>
            </div>
            <Card>
                <CardContent className="space-y-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <p className="text-gray-500 dark:text-gray-400">You have 5 new followers this week.</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-4">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <p className="text-gray-500 dark:text-gray-400">You have 3 unread messages.</p>
                </CardContent>
            </Card>
            <div className='relative'>
                <ScrollArea className="max-w-[600px] lg:max-w-none">
                    <div className={cn("mb-4 flex items-center")}>
                        {links.map((link) => (
                            <Link
                                href={link.href}
                                key={link.href}
                                className={cn(
                                    "flex items-center px-4",
                                    pathname?.startsWith(link.href)
                                        ? "font-bold text-primary"
                                        : "font-medium text-muted-foreground"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="invisible"/>
                </ScrollArea>
                <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
                    {children}
                </div>
            </div>
        </>
    );
};

export default ProfileLayout;




