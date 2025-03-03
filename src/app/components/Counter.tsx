"use client";
import { useState, useEffect } from "react";

interface CounterProps {
  message: string;
  initialCount?: number;
  buttonText?: string;
  messageColor?: string;
  onCountChange?: (count: number) => void;
}

export default function Counter({ 
  message, 
  initialCount = 0,
  buttonText = "カウントアップ",
  messageColor = "text-blue-500",
  onCountChange
}: CounterProps) {
  const [count, setCount] = useState(initialCount);
  const [specialMessage, setSpecialMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  // カウント更新の処理
  const updateCount = (newCount: number) => {
    setCount(newCount);
    onCountChange?.(newCount);
  };

  // マウント時のアニメーションEffect
  useEffect(() => {
    setIsVisible(true);
    console.log(`🎮 ${message}コンポーネントが準備完了！`);

    return () => {
      setIsVisible(false);
      console.log(`👋 ${message}コンポーネントが終了します`);
    };
  }, [message]);

  // カウント変更時のEffect
  useEffect(() => {
    if (count % 10 === 0 && count !== 0) {
      setSpecialMessage(`🎉 ${count}達成！おめでとう！`);
      const timer = setTimeout(() => {
        setSpecialMessage("");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [count]);

  // タイトル更新のEffect
  useEffect(() => {
    const baseTitle = "カウンター";
    document.title = `${baseTitle} - ${message} (${count})`;

    return () => {
      document.title = baseTitle;
    };
  }, [count, message]);

  // 初期値が変更された時にカウントを更新
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${isVisible ? 'counter-fade-in' : 'opacity-0'}`}>
      <h1 className={`text-2xl font-bold ${messageColor} dark:text-white`}>
        {message}
      </h1>
      {specialMessage && (
        <p className="text-lg font-semibold text-yellow-500 counter-bounce">
          {specialMessage}
        </p>
      )}
      <p className="text-4xl font-bold text-blue-500">
        Count: {count}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => updateCount(count + 1)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
        <button
          onClick={() => updateCount(0)}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          リセット
        </button>
      </div>
    </div>
  );
}