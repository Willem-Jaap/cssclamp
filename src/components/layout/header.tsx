import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

import NavLink from '~/components/layout/nav-link';
import ThemeToggle from '~/components/layout/theme-toggle';
import Logo from '~/components/misc/logo';
import SkillPopover from '~/components/misc/skill-popover';

const links = [
    { href: '/guide', label: 'Guide' },
    { href: '/tailwind', label: 'Tailwind' },
    { href: '/deepdive', label: 'Deep dive' },
    { href: '/examples', label: 'Examples' },
];

const Header = () => {
    return (
        <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between gap-4 border-b border-b-line bg-white/80 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] backdrop-blur">
            <Link href="/">
                <Logo />
            </Link>
            <div className="flex items-center gap-2">
                <nav className="max-sm:hidden">
                    <menu className="flex items-center gap-1">
                        {links.map(link => (
                            <li key={link.href}>
                                <NavLink href={link.href}>{link.label}</NavLink>
                            </li>
                        ))}
                    </menu>
                </nav>
                <div className="flex items-center gap-1 border-l border-l-line pl-2">
                    <SkillPopover>
                        <button
                            type="button"
                            className="flex h-8 items-center gap-2 rounded-md bg-neutral-950 px-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
                            <SparklesIcon size={14} />
                            Agent skill
                        </button>
                    </SkillPopover>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
