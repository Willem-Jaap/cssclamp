import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-t-neutral-200">
            <div className="flex justify-between px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] pt-16">
                <p className="max-w-lg text-neutral-700">
                    A tool to help generate responsive clamp() expressions for padding, margin, or
                    font size. See a live preview, copy the code, and take control of your
                    responsive layouts.
                </p>
                <div>
                    <Link
                        href="https://github.com/Willem-Jaap/cssclamp"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-neutral-200">
                        Github
                    </Link>
                </div>
            </div>
            <span className="mt-24 block translate-y-6 whitespace-nowrap px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] text-[8rem] font-medium leading-none">
                CSS Clamp
            </span>
            <div className="relative border-t border-t-neutral-200 bg-neutral-50 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] py-4">
                <span className="text-neutral-400">© CSS Clamp - {new Date().getFullYear()} </span>

                <span className="text-neutral-400">
                    Crafted with <span>💖</span> by{' '}
                    <Link
                        href="https://willemjaap.com"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-neutral-200">
                        Willem-Jaap
                    </Link>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
