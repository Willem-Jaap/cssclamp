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
            <div className={cn('flex min-h-0 flex-1 grid-cols-15 gap-4 md:grid', className)}>
                <div className="col-span-10 min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-white">
                    <Preview />
                </div>
                <div className="col-span-5 flex min-h-0 w-full flex-col overflow-y-auto rounded-xl border border-line bg-white">
                    <Actions />
                </div>
            </div>
        </FormProvider>
    );
};

export default Generator;
