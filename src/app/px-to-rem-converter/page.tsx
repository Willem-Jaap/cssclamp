import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';
import UnitConverter from '~/components/tools/unit-converter';

import { pageMetadata } from '~/lib/site';

const description =
    'Convert px to rem and rem to px with any root font size, and px to vw for any screen width. Includes a px to rem table for a 16px base.';

const table = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96];
const half = table.length / 2;

const faq: FaqItem[] = [
    {
        question: 'How do I convert px to rem?',
        answer: 'Divide the pixel value by the root font size. With the default root font size of 16px, 24px is 24 / 16 = 1.5rem. To go back, multiply: 1.5rem × 16 = 24px.',
    },
    {
        question: 'What is the default root font size?',
        answer: 'Every major browser uses 16px as the default font size, so 1rem is 16px unless the user or your CSS changes it. Users can raise the default in their browser settings, which is exactly why rem is useful: your layout follows their choice.',
    },
    {
        question: 'Should I set html { font-size: 62.5% }?',
        answer: 'That trick makes 1rem equal 10px so the maths is easier, but it forces you to reset the body font size and can confuse third-party components that expect 16px. Converting with a tool or a Sass or CSS function is usually the cleaner choice.',
    },
    {
        question: 'How do I convert px to vw?',
        answer: 'Divide the pixel value by the screen width and multiply by 100. On a 1440px screen, 48px is 48 / 1440 × 100 = 3.333vw. A vw value alone does not respect zoom or the user’s font size, so combine it with rem inside clamp() for font sizes.',
    },
    {
        question: 'When should I use rem instead of px?',
        answer: 'Use rem for font sizes and for spacing that should grow with the text, like padding around paragraphs. Pixels are fine for borders, shadows and other details that should stay sharp and fixed.',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="px to rem converter"
            lede="Convert between px, rem and vw with any base size."
            description={description}
            path="/px-to-rem-converter"
            tool={<UnitConverter />}
            faq={faq}>
            <section>
                <h2>px to rem conversion table</h2>
                <p>Common values with the default root font size of 16px.</p>
                <div className="overflow-hidden rounded-xl border border-line">
                    <table className="w-full text-left text-sm tabular-nums">
                        <thead className="bg-canvas text-neutral-500">
                            <tr>
                                <th className="px-4 py-2 font-medium">px</th>
                                <th className="px-4 py-2 font-medium">rem</th>
                                <th className="px-4 py-2 font-medium max-sm:hidden">px</th>
                                <th className="px-4 py-2 font-medium max-sm:hidden">rem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line font-mono text-neutral-700">
                            {Array.from({ length: half }, (_, row) => (
                                <tr key={row}>
                                    <td className="px-4 py-2">{table[row]}px</td>
                                    <td className="px-4 py-2">{table[row] / 16}rem</td>
                                    <td className="px-4 py-2 max-sm:hidden">
                                        {table[row + half]}px
                                    </td>
                                    <td className="px-4 py-2 max-sm:hidden">
                                        {table[row + half] / 16}rem
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section>
                <h2>Why convert to rem</h2>
                <p>
                    A rem is relative to the root font size. When a user raises their browser’s
                    default font size, everything sized in rem grows with it, while pixel values
                    stay the same. Designs are usually made in pixels, so converting is a daily task
                    when you turn a design into CSS.
                </p>
            </section>
            <section>
                <h2>From units to fluid values</h2>
                <p>
                    Once you have a mobile and a desktop size, you do not need to pick one. A
                    clamp() value grows from one to the other as the screen gets wider, and mixes
                    rem and vw so it still respects the user’s font size. Enter both sizes in the{' '}
                    <Link href="/">clamp() generator</Link>, or read{' '}
                    <Link href="/deepdive">the maths behind clamp()</Link> to see how rem and vw
                    combine.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'PX to REM Converter – Convert px, rem and vw',
    description,
    path: '/px-to-rem-converter',
});

export default Page;
