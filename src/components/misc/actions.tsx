'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export type Mode = 'rem' | 'px' | 'tailwind';

const Actions = () => {
    const [mode, setMode] = useState<Mode>('rem');

    return (
        <>
            <div className="p-4 flex justify-between items-center gap-4">
                <span className="whitespace-nowrap">Actions</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary">Mode: {mode}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Sizing mode</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={mode}
                            onValueChange={mode => setMode(mode as Mode)}>
                            <DropdownMenuRadioItem value="rem">
                                rem<sup className="text-neutral-400 ml-2">16px</sup>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="px">px</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="tailwind">
                                tailwind
                                <sup className="text-neutral-400 ml-2">
                                    <Link
                                        href="https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale"
                                        target="_blank"
                                        rel="noreferrer">
                                        see reference ↗
                                    </Link>
                                </sup>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="p-4 text-sm">
                Current implementation: clamp(1rem, -1.3333rem + 7.7778vw, 8rem)
            </div>
        </>
    );
};

export default Actions;
