import { createSaleAction } from '@/action/sales/create';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await createSaleAction(body);
  console.log('result', result);
  console.log('result.message ?? result.error', result.message || result.error);
  return NextResponse.json(
    { message: result.message ?? result.error, success: result.success },
    { status: result.status }
  );
}
