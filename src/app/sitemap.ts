import type { MetadataRoute } from 'next';

import { absoluteUrl } from '~/lib/site';

const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/font-size-clamp-generator', priority: 0.9 },
    { path: '/spacing-clamp-generator', priority: 0.9 },
    { path: '/tailwind', priority: 0.9 },
    { path: '/guide', priority: 0.8 },
    { path: '/deepdive', priority: 0.7 },
    { path: '/examples', priority: 0.7 },
];

const sitemap = (): MetadataRoute.Sitemap =>
    routes.map(({ path, priority }) => ({
        url: absoluteUrl(path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority,
    }));

export default sitemap;
