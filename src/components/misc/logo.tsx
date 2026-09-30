import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <Image
                src="/assets/images/cssclamp-logo.png"
                alt="CSS Clamp Logo"
                width={32}
                height={32}
            />
            <span className="text-lg font-medium whitespace-nowrap">CSS Clamp</span>
        </div>
    );
};

export default Logo;
