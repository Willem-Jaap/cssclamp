import Link from 'next/link';

import FooterLink from '~/components/layout/footer/footer-link';
import FooterText from '~/components/layout/footer/footer-text';

const Footer = () => {
    return (
        <footer
            id="footer"
            className="mt-12 max-w-[100vw] overflow-hidden border-t border-t-neutral-200">
            <div className="grid grid-cols-15 gap-x-6 gap-y-16 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] pt-16">
                <p className="col-span-5 max-w-lg text-neutral-700 max-sm:col-span-full">
                    A tool to help generate responsive clamp() expressions for padding, margin, or
                    font size. See a live preview, copy the code, and take control of your
                    responsive layouts.
                </p>
                <div className="col-span-6 col-end-[-1] flex justify-between max-sm:col-span-full">
                    <div className="flex flex-col gap-6">
                        <div className="text-lg font-medium">Quicklinks</div>
                        <ul className="flex flex-col gap-2 font-medium text-neutral-500">
                            <li>
                                <FooterLink href="/">Tool</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/guide">How to use CSS Clamp</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/examples">Examples</FooterLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6 text-right">
                        <div className="text-lg font-medium">Connect</div>
                        <ul className="flex flex-col gap-2 font-medium text-neutral-500">
                            <li>
                                <FooterLink
                                    href="https://twitter.com/WillemJaap_"
                                    target="_blank"
                                    rel="noreferrer">
                                    Twitter
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink
                                    href="https://github.com/Willem-Jaap"
                                    target="_blank"
                                    rel="noreferrer">
                                    Github
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink
                                    href="https://pixelperfect.agency"
                                    target="_blank"
                                    rel="noreferrer">
                                    Pixel Perfect Agency
                                </FooterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <FooterText />
            <div className="relative flex justify-between border-t border-t-neutral-200 bg-neutral-50 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] py-4 max-sm:flex-col sm:items-center">
                <span className="text-neutral-400">© CSS Clamp - {new Date().getFullYear()} </span>

                <div className="text-neutral-400">
                    Crafted with <span>💖</span> by{' '}
                    <Link
                        href="https://willemjaap.com"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-neutral-200">
                        Willem-Jaap
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
