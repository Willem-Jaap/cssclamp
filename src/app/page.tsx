'use client';

import { FormProvider } from 'react-hook-form';

import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';
import useSettings from '~/hooks/useSettings';

const Page = () => {
    const methods = useSettings();
    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <div className="flex-1 rounded-xl border border-neutral-800">
                    <Preview />
                </div>
                <div className="flex h-[calc(100vh-16rem)] flex-[0.4] flex-col overflow-hidden rounded-xl border border-neutral-800 md:max-w-sm">
                    <Actions />
                </div>
            </div>
        </FormProvider>
    );
};

export default Page;
