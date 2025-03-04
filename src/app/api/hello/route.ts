// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';
import React from 'react'; // 明示的に React をインポート
import ImageSection from '../../components/ImageSection';  
import { renderToString } from 'react-dom/server';

// メッセージを返すエンドポイント
export async function POST() {
    return NextResponse.json({
        message: "Hello from API!",
        style: {
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#0070f3",
            marginBottom: "2rem"
        }
    });
}

// 画像のHTMLを返すエンドポイント（GET）
export async function GET() {
    try {
        // ImageSection コンポーネントを React.createElement を用いて生成し、サーバーサイドレンダリング
        const html = renderToString(React.createElement(ImageSection));
        return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' }
        });
    } catch (error) {
        console.error('画像のレンダリングエラー:', error);
    return NextResponse.json(
        { error: '画像のレンダリングに失敗しました' },
        { status: 500 }
      );
    }
  }
