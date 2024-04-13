import Link from 'next/link';

import FooterText from '~/components/layout/footer-text';

const Footer = () => {
    return (
        <footer
            id="footer"
            className="mt-12 max-w-[100vw] overflow-hidden border-t border-t-neutral-200">
            <div className="grid-cols-15 grid gap-6 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] pt-16">
                <p className="col-span-5 max-w-lg text-neutral-700">
                    A tool to help generate responsive clamp() expressions for padding, margin, or
                    font size. See a live preview, copy the code, and take control of your
                    responsive layouts.
                </p>
                <div className="col-span-6 col-end-[-1]">
                    <Link
                        href="https://github.com/Willem-Jaap/cssclamp"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-neutral-200">
                        Github
                    </Link>
                </div>
            </div>
            <FooterText />
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
