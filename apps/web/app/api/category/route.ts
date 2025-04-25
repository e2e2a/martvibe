import { findAllCategories } from '@/service/category';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await findAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
