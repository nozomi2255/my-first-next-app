'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});
  const [apiImage, setApiImage] = useState<string | null>(null);

  const fetchMessage = async () => {
    try {
      const response = await fetch('/api/hello', {
        method: 'POST'
      });
      const data = await response.json();
      setMessage(data.message);
      setMessageStyle(data.style);
    } catch (error) {
      console.error('APIエラー:', error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await fetch('/api/hello', {
        method: 'GET'
      });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setApiImage(imageUrl);
    } catch (error) {
      console.error('画像取得エラー:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <main className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
          {/* ヘッダーセクション */}
          <div className="text-center space-y-4 w-full">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
              Hello Next.js!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Welcome to your modern Next.js application
            </p>
          </div>

          {/* APIメッセージセクション */}
          <div className="w-full">
            {message && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transform transition-all hover:scale-[1.02]">
                <p style={messageStyle} className="text-center">{message}</p>
              </div>
            )}
          </div>

          {/* 画像セクション */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center">
                <Image
                  src="/IMG.jpg"
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

          {/* ボタンセクション */}
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={fetchMessage}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              APIメッセージを取得
            </button>
            <button
              onClick={fetchImage}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              API画像を取得
            </button>
          </div>

          {/* 情報リスト */}
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
        </main>
      </div>
    </div>
  );
}
