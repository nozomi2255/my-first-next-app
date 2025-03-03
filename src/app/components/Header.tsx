interface HeaderProps {
    title: string;
    subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <div className="text-center space-y-4 w-full">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
                {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                {subtitle}
            </p>
        </div>
    );
} 