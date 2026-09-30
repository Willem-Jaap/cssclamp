import { Albert_Sans, JetBrains_Mono } from 'next/font/google';

const albertSansFont = Albert_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-albert-sans',
});

const jetBrainsMonoFont = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jetbrains-mono',
});

export { albertSansFont, jetBrainsMonoFont };
