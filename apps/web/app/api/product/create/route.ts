import { createProductAction } from '@/action/product/create';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await createProductAction(body);

  return NextResponse.json(
    { message: result.message ?? result.error, success: result.success },
    { status: result.status }
  );
}
