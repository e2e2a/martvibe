import { auth } from '@/auth';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { findProfileByUserId } from '@/service/profile';
import { findSalesByProductProfileId } from '@/service/sale';
import { SaleWithProduct } from '@/types';

export const getSaleInventoryAction = async () => {
  return tryCatch(async () => {
    const authenticated = await auth();
    if (!authenticated) return { message: 'Not Authenticated.', success: false, error: 403 };
    const profile = await findProfileByUserId(Number(authenticated.user.id));
    let sales: SaleWithProduct[] = [];
    switch (authenticated.user.role) {
      case 'OWNER':
        sales = await findSalesByProductProfileId(profile.id);
        break;
      default:
        return { message: 'Forbidden.', success: false, status: 403 };
    }
    console.log('sales', sales);
    return { sales, success: true, status: 200 };
  });
};
