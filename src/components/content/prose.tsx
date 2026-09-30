import { type ReactNode } from 'react';

import JsonLd from '~/components/content/json-ld';
import cn from '~/utils/cn';

import { absoluteUrl, site } from '~/lib/site';

interface Props {
    eyebrow: string;
    title: string;
    lede: ReactNode;
    children: ReactNode;
    className?: string;
    /** Adds TechArticle structured data for the page at this path. */
    article?: { path: string; description: string };
}

const Prose = ({ eyebrow, title, lede, children, className, article }: Props) => {
    return (
        <article className={cn('mx-auto w-full max-w-2xl py-16 md:py-24', className)}>
            <header className="mb-12 border-b border-b-line pb-10">
                <p className="text-sm font-medium text-primary-500">{eyebrow}</p>
                <h1 className="mt-3 text-4xl font-medium tracking-tight text-balance text-neutral-950">
                    {title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-pretty text-neutral-500">{lede}</p>
            </header>
            <div
                className={cn(
                    'prose max-w-none',
                    'prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-neutral-950',
                    'prose-h2:mt-14 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg',
                    'prose-p:leading-7 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-li:marker:text-neutral-300',
                    'prose-strong:font-medium prose-strong:text-neutral-950',
                    'prose-a:font-normal prose-a:text-neutral-950 prose-a:decoration-neutral-300 prose-a:underline-offset-4 hover:prose-a:decoration-neutral-950',
                    'prose-code:rounded-md prose-code:bg-canvas prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.8125em] prose-code:font-normal prose-code:text-neutral-800 prose-code:ring-1 prose-code:ring-line prose-code:before:content-none prose-code:after:content-none',
                    'prose-pre:rounded-lg prose-pre:bg-neutral-950 prose-pre:px-5 prose-pre:py-4 prose-pre:text-[0.8125rem] prose-pre:leading-relaxed prose-pre:scheme-fixed dark:prose-pre:ring-1 dark:prose-pre:ring-white/10',
                    '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-neutral-100 [&_pre_code]:ring-0',
                    'prose-hr:border-line',
                )}>
                {children}
            </div>
            {article && (
                <JsonLd
                    data={{
                        '@type': 'TechArticle',
                        'headline': title,
                        'description': article.description,
                        'url': absoluteUrl(article.path),
                        'inLanguage': 'en',
                        'author': { '@type': 'Person', ...site.author },
                        'publisher': {
                            '@type': 'Organization',
                            'name': site.name,
                            'url': site.url,
                        },
                    }}
                />
            )}
        </article>
    );
};

export default Prose;
