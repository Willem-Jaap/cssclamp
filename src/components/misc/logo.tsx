import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex items-center gap-4">
            <Image
                src="/assets/images/cssclamp-logo.png"
                alt="CSS Clamp Logo"
                width={40}
                height={40}
            />
            <span className="text-lg font-medium">CSS Clamp</span>
        </div>
    );
};

export default Logo;
