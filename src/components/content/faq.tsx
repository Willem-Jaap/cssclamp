import { ChevronDownIcon } from 'lucide-react';

import JsonLd from '~/components/content/json-ld';

export interface FaqItem {
    question: string;
    answer: string;
}

interface Props {
    title?: string;
    items: FaqItem[];
}

// Renders an accordion and the matching FAQPage structured data from the same source,
// so the visible answers and the schema can never drift apart.
const Faq = ({ title = 'Frequently asked questions', items }: Props) => {
    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium tracking-tight text-neutral-950">{title}</h2>
            <div className="divide-y divide-line rounded-xl border border-line">
                {items.map(item => (
                    <details
                        key={item.question}
                        className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-neutral-950">
                            {item.question}
                            <ChevronDownIcon
                                size={16}
                                className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180"
                            />
                        </summary>
                        <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-neutral-600">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
            <JsonLd
                data={{
                    '@type': 'FAQPage',
                    'mainEntity': items.map(item => ({
                        '@type': 'Question',
                        'name': item.question,
                        'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
                    })),
                }}
            />
        </section>
    );
};

export default Faq;
