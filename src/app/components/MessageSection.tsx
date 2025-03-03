interface MessageSectionProps {
    message: string;
    messageStyle: React.CSSProperties;
}

export default function MessageSection({ message, messageStyle }: MessageSectionProps) {
    if (!message) return null;

    return (
        <div className="w-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transform transition-all hover:scale-[1.02]">
                <p style={messageStyle} className="text-center">{message}</p>
            </div>
        </div>
    );
} 