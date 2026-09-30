'use client';

import { FormProvider } from 'react-hook-form';

import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';
import { useSettingsProvider } from '~/hooks/useSettings';

const Page = () => {
    const methods = useSettingsProvider();

    return (
        <FormProvider {...methods}>
            <div className="flex h-[calc(100dvh-4rem)] min-h-[36rem] flex-col gap-4 py-4">
                <h1 className="sr-only">CSS Clamp Generator</h1>
                <div className="flex min-h-0 flex-1 grid-cols-15 gap-4 md:grid">
                    <div className="col-span-10 min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-white">
                        <Preview />
                    </div>
                    <div className="col-span-5 flex min-h-0 w-full flex-col overflow-y-auto rounded-xl border border-line bg-white">
                        <Actions />
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default Page;
