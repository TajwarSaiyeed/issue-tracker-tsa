'use client';
import Link from "next/link";
import {FaBug} from "react-icons/fa";
import {usePathname} from "next/navigation";
import classnames from 'classnames';

const Navbar = () => {

    const currentPath = usePathname()

    const links = [
        {label: 'Dashboard', href: "/"},
        {label: 'Issues', href: "/issues"},
    ];

    return (
        <nav className={'flex space-x-6 border-b mb-5 px-5 h-14 items-center'}>
            <Link href={'/'} className={'flex items-center gap-x-2 font-bold uppercase text-teal-500'}>
                <FaBug/> Issue Tracker
            </Link>
            <ul className={'flex space-x-6'}>
                {links.map(link => <li key={link.href}>
                    <Link
                        href={link.href}
                        // className={`text-teal-600 hover:text-teal-500 active:${link.href === currentPath && "text-teal-900 font-semibold"} transition-colors`}
                        className={classnames({
                            'text-teal-600': link.href !== currentPath,
                            'hover:text-teal-500 transition-colors': true,
                            'text-teal-900 font-semibold': link.href === currentPath,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>)}

            </ul>
        </nav>
    );
};

export default Navbar;