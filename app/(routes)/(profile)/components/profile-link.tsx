'use client';
import {FC} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {cn} from "@/lib/utils";

type ProfileLinkProps = {
    link: {
        name: string;
        href: string;
    }
}
const ProfileLink: FC<ProfileLinkProps> = ({link}) => {
    const pathname = usePathname()
    return (
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
    );
};

export default ProfileLink;