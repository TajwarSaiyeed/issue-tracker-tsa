import Link from "next/link";
import {FaBug} from "react-icons/fa";

const Navbar = () => {
    const links = [
        {label: 'Dashboard', href: "/"},
        {label: 'Issues', href: "/issues"},
    ]
    return (
        <nav className={'flex space-x-6 border-b mb-5 px-5 h-14 items-center'}>
            <Link href={'/'} className={'flex items-center gap-x-2 font-bold uppercase text-teal-500'}>
                <FaBug/> Issue Tracker
            </Link>
            <ul className={'flex space-x-6'}>
                {links.map(link => <li key={link.href}>
                    <Link
                        href={link.href}
                        className={'text-teal-600 hover:text-teal-500 transition-colors'}
                    >
                        {link.label}
                    </Link>
                </li>)}

            </ul>
        </nav>
    );
};

export default Navbar;