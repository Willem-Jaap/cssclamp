import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import { EyesLogo, PixelPerfectLogo } from '~/components/misc/brand-logos';

const sponsors = [
    {
        name: 'Pixel Perfect',
        tagline: 'Strategy, design and code in one team',
        href: 'https://pixelperfect.agency',
        logo: <PixelPerfectLogo className="size-4" />,
    },
    {
        name: 'Eyes',
        tagline: 'Agentic data intelligence for everyone',
        href: 'https://eyes.dev',
        logo: <EyesLogo className="h-3.5 w-auto" />,
    },
];

const SponsorTag = () => {
    return (
        <div className="flex w-full flex-col gap-3">
            <p className="flex items-center gap-3 text-xs text-neutral-500">
                Sponsored by
                <span className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
                {sponsors.map(sponsor => (
                    <Link
                        key={sponsor.name}
                        href={sponsor.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.06] hover:ring-white/20">
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -top-12 -left-12 size-24 rounded-full bg-primary-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-950">
                            {sponsor.logo}
                        </span>
                        <span className="relative flex min-w-0 flex-col">
                            <span className="flex items-center gap-1 text-sm font-medium text-neutral-50">
                                {sponsor.name}
                                <ArrowUpRightIcon
                                    size={14}
                                    className="text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-50"
                                />
                            </span>
                            <span className="text-xs leading-snug text-neutral-500">
                                {sponsor.tagline}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SponsorTag;
