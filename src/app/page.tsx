'use client';

import { FormProvider } from 'react-hook-form';

import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';
import { useSettingsProvider } from '~/hooks/useSettings';

const Page = () => {
    const methods = useSettingsProvider();

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <div className="flex-1 rounded-xl border border-neutral-200">
                    <Preview />
                </div>
                <div className="flex h-[calc(100vh-16rem)] flex-[0.4] flex-col overflow-hidden overflow-y-auto rounded-xl border border-neutral-200 md:max-w-sm">
                    <Actions />
                </div>
            </div>
        </FormProvider>
    );
};

export default Page;
