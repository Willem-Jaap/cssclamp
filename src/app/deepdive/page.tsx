import Link from 'next/link';

const Page = () => {
    return (
        <article className="mx-[clamp(0rem,-6.915rem+26.596vw,25rem)] prose mb-64 max-w-none prose-invert">
            <h1>Oops</h1>
            <p>
                I haven&apos;t written the deepdive yet. If you&apos;re interested in the technical
                details, check out the <Link href="/guide">guide</Link>, please check back later.
            </p>
        </article>
    );
};

export default Page;
