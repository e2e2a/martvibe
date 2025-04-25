import { getProductByProfileIdAction } from '@/action/product/get';
import { auth } from '@/auth';
import { findProfileByUserId } from '@/service/profile';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authenticated = await auth();
  if (!authenticated?.user)
    return NextResponse.json({ message: 'Not authenticated.', success: false }, { status: 403 });
  const profile = await findProfileByUserId(Number(authenticated.user.id));
  let result;
  switch (authenticated?.user.role) {
    case 'OWNER':
      result = await getProductByProfileIdAction(Number(profile.id));
      break;
    default:
      return NextResponse.json({ message: 'Forbidden.', success: false }, { status: 403 });
  }

  return NextResponse.json(
    { products: result.products, success: result.success },
    { status: result.status }
  );
}
