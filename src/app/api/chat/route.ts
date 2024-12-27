import { NextResponse } from 'next/server';

// 豆包 API 配置
const DOUBAO_API_URL = 'https://api.doubao.com/v1/chat/completions';
const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY;

// Coze API 配置
const COZE_API_URL = 'https://www.coze.cn/api/chat';
const COZE_API_KEY = process.env.COZE_API_KEY;

export async function POST(request: Request) {
  try {
    const { message, modelType = 'doubao' } = await request.json();

    // 根据选择的模型类型调用不同的 API
    const response = await (modelType === 'doubao' 
      ? callDoubaoAPI(message) 
      : callCozeAPI(message));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

async function callDoubaoAPI(message: string) {
  const response = await fetch(DOUBAO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DOUBAO_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message }],
      model: 'doubao-v1',
    }),
  });

  return response.json();
}

async function callCozeAPI(message: string) {
  const response = await fetch(COZE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${COZE_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message }],
    }),
  });

  return response.json();
} 