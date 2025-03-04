import Image from 'next/image';

interface ImageSectionProps {
    staticImageSrc: string;
    apiImage: string | null;
}

export default function ImageSection({ staticImageSrc, apiImage }: ImageSectionProps) {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center">
                    <Image
                        src={staticImageSrc}
                        alt="表示画像"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
                        priority
                    />
                </div>
            </div>
            {apiImage && (
                <div className="relative group mt-4">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center">
                        <img
                            src={apiImage}
                            alt="API経由の画像"
                            className="rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-[1.02] w-[400px] h-[300px] object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
} 