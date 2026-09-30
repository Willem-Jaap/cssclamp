export const site = {
    name: 'CSS Clamp',
    url: 'https://cssclamp.com',
    description:
        'Free CSS clamp() generator for fluid typography and spacing. Set a minimum and maximum size, preview it at any screen width and copy the CSS or Tailwind value.',
    github: 'https://github.com/Willem-Jaap/cssclamp',
    author: { name: 'Willem-Jaap', url: 'https://willemjaap.com' },
};

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString();

interface PageMetadata {
    title: string;
    description: string;
    path: string;
    absoluteTitle?: boolean;
}

/** Title, description, canonical URL and social cards for a page, kept in sync. */
export const pageMetadata = ({ title, description, path, absoluteTitle = false }: PageMetadata) => {
    const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

    // Setting openGraph on a page replaces the inherited image, so add it explicitly.
    const images = [{ url: '/opengraph-image', width: 1200, height: 630, alt: socialTitle }];

    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: socialTitle,
            description,
            url: path,
            siteName: site.name,
            type: 'website' as const,
            images,
        },
        twitter: {
            card: 'summary_large_image' as const,
            title: socialTitle,
            description,
            images: images.map(image => image.url),
        },
    };
};
