import { extractMenuFromImage } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json(
        { error: 'Couldnt find the Image File' },
        { status: 400 }
      );
    }
    
    const menuItems = await extractMenuFromImage(image);
    
    return NextResponse.json({ menuItems });
  } catch (error) {
    console.error('Menu Extraction API Error:', error);
    return NextResponse.json(
      { error: 'Menu Extraction Failed' },
      { status: 500 }
    );
  }
}