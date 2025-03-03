"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

export default function TestSupabase() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getTasks = async () => {
        setError(null);
        console.log("Fetching tasks...");
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        
        try {
            const { data, error } = await supabase.from("tasks").select("*");
            console.log("data:", data);
            
            if (error) {
                console.error("Error fetching tasks:", error);
                setError(error.message);
                return;
            }
            
            console.log("Received data:", data);
            if (data) {
                console.log("Number of tasks:", data.length);
                console.log("First task (if exists):", data[0]);
            }
            setTasks(data || []);
        } catch (e) {
            console.error("Exception occurred:", e);
            setError(e instanceof Error ? e.message : "Unknown error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Supabase Test
                </h1>
                
                <button
                    onClick={getTasks}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 transition-all duration-300"
                >
                    Get Tasks
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        エラー: {error}
                    </div>
                )}

                {tasks.length === 0 && !error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                        タスクが見つかりませんでした
                    </div>
                )}

                {tasks.length > 0 && (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                                        {task.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ID: {task.id}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-3">
                                    {task.description}
                                </p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    作成日時: {new Date(task.created_at).toLocaleString('ja-JP')}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
