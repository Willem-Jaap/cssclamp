'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '~/utils/cn';

interface Props {
    children: ReactNode;
    className?: string;
    href: string;
    target?: '_blank';
    rel?: 'noreferrer';
}

const FooterLink = ({ children, className, href, ...props }: Props) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
                'transition-colors hover:text-neutral-50',
                pathname === href && 'text-neutral-50',
                className,
            )}
            {...props}>
            {children}
        </Link>
    );
};

export default FooterLink;
