import Link from 'next/link';

import FooterText from '~/components/layout/footer-text';

const Footer = () => {
    return (
        <footer
            id="footer"
            className="mt-12 max-w-[100vw] overflow-hidden border-t border-t-neutral-200">
            <div className="grid grid-cols-15 gap-6 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] pt-16">
                <p className="col-span-5 max-w-lg text-neutral-700">
                    A tool to help generate responsive clamp() expressions for padding, margin, or
                    font size. See a live preview, copy the code, and take control of your
                    responsive layouts.
                </p>
                <div className="col-span-6 col-end-[-1] flex justify-between">
                    <div className="flex flex-col gap-6">
                        <div className="text-lg font-medium">Quicklinks</div>
                        <ul className="flex flex-col gap-2 font-medium text-neutral-500">
                            <li>
                                <Link
                                    href="/"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    Tool
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/guide"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    How to use CSS Clamp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/examples"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    Examples
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6 text-right">
                        <div className="text-lg font-medium">Connect</div>
                        <ul className="flex flex-col gap-2 font-medium text-neutral-500">
                            <li>
                                <Link
                                    href="https://twitter.com/WillemJaap_"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://github.com/Willem-Jaap"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    Github
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://pixelperfect.agency"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline-offset-2 hover:text-neutral-400 hover:underline">
                                    Pixel Perfect Agency
                                </Link>
                            </li>
                        </ul>
                    </div>
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
