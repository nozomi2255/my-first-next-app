import Counter from "../components/Counter";
import Link from "next/link";

export default function CounterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">
                <main className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="Hello Counter!" 
                                buttonText="Count Up"
                                messageColor="text-purple-500"
                                initialCount={5}
                            />
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="カウンター2号" 
                                buttonText="増やす"
                                messageColor="text-green-500"
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="カウンター2号" 
                                buttonText="増やす"
                                messageColor="text-green-500"
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="🌟 スペシャルカウンター" 
                                buttonText="⭐️ スコアアップ ⭐️"
                                messageColor="text-yellow-500"
                                initialCount={100}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="レッドカウンター" 
                                buttonText="🔥 パワーアップ 🔥"
                                messageColor="text-red-500"
                                initialCount={1000}
                            />
                        </div>
                    </div>
                    
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        メインページへ戻る
                    </Link>
                </main>
            </div>
        </div>
    );
}
