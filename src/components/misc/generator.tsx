'use client';

import { FormProvider } from 'react-hook-form';

import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';
import { useSettingsProvider, type Settings } from '~/hooks/useSettings';
import cn from '~/utils/cn';

interface Props {
    defaults?: Partial<Settings>;
    className?: string;
}

const Generator = ({ defaults, className }: Props) => {
    const methods = useSettingsProvider(defaults);

    return (
        <FormProvider {...methods}>
            <div
                className={cn(
                    'flex min-h-0 flex-1 flex-col gap-4 lg:grid lg:grid-cols-15',
                    className,
                )}>
                <div className="h-[28rem] shrink-0 overflow-hidden rounded-xl border border-line bg-white lg:col-span-10 lg:h-auto lg:min-h-0">
                    <Preview />
                </div>
                <div className="flex w-full flex-col rounded-xl border border-line bg-white lg:col-span-5 lg:min-h-0 lg:overflow-y-auto">
                    <Actions />
                </div>
            </div>
        </FormProvider>
    );
};

export default Generator;
