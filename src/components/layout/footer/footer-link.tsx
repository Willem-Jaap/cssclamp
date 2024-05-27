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
                'underline-offset-2 hover:text-neutral-400 hover:underline',
                {
                    'text-primary-500 hover:text-primary-400': pathname === href,
                },
                className,
            )}
            {...props}>
            {children}
        </Link>
    );
};

export default FooterLink;
