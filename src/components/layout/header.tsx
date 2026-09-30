import Link from 'next/link';

import NavLink from '~/components/layout/nav-link';
import Logo from '~/components/misc/logo';

const links = [
    { href: '/guide', label: 'Guide' },
    { href: '/deepdive', label: 'Deep dive' },
    { href: '/examples', label: 'Examples' },
];

const Header = () => {
    return (
        <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between gap-4 border-b border-b-line bg-white/80 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] backdrop-blur">
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <menu className="flex items-center gap-1">
                    {links.map(link => (
                        <li key={link.href}>
                            <NavLink href={link.href}>{link.label}</NavLink>
                        </li>
                    ))}
                </menu>
            </nav>
        </header>
    );
};

export default Header;
