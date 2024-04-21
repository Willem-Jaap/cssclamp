import Link from 'next/link';

import Example from '~/app/guide/example';

const Page = () => {
    return (
        <article className="prose mx-[clamp(0rem,_-6.915rem_+_26.596vw,_25rem)] my-24 max-w-none">
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
                <code>clamp(1rem, 0.4rem + 3vw, 4rem)</code>. When resizing the viewport the clamped
                value will be at least 1 rem and at most 4 rem. Between viewport widths of 20 rem
                and 120 rem the value will be clamped (fluid) between 1 rem and 4 rem linearly.
            </p>
            <h2>To clamp or not to clamp?</h2>
            <p>
                There are a few things to consider when using <code>clamp()</code>, first lets take
                a look at the drawbacks:
            </p>
            <ul>
                <li>
                    <b>Complexity & readability</b>: It is quite hard to read and understand what
                    the value will be at a given viewport width in an instant.
                </li>
                <li>
                    <b>Lack of granularity</b>: For highly granular control over your layout and
                    spacing you might want to use manually defined specific values & media queries.
                </li>
                <li>
                    <b>Potential performance impact</b>: While the performance impact of using clamp
                    is generally negligible, extremely complex layouts or a large number of elements
                    with clamp values might lead to a slight decrease in performance, especially
                    when resizing the viewport. Always consider performance implications when
                    building for less powerful devices.
                </li>
            </ul>
            <p>And the benefits:</p>
            <ul>
                <li>
                    <b>Fluidity</b>: Clamp allows you to create fluid layouts and spacing that scale
                    with the viewport width. This is especially useful for typography and spacing
                    because there are no akward spots where the media query just doesn&apos;t quite
                    fit.
                </li>
                <li>
                    <b>Less code</b>: Using clamp can reduce the amount of code needed for creating
                    responsive designs.
                </li>
            </ul>
            <h2>Real world example</h2>
            <Example />
        </article>
    );
};

export default Page;
