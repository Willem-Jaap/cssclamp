import Link from 'next/link';

const Page = () => {
    return (
        <article className="prose prose-invert mx-[clamp(0rem,_-6.915rem_+_26.596vw,_25rem)] mb-64 max-w-none">
            <h1>Oops</h1>
            <p>
                I haven&apos;t written the deepdive yet. If you&apos;re interested in the technical
                details, check out the <Link href="/guide">guide</Link>, please check back later.
            </p>
        </article>
    );
};

export default Page;
