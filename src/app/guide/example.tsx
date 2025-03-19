const Example = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="text-neutral-400">
                Using <code>max-width</code> of 1200px. When scaling down the viewport there is no
                difference in margin from 1200px and down.
            </div>
            <div className="relative h-full origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5 w-2/3 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
            <div className="relative mx-auto h-full w-[calc(66.6%+2rem)] origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 px-4 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
            <div className="relative mx-auto h-full w-1/3 origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 px-4 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
            <div className="text-neutral-400">
                Using <code>clamp</code> of 1200px. When scaling down the viewport there is a nice,
                fluid margin all the way down to the minimum viewport width.
            </div>
            <div className="relative h-full origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5 w-2/3 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
            <div className="relative mx-auto h-full w-[calc(66.6%+2rem)] origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 px-4 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5  w-3/4 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
            <div className="relative mx-auto h-full w-1/3 origin-top-left overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 px-4 pb-8 pt-12">
                <div className="absolute left-4 top-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="mx-auto h-5 border border-dashed border-neutral-400 bg-neutral-400 px-2 py-1 text-lg" />
            </div>
        </div>
    );
};

export default Example;
