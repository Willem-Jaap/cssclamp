import Link from 'next/link';

import Logo from '~/components/misc/logo';

const Header = () => {
    return (
        <header className="flex border border-neutral-800 rounded-xl px-8 py-4">
            <Link href="/">
                <Logo />
            </Link>
        </header>
    );
};

export default Header;
