import { type ReactNode } from 'react';

import { EyesLogo, PixelPerfectLogo, TencilLogo } from '~/components/misc/brand-logos';

import { site } from '~/lib/site';

export interface Sponsor {
    name: string;
    tagline: string;
    href: string;
    logo: ReactNode;
}

export const sponsors: Sponsor[] = [
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
    {
        name: 'Tencil',
        tagline: 'Point at your app, tell your agent what to fix',
        href: 'https://tencil.dev',
        logo: <TencilLogo className="size-5" />,
    },
];

// utm_content tells the sponsors which placement the click came from.
export const withUtm = (href: string, placement: 'footer' | 'floating') => {
    const url = new URL(href);
    url.searchParams.set('utm_source', new URL(site.url).hostname);
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', 'sponsor');
    url.searchParams.set('utm_content', placement);
    return url.toString();
};
