export default function InfoList() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full">
            <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700 dark:text-gray-300">
                    Hello Next.js!!{" "}
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-mono text-sm">
                        src/app/page.tsx
                    </code>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                    Save and see your changes instantly.
                </li>
            </ol>
        </div>
    );
} 