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