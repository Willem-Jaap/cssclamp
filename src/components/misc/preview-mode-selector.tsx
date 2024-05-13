'use client';

import Icon from '~/components/utils/icon';
import useSettings from '~/hooks/useSettings';
import cn from '~/utils/cn';

const PreviewModeSelector = () => {
    const { watch, setValue } = useSettings();
    return (
        <div className="flex overflow-hidden rounded-xl">
            <button
                onClick={() => setValue('previewMode', 'container')}
                className={cn(
                    'flex h-10 items-center gap-4 whitespace-nowrap rounded-l-xl px-4 py-2 font-medium transition-colors duration-200',
                    {
                        'border border-r-0 border-neutral-950 bg-neutral-950 text-neutral-50 hover:bg-neutral-900':
                            watch('previewMode') === 'container',
                        'border border-r-0 border-neutral-100 bg-neutral-50 text-neutral-950 hover:bg-neutral-100/50':
                            watch('previewMode') !== 'container',
                    },
                )}>
                <Icon
                    name={`check-box-outline-blank-${
                        watch('previewMode') === 'container' ? 'light' : 'dark'
                    }`}
                />
                Element Sizing Mode
            </button>
            <button
                onClick={() => setValue('previewMode', 'text')}
                className={cn(
                    'flex h-10 items-center gap-4 whitespace-nowrap rounded-r-xl px-4 py-2 font-medium transition-colors duration-200',
                    {
                        'border border-l-0 border-neutral-100 bg-neutral-50 text-neutral-950 hover:bg-neutral-100/50':
                            watch('previewMode') !== 'text',
                        'border border-l-0 border-neutral-950 bg-neutral-950 text-neutral-50 hover:bg-neutral-900':
                            watch('previewMode') === 'text',
                    },
                )}>
                <Icon
                    name={`typography-${watch('previewMode') === 'container' ? 'dark' : 'light'}`}
                />
                Font Resizing Mode
            </button>
        </div>
    );
};

export default PreviewModeSelector;
