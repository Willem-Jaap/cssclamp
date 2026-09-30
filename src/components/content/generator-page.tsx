import { type ReactNode } from 'react';

import Faq, { type FaqItem } from '~/components/content/faq';
import JsonLd from '~/components/content/json-ld';
import Generator from '~/components/misc/generator';
import { type Settings } from '~/hooks/useSettings';
import cn from '~/utils/cn';

import { absoluteUrl, site } from '~/lib/site';

interface Props {
    title: string;
    lede: string;
    description: string;
    path: string;
    defaults?: Partial<Settings>;
    /** Renders a different tool instead of the clamp() generator. */
    tool?: ReactNode;
    faq: FaqItem[];
    children: ReactNode;
}

// A generator preset for one kind of value, followed by a short guide and FAQ.
const GeneratorPage = ({
    title,
    lede,
    description,
    path,
    defaults,
    tool,
    faq,
    children,
}: Props) => {
    return (
        <>
            <div
                className={cn(
                    'flex flex-col gap-4 py-4',
                    !tool && 'h-[calc(100dvh-4rem)] min-h-[40rem]',
                )}>
                <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h1 className="text-xl font-medium tracking-tight text-neutral-950">{title}</h1>
                    <p className="text-sm text-neutral-500">{lede}</p>
                </header>
                {tool ?? <Generator defaults={defaults} />}
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 py-24">
                <div className="flex flex-col gap-10 [&_a]:text-neutral-950 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-4 hover:[&_a]:decoration-neutral-950 [&_code]:rounded-md [&_code]:bg-canvas [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125em] [&_code]:text-neutral-800 [&_code]:ring-1 [&_code]:ring-line [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-neutral-950 [&_li]:leading-relaxed [&_li]:text-neutral-600 [&_p]:leading-relaxed [&_p]:text-neutral-600 [&_section]:flex [&_section]:flex-col [&_section]:gap-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
                    {children}
                </div>
                <Faq items={faq} />
            </div>

            <JsonLd
                data={{
                    '@type': 'WebApplication',
                    'name': title,
                    'url': absoluteUrl(path),
                    description,
                    'applicationCategory': 'DeveloperApplication',
                    'operatingSystem': 'Any',
                    'isAccessibleForFree': true,
                    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
                    'author': { '@type': 'Person', ...site.author },
                }}
            />
        </>
    );
};

export default GeneratorPage;
