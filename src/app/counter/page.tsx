"use client";

import Counter from "../components/Counter";
import Link from "next/link";
import { useState, useEffect } from "react";

// 初期カウント値の定義
const initialCountValues = {
    counter1: 5,
    counter2: 0,
    counter3: 0,
    counter4: 100,
    counter5: 1000
};

export default function CounterPage() {
    // 各カウンターの状態を管理
    const [counts, setCounts] = useState(initialCountValues);

    // ローカルストレージから状態を復元
    useEffect(() => {
        const savedCounts = localStorage.getItem('counterValues');
        if (savedCounts) {
            setCounts(JSON.parse(savedCounts));
        }
    }, []);

    // カウント更新関数
    const handleCountUpdate = (counterId: string, newCount: number) => {
        const newCounts = {
            ...counts,
            [counterId]: newCount
        };
        setCounts(newCounts);
        // ローカルストレージに保存
        localStorage.setItem('counterValues', JSON.stringify(newCounts));
    };

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
                                initialCount={counts.counter1}
                                onCountChange={(newCount) => handleCountUpdate('counter1', newCount)}
                            />
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="カウンター2号" 
                                buttonText="増やす"
                                messageColor="text-green-500"
                                initialCount={counts.counter2}
                                onCountChange={(newCount) => handleCountUpdate('counter2', newCount)}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="カウンター2号" 
                                buttonText="増やす"
                                messageColor="text-green-500"
                                initialCount={counts.counter3}
                                onCountChange={(newCount) => handleCountUpdate('counter3', newCount)}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="🌟 スペシャルカウンター" 
                                buttonText="⭐️ スコアアップ ⭐️"
                                messageColor="text-yellow-500"
                                initialCount={counts.counter4}
                                onCountChange={(newCount) => handleCountUpdate('counter4', newCount)}
                            />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                            <Counter 
                                message="レッドカウンター" 
                                buttonText="🔥 パワーアップ 🔥"
                                messageColor="text-red-500"
                                initialCount={counts.counter5}
                                onCountChange={(newCount) => handleCountUpdate('counter5', newCount)}
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
