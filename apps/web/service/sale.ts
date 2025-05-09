import { Decimal } from '@prisma/client/runtime/library';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';
import { SaleWithProduct } from '@/types';
import { Sale } from '@/custom/generated/prisma/client';

interface IProps {
  quantity: number;
  price: Decimal;
  total: Decimal;
  productId: number;
  saledId: number;
}

export const createSale = async (data: IProps): Promise<Sale | null> => {
  return tryCatch(async () => {
    return await prisma.sale.create({
      data: { ...data },
    });
  }, `Failed to create product`);
};

export const findSalesByProductProfileId = async (
  profileId: number
): Promise<SaleWithProduct[] | []> => {
  return tryCatch(async () => {
    return await prisma.sale.findMany({
      where: {
        product: {
          profileId,
        },
      },
      include: {
        product: true,
      },
    });
  });
};
