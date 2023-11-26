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

                        className={classnames({
                            'text-gray-400': link.href !== currentPath,
                            'hover:text-gray-500 transition-colors': true,
                            'text-gray-900': link.href === currentPath,
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