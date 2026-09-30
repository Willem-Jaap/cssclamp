'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import cn from '~/utils/cn';

interface Props {
    value: string;
    label?: string;
    className?: string;
}

const CopyButton = ({ value, label = 'Copy', className }: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : label}
            className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-md transition-colors',
                className,
            )}>
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </button>
    );
};

export default CopyButton;
