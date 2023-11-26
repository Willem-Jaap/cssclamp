import Actions from '~/components/misc/actions';
import Preview from '~/components/misc/preview';

const Page = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="border border-neutral-800 rounded-xl flex-1">
                <Preview />
            </div>
            <div className="flex flex-col border border-neutral-800 rounded-xl h-[calc(100vh-16rem)] md:max-w-sm flex-[0.4] overflow-hidden">
                <Actions />
            </div>
        </div>
    );
};

export default Page;
