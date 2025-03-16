import { answerMenuQuestion } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { menuItems, question, language = 'en' } = await request.json();
    
    if (!menuItems || !Array.isArray(menuItems) || !question) {
      return NextResponse.json(
        { error: 'Unexcepted Data Request' },
        { status: 400 }
      );
    }
    
    const answer = await answerMenuQuestion(menuItems, question, language);
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Question Answering Procces not executed' },
      { status: 500 }
    );
  }
}