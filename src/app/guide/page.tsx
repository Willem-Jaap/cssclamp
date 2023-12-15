import React from 'react';
import Link from 'next/link';

// A guide on CSS clamp

const Page = () => {
    return (
        <article className="prose prose-invert">
            <h1>CSS Clamp Guide</h1>
            <p>
                <code>clamp()</code>is a CSS function that allows you to clamp a value between a
                minimum and maximum value. It is a great tool for spacing and typography and very
                underused in my opinion. If you&apos;re interested in the technical details, check
                out the <Link href="/deepdive">deepdive</Link>,{' '}
                <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp"
                    target="_blank"
                    rel="noreferrer">
                    MDN docs
                </Link>{' '}
                and the{' '}
                <Link
                    href="https://www.w3.org/TR/css-values-4/#math-function"
                    target="_blank"
                    rel="noreferrer">
                    W3C spec
                </Link>
                .
            </p>
            <p>A short overview of the syntax:</p>
            <pre>
                <code>clamp(minimum, preferred, maximum)</code>
            </pre>
            <p>
                Lets take the following clamp as an example:{' '}
                <code>clamp(clamp(1rem, 0.4rem + 3vw, 4rem) )</code>. When resizing the viewport the
                clamped value will be at least 1 rem and at most 4 rem. Between viewport widths of
                20 rem and 120 rem the value will be clamped (fluid) between 1 rem and 4 rem
                linearly.
            </p>
        </article>
    );
};

export default Page;
