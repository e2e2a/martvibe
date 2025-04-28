'use server';
import { auth } from '@/auth';
import { Decimal } from '@/custom/generated/prisma/runtime/library';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { findProductById, updateProductById } from '@/service/products';
import { findProfileByUserId } from '@/service/profile';
import { createSale } from '@/service/sale';

interface IProps {
  quantity: number;
  productId: number;
}

export const createSaleAction = async (data: IProps) => {
  return tryCatch(async () => {
    const authenticated = await auth();
    if (!authenticated) return { message: 'Not Authenticated.', success: false, error: 403 };
    const product = await findProductById(data.productId);
    if (!product) return { message: 'No product found.', success: false, status: 404 };

    const profile = await findProfileByUserId(Number(authenticated.user.id));
    const quantity = product.quantity! - data.quantity;

    await createSale({
      price: new Decimal(product.price),
      total: new Decimal(Number(product.price) * Number(data.quantity)),
      saledId: profile.id,
      quantity: Number(data.quantity),
      productId: Number(product.id),
    });

    await updateProductById({ id: product.id, quantity: quantity });
    return { message: `Sale Created!`, success: true, status: 200 };
  });
};
