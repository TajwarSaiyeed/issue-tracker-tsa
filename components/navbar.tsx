'use client';
import Link from "next/link";
import {FaBug} from "react-icons/fa";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Skeleton} from "@/components/ui/skeleton";

const Navbar = () => {
        const {data: session, status} = useSession()

        const currentPath = usePathname()
    const router = useRouter()

        const links = [
            {label: 'Issues', href: "/issues"},
        ];

        return (
            <nav className={'flex border-b mb-5 px-10 h-14 items-center justify-between'}>
                <div className={'flex gap-x-6'}>
                    <Link href={'/'} className={'flex items-center gap-x-2 font-bold uppercase text-teal-500'}>
                        <FaBug/> Issue Tracker
                    </Link>
                    <ul className={'flex space-x-6'}>
                        {links.map(link => <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn("text-gray-400 hover:text-gray-500 transition-colors", link.href === currentPath && "text-gray-900")}
                            >
                                {link.label}
                            </Link>
                        </li>)}
                    </ul>
                </div>
                {status === 'loading' ? <Skeleton className="w-[100px] h-[40px] rounded-md"/>
                    : !session?.user ?
                        <Button onClick={() => signIn()} variant={'outline'} className={'ml-auto'}>
                            Sign in
                        </Button> : <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"}/>
                                    < AvatarFallback>
                                        {session?.user?.name?.split(' ').map(name => name[0]).join('')?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    onClick={() => router.push("/me")}
                                >Profile</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                }
            </nav>
        )
    }
;

export default Navbar;