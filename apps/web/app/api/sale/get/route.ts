import { getSaleInventoryAction } from '@/action/sales/get';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const result = await getSaleInventoryAction();
  console.log('result', result);
  return NextResponse.json(
    { sales: result.sales, message: result.message ?? result.error, success: result.success },
    { status: result.status }
  );
}
