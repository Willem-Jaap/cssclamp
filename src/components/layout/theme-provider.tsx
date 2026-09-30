'use client';

import { type PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
        </NextThemesProvider>
    );
};

export default ThemeProvider;
