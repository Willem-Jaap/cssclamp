import Link from 'next/link';

import Logo from '~/components/misc/logo';

const Header = () => {
    return (
        <header className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 py-4 pl-8 pr-4">
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <menu className="flex">
                    <li>
                        <Link
                            href="/guide"
                            className="rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-neutral-800">
                            Guide
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/deepdive"
                            className="rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-neutral-800">
                            Deepdive
                        </Link>
                    </li>
                </menu>
            </nav>
        </header>
    );
};

export default Header;
