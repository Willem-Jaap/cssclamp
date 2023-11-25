import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row gap-2 justify-between border border-neutral-800 rounded-xl px-8 py-4">
            <span className="text-neutral-400">© CSS Clamp - {new Date().getFullYear()} </span>
            <span className="text-neutral-400">
                <Link
                    href="https://github.com/Willem-Jaap/cssclamp"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-neutral-200">
                    Github
                </Link>
                <span className="px-6">|</span>
                Crafted with <span>💖</span> by{' '}
                <Link
                    href="https://willemjaap.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-neutral-200">
                    Willem-Jaap
                </Link>
            </span>
        </footer>
    );
};

export default Footer;
