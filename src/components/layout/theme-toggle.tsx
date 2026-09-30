'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
            }}
            aria-label="Toggle dark mode"
            className="flex size-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-canvas hover:text-neutral-950">
            {/* Both icons render on the server; CSS picks one, so there is no hydration flash. */}
            <SunIcon size={16} className="hidden dark:block" />
            <MoonIcon size={16} className="dark:hidden" />
        </button>
    );
};

export default ThemeToggle;
