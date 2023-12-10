import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const satoshiFont = localFont({
    src: 'Satoshi.woff2',
    display: 'swap',
    variable: '--font-satoshi',
});
const robotoMonoFont = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
});

export { satoshiFont, robotoMonoFont };
