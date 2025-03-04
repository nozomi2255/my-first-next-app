'use client';
import { useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import MessageSection from "./components/MessageSection";
import ImageSection from "./components/ImageSection";
import ButtonSection from "./components/ButtonSection";
import InfoList from "./components/InfoList";

// Homeコンポーネントはアプリケーションのトップページを表示します
export default function Home() {
  const [message, setMessage] = useState(""); // APIから取得したメッセージを格納
  const [messageStyle, setMessageStyle] = useState({}); // メッセージのスタイルを格納
  const [apiImage, setApiImage] = useState<string | null>(null); // APIから取得した画像のURLを格納

  // APIからメッセージを取得する関数
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

  // APIから画像を取得する関数
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
          <Header 
            title="Hello Next.js!" 
            subtitle="Welcome to your modern Next.js application" 
          />
          
          {/* カウンターページへのリンク */}
          <Link
            href="/counter"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Go to Counter Page 
          </Link>
          
          {/* Todoリストページへのリンク */}
          <Link
            href="/todo"
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Go to Todo List Page
          </Link>
          
          {/* APIから取得したメッセージを表示 */}
          <MessageSection 
            message={message} 
            messageStyle={messageStyle} 
          />
          
          {/* APIから取得した画像を表示 */}
          {apiImage && (
            <img src={apiImage} alt="Fetched from API" className="rounded-lg shadow-md" />
          )}
          
          {/* メッセージと画像を取得するボタンセクション */}
          <ButtonSection 
            onFetchMessage={fetchMessage} 
            onFetchImage={fetchImage} 
          />
          
          {/* 情報リストを表示 */}
          <InfoList />
        </main>
      </div>
    </div>
  );
}
