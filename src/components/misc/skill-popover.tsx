'use client';

import { type ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import CopyButton from '~/components/ui/copy-button';

const INSTALL_COMMAND = 'npx skills add Willem-Jaap/cssclamp';

interface Props {
    children: ReactNode;
    align?: 'start' | 'center' | 'end';
}

const SkillPopover = ({ children, align = 'end' }: Props) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>{children}</Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    align={align}
                    sideOffset={8}
                    collisionPadding={16}
                    className="z-50 flex w-80 flex-col gap-3 rounded-xl border border-line bg-white p-4 text-neutral-950 shadow-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
                    <div>
                        <p className="text-sm font-medium">CSS clamp agent skill</p>
                        <p className="mt-1 text-sm text-neutral-500">
                            Teach your coding agent to write correct fluid clamp() values. Works
                            with Claude Code, Cursor, Codex and more.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-neutral-950 py-1 pr-1 pl-3 scheme-fixed dark:ring-1 dark:ring-white/10">
                        <code className="flex-1 truncate font-mono text-xs text-neutral-100">
                            {INSTALL_COMMAND}
                        </code>
                        <CopyButton
                            value={INSTALL_COMMAND}
                            label="Copy install command"
                            className="text-neutral-400 hover:bg-white/10 hover:text-neutral-50"
                        />
                    </div>
                    <Link
                        href="https://github.com/Willem-Jaap/cssclamp/tree/master/skills/css-clamp"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 self-start text-xs text-neutral-500 transition-colors hover:text-neutral-950">
                        View the skill on GitHub
                        <ArrowUpRightIcon size={12} />
                    </Link>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default SkillPopover;
