import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import FooterLink from '~/components/layout/footer/footer-link';
import FooterText from '~/components/layout/footer/footer-text';
import Logo from '~/components/misc/logo';
import SponsorTag from '~/components/misc/sponsor-tag';

const columns = [
    {
        title: 'Learn',
        links: [
            { href: '/', label: 'Generator' },
            { href: '/guide', label: 'Guide' },
            { href: '/deepdive', label: 'Deep dive' },
            { href: '/examples', label: 'Examples' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { href: 'https://github.com/Willem-Jaap', label: 'GitHub', external: true },
            { href: 'https://twitter.com/WillemJaap_', label: 'Twitter', external: true },
        ],
    },
];

const Footer = () => {
    return (
        <footer
            id="footer"
            className="mt-24 max-w-[100vw] overflow-hidden bg-neutral-950 text-neutral-400">
            <div className="flex flex-col justify-between gap-12 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] pt-20 pb-16 md:flex-row">
                <div className="flex max-w-sm flex-col items-start gap-6">
                    <div className="text-neutral-50">
                        <Logo />
                    </div>
                    <p className="leading-relaxed">
                        Generate responsive clamp() values for spacing and typography. See a live
                        preview, copy the code, and take control of your layouts.
                    </p>
                    <Link
                        href="/"
                        className="group flex h-9 items-center gap-2 rounded-lg bg-neutral-50 px-4 text-sm font-medium text-neutral-950 transition-colors hover:bg-white">
                        Open the generator
                        <ArrowUpRightIcon
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>
                <div className="flex w-full flex-col gap-12 md:max-w-md">
                    <div className="flex gap-16 sm:gap-24 md:justify-end">
                        {columns.map(column => (
                            <div key={column.title} className="flex flex-col gap-4">
                                <p className="text-sm font-medium text-neutral-50">
                                    {column.title}
                                </p>
                                <ul className="flex flex-col gap-2.5 text-sm">
                                    {column.links.map(link => (
                                        <li key={link.href}>
                                            {'external' in link ? (
                                                <FooterLink
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1">
                                                    {link.label}
                                                    <ArrowUpRightIcon size={12} />
                                                </FooterLink>
                                            ) : (
                                                <FooterLink href={link.href}>
                                                    {link.label}
                                                </FooterLink>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <SponsorTag />
                </div>
            </div>
            <FooterText />
            <div className="relative flex justify-between gap-2 border-t border-t-white/10 bg-neutral-950 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] py-5 text-sm max-sm:flex-col sm:items-center">
                <span>© {new Date().getFullYear()} CSS Clamp</span>
                <span>
                    Crafted with <span className="text-primary-400">♥</span> by{' '}
                    <Link
                        href="https://willemjaap.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-50 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
                        Willem-Jaap
                    </Link>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
