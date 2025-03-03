"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

export default function TodoPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getTasks = async () => {
        setError(null);
        try {
            const { data, error } = await supabase
                .from("tasks")
                .select("*")
                .order('created_at', { ascending: false });

            if (error) {
                setError(error.message);
                return;
            }
            setTasks(data || []);
        } catch (e) {
            setError(e instanceof Error ? e.message : "不明なエラーが発生しました");
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!newTask.title.trim()) {
            alert("タイトルを入力してください");
            return;
        }

        try {
            const { error } = await supabase
                .from("tasks")
                .insert([{
                    title: newTask.title,
                    description: newTask.description
                }]);

            if (error) {
                console.error("Error adding task:", error);
                alert(`タスクの追加中にエラーが発生しました: ${error.message}`);
                setError(error.message);
                return;
            }

            setNewTask({ title: "", description: "" });
            getTasks();
        } catch (e) {
            console.error("Exception occurred:", e);
            alert(`不明なエラーが発生しました: ${e instanceof Error ? e.message : "不明なエラー"}`);
            setError(e instanceof Error ? e.message : "不明なエラーが発生しました");
        }
    };

    const updateTask = async (task: Task) => {
        setError(null);
        try {
            const { error } = await supabase
                .from("tasks")
                .update({ title: task.title, description: task.description })
                .eq('id', task.id);

            if (error) {
                console.error("Error updating task:", error);
                alert(`タスクの更新中にエラーが発生しました: ${error.message}`);
                setError(error.message);
                return;
            }

            setEditingTask(null);
            getTasks();
        } catch (e) {
            console.error("Exception occurred:", e);
            alert(`不明なエラーが発生しました: ${e instanceof Error ? e.message : "不明なエラー"}`);
            setError(e instanceof Error ? e.message : "不明なエラーが発生しました");
        }
    };

    const deleteTask = async (taskId: number) => {
        setError(null);
        try {
            const { error } = await supabase
                .from("tasks")
                .delete()
                .eq('id', taskId);

            if (error) {
                console.error("Error deleting task:", error);
                alert(`タスクの削除中にエラーが発生しました: ${error.message}`);
                setError(error.message);
                return;
            }

            getTasks();
        } catch (e) {
            console.error("Exception occurred:", e);
            alert(`不明なエラーが発生しました: ${e instanceof Error ? e.message : "不明なエラー"}`);
            setError(e instanceof Error ? e.message : "不明なエラーが発生しました");
        }
    };

    const handleDelete = (taskId: number) => {
        if (window.confirm("このタスクを削除してもよろしいですか？")) {
            deleteTask(taskId);
        }
    };

    // 初回マウント時にタスクを取得
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Todoリスト
                </h1>

                <form onSubmit={addTask} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
                            タイトル
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="タスクのタイトルを入力"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">
                            詳細
                        </label>
                        <textarea
                            id="description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="タスクの詳細を入力"
                            rows={3}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                        タスクを追加
                    </button>
                </form>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        エラー: {error}
                    </div>
                )}

                {tasks.length === 0 && !error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                        タスクが登録されていません
                    </div>
                )}

                {tasks.length > 0 && (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-between items-start"
                            >
                                <div className="flex-1">
                                    {editingTask?.id === task.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editingTask.title}
                                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                            />
                                            <textarea
                                                value={editingTask.description}
                                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                rows={3}
                                            />
                                            <button onClick={() => updateTask(editingTask)} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                                更新
                                            </button>
                                            <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                                                キャンセル
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3
                                                className="font-bold text-gray-900 dark:text-white text-xl cursor-pointer"
                                                onClick={() => setEditingTask(task)}
                                            >
                                                {task.title}
                                            </h3>
                                            <p
                                                className="text-gray-600 dark:text-gray-300 mb-3 cursor-pointer"
                                                onClick={() => setEditingTask(task)}
                                            >
                                                {task.description}
                                            </p>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                作成日時: {new Date(task.created_at).toLocaleString('ja-JP')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded-full">
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
