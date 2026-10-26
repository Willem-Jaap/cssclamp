'use client';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import cn from '~/utils/cn';

interface Props {
    links: { href: string; label: string }[];
}

// The header links don't fit next to the actions on small screens, so they move into a menu.
const MobileNav = ({ links }: Props) => {
    const pathname = usePathname();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label="Open menu"
                    className="flex size-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-canvas hover:text-neutral-950 data-[state=open]:bg-canvas data-[state=open]:text-neutral-950">
                    <MenuIcon size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {links.map(link => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link
                            href={link.href}
                            aria-current={pathname === link.href ? 'page' : undefined}
                            className={cn(
                                'h-9 font-medium',
                                pathname === link.href ? 'text-neutral-950' : 'text-neutral-500',
                            )}>
                            {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileNav;
