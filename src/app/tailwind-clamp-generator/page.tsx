import type { Metadata } from 'next';
import Link from 'next/link';

import { type FaqItem } from '~/components/content/faq';
import GeneratorPage from '~/components/content/generator-page';

import { pageMetadata } from '~/lib/site';

const description =
    'Generate fluid Tailwind CSS font sizes and spacing with clamp(). Copy a v4 @theme token, a v3 tailwind.config.js entry or an arbitrary value class.';

const faq: FaqItem[] = [
    {
        question: 'Which output should I pick?',
        answer: 'Pick Tailwind v4 if your project configures Tailwind in CSS with @theme, Tailwind v3 if it has a tailwind.config.js, and Class for a one-off value you only use once. Values you reuse belong in the theme.',
    },
    {
        question: 'How do I rename the generated token?',
        answer: 'Change the word fluid in the variable or config key to any name you like. In Tailwind v4, --text-display creates text-display and --spacing-gutter creates p-gutter, gap-gutter and every other spacing utility.',
    },
    {
        question: 'Can I make the default Tailwind sizes fluid?',
        answer: 'Yes. In Tailwind v4, redefine an existing token, for example --text-4xl, inside @theme with a clamp() value. Every text-4xl in your project then becomes fluid without touching your markup.',
    },
    {
        question: 'Why does the class output have no spaces?',
        answer: 'Tailwind class names cannot contain spaces, so the arbitrary value is written without them. Tailwind adds the spaces around + and - back when it generates the CSS, so the result is a valid clamp().',
    },
];

const Page = () => {
    return (
        <GeneratorPage
            title="Tailwind CSS clamp() generator"
            lede="Fluid font sizes and spacing as Tailwind theme tokens or classes."
            description={description}
            path="/tailwind-clamp-generator"
            defaults={{
                previewMode: 'text',
                output: 'tailwind-v4',
                minimumValue: 1.5,
                maximumValue: 3,
            }}
            faq={faq}>
            <section>
                <h2>Fluid values for Tailwind CSS</h2>
                <p>
                    Tailwind has no fluid utilities built in, but it accepts any clamp() value as a
                    theme token or an arbitrary value. This generator writes that value for you in
                    the format your project uses. Switch between Text and Container to get a font
                    size or a spacing token, and pick the output under the result.
                </p>
            </section>
            <section>
                <h2>The three output formats</h2>
                <ul>
                    <li>
                        <strong>Tailwind v4</strong> gives you an <code>@theme</code> block. Paste
                        it into the CSS file that imports Tailwind.
                    </li>
                    <li>
                        <strong>Tailwind v3</strong> gives you an entry for{' '}
                        <code>theme.extend</code> in <code>tailwind.config.js</code>.
                    </li>
                    <li>
                        <strong>Class</strong> gives you an arbitrary value like{' '}
                        <code>text-[clamp(1.5rem,1.125rem+1.563vw,3rem)]</code> to use straight in
                        your markup.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Build a fluid design system</h2>
                <p>
                    Generate one value per step of your type scale and one or two spacing values,
                    all with the same viewport range, and keep them together in your theme. The{' '}
                    <Link href="/tailwind">Tailwind CSS clamp() guide</Link> walks through a
                    complete setup, and the{' '}
                    <Link href="/fluid-type-scale-generator">fluid type scale generator</Link>{' '}
                    creates a whole scale at once.
                </p>
            </section>
        </GeneratorPage>
    );
};

export const metadata: Metadata = pageMetadata({
    title: 'Tailwind CSS Clamp Generator – Fluid Font Sizes & Spacing',
    description,
    path: '/tailwind-clamp-generator',
});

export default Page;
