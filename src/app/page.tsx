'use client';

import { FormProvider } from 'react-hook-form';

import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';
import PreviewModeSelector from '~/components/misc/preview-mode-selector';
import { useSettingsProvider } from '~/hooks/useSettings';

const Page = () => {
    const methods = useSettingsProvider();

    return (
        <FormProvider {...methods}>
            <div>
                <h1 className="mt-8 text-4xl font-medium text-neutral-900">CSS Clamp Generator</h1>
                <p className="mt-2 max-w-xl text-lg text-neutral-600">
                    A tool to help you visualize, understand and generate CSS Clamp() values
                </p>
                <div className="mt-8">
                    <PreviewModeSelector />
                </div>
            </div>

            <div className="flex grid-cols-15 gap-6 md:grid">
                <div className="col-span-10 flex-1 rounded-xl border border-neutral-100">
                    <Preview />
                </div>
                <div className="col-span-5 flex min-h-[70vh] w-full flex-col overflow-hidden overflow-y-auto rounded-xl border border-neutral-100">
                    <Actions />
                </div>
            </div>
        </FormProvider>
    );
};

export default Page;
