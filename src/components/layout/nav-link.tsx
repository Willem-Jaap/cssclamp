'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '~/utils/cn';

interface Props {
    href: string;
    children: ReactNode;
}

const NavLink = ({ href, children }: Props) => {
    const isActive = usePathname() === href;

    return (
        <Link
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                'flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors',
                isActive
                    ? 'bg-canvas text-neutral-950 ring-1 ring-line'
                    : 'text-neutral-500 hover:text-neutral-950',
            )}>
            {children}
        </Link>
    );
};

export default NavLink;
