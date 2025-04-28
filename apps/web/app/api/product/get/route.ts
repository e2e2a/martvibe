import { getProductByProfileIdAction, getProductByStoreIdAction } from '@/action/product/get';
import { auth } from '@/auth';
import { Product } from '@/generated/prisma';
import { findProfileByUserId } from '@/service/profile';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const storeId = searchParams.get('storeId');

  const authenticated = await auth();
  if (!authenticated?.user)
    return NextResponse.json({ message: 'Not authenticated.', success: false }, { status: 403 });

  const profile = await findProfileByUserId(Number(authenticated.user.id));
  let products: Product[] = [];
  switch (authenticated?.user.role) {
    case 'OWNER':
      products = await getProductByProfileIdAction(Number(profile.id));
      break;
    case 'SELLER':
      const storeExists = profile.store_seller.find(store => store.id === Number(storeId));
      if (storeExists) {
        products = await getProductByStoreIdAction(Number(storeId));
      } else {
        return NextResponse.json(
          { products, message: 'Store Not found in your profile.', success: false },
          { status: 404 }
        );
      }
      break;
    default:
      return NextResponse.json(
        { products, message: 'Forbidden.', success: false },
        { status: 403 }
      );
  }

  return NextResponse.json({ products, success: true }, { status: 200 });
}
