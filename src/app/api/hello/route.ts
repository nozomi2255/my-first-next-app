// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';

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

// 画像のURLを返すエンドポイント
export async function GET() {
    try {
        // 画像のURLを返す
        const imageUrl = '/IMG.jpg'; // publicディレクトリに配置されている画像
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('画像のURL取得エラー:', error);
        return NextResponse.json(
            { error: '画像のURL取得に失敗しました' },
            { status: 500 }
        );
    }
}
