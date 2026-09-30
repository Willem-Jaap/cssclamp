import type { MetadataRoute } from 'next';

import { absoluteUrl } from '~/lib/site';

const robots = (): MetadataRoute.Robots => ({
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
});

export default robots;
