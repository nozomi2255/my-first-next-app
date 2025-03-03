// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

// 画像を返すエンドポイント
export async function GET() {
    try {
        // 画像ファイルのパスを指定
        const imagePath = path.join(process.cwd(), 'public', 'IMG.jpg');
        
        // 画像ファイルを読み込む
        const imageBuffer = fs.readFileSync(imagePath);
        
        // 画像をレスポンスとして返す
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('画像の読み込みエラー:', error);
        return NextResponse.json(
            { error: '画像の読み込みに失敗しました' },
            { status: 500 }
        );
    }
}
