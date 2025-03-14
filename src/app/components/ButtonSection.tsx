interface ButtonSectionProps {
    onFetchMessage: () => Promise<void>;
}

export default function ButtonSection({ onFetchMessage }: ButtonSectionProps) {
    return (
        <div className="flex gap-4 flex-wrap justify-center">
            <button
                onClick={onFetchMessage}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                APIメッセージを取得
            </button>
        </div>
    );
} 