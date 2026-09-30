import type { MetadataRoute } from 'next';

import { guides, tools } from '~/lib/pages';
import { absoluteUrl } from '~/lib/site';

const routes = [
    { path: '/', priority: 1 },
    ...tools.map(tool => ({ path: tool.href, priority: 0.9 })),
    ...guides.map(guide => ({ path: guide.href, priority: 0.8 })),
];

const sitemap = (): MetadataRoute.Sitemap =>
    routes.map(({ path, priority }) => ({
        url: absoluteUrl(path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority,
    }));

export default sitemap;
