import Link from 'next/link';

import Logo from '~/components/misc/logo';

const Header = () => {
    return (
        <header className="fixed top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-b-neutral-200 bg-neutral-50 px-[clamp(1rem,_0.25rem_+_3.125vw,_4rem)] py-4">
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <menu className="flex">
                    <li>
                        <Link
                            href="/guide"
                            className="flex h-10 items-center gap-4 whitespace-nowrap rounded-xl bg-neutral-950 px-4 py-2 font-medium text-neutral-50 transition-colors duration-200 hover:bg-neutral-900">
                            <svg
                                width="12"
                                height="14"
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 13.6667C1.44444 13.6667 0.972222 13.4722 0.583333 13.0833C0.194444 12.6944 0 12.2222 0 11.6667V2.33333C0 1.77777 0.194444 1.30555 0.583333 0.916662C0.972222 0.527773 1.44444 0.333328 2 0.333328H9.33333V11H2C1.81111 11 1.65278 11.0639 1.525 11.1917C1.39722 11.3194 1.33333 11.4778 1.33333 11.6667C1.33333 11.8555 1.39722 12.0139 1.525 12.1417C1.65278 12.2694 1.81111 12.3333 2 12.3333H10.6667V1.66666H12V13.6667H2ZM4 9.66666H8V1.66666H4V9.66666ZM2.66667 9.66666V1.66666H2C1.81111 1.66666 1.65278 1.73055 1.525 1.85833C1.39722 1.98611 1.33333 2.14444 1.33333 2.33333V9.78333C1.44444 9.74999 1.55278 9.72222 1.65833 9.69999C1.76389 9.67777 1.87778 9.66666 2 9.66666H2.66667Z"
                                    fill="#F1F3F5"
                                />
                            </svg>
                            <span className="max-sm:sr-only">How to use CSS Clamp</span>
                        </Link>
                    </li>
                </menu>
            </nav>
        </header>
    );
};

export default Header;
