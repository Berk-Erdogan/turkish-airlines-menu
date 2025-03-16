import { detectLanguage } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Invalid Data Request' },
        { status: 400 }
      );
    }
    
    const language = await detectLanguage(text);
    
    return NextResponse.json({ language });
  } catch (error) {
    console.error('Language Detection API Failed:', error);
    return NextResponse.json(
      { error: 'Language Detection Failed' },
      { status: 500 }
    );
  }
}