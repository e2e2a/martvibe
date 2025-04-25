import { NextRequest, NextResponse } from 'next/server';
import { signInAction } from '@/action/auth/signin';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await signInAction(body);

  return NextResponse.json({ message: result.message }, { status: 200 });
}
