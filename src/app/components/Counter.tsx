"use client";
import { useState } from "react";

interface CounterProps {
  message: string;
  initialCount?: number;
  buttonText?: string;
  messageColor?: string;
}

export default function Counter({ 
  message, 
  initialCount = 0,
  buttonText = "カウントアップ",
  messageColor = "text-blue-500"
}: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className={`text-2xl font-bold ${messageColor} dark:text-white`}>
        {message}
      </h1>
      <p className="text-4xl font-bold text-blue-500">
        Count: {count}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          リセット
        </button>
      </div>
    </div>
  );
}