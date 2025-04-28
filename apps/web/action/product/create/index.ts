'use server';
import { auth } from '@/auth';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { ProductValidator } from '@/lib/validators/product/create';
import { createProduct } from '@/service/products';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '@/lib/prisma';
import { findProfileByUserId } from '@/service/profile';

export type ProductData = z.infer<typeof ProductValidator>;
export const createProductAction = async (data: ProductData) => {
  return tryCatch(async () => {
    const authenticated = await auth();
    if (!authenticated) return { message: 'Not Authenticated.', success: false, error: 403 };
    const validatedFields = ProductValidator.safeParse(data);
    if (!validatedFields.success)
      return { message: 'Invalid fields!', success: false, status: 400 };
    const profile = await findProfileByUserId(Number(authenticated.user.id));
    const checkedProduct = await checkProduct(data, profile.id);
    if (!checkedProduct || !checkedProduct.success)
      return { message: checkedProduct?.message, success: false, status: checkedProduct.status };

    await createProduct({
      ...validatedFields.data,
      price: new Decimal(data.price),
      unitValue: Number(data.unitValue),
      quantity: Number(data.quantity),
      profileId: Number(profile.id),
    });
    return { message: `product ${data.name} created!`, success: true, status: 200 };
  });
};

const checkProduct = async (data: ProductData, profileId: number) => {
  return tryCatch(async () => {
    const search = {
      profileId,
      weightUnit: data.weightUnit,
      ...(data.weightValue ? { weightValue: data.weightValue } : {}),
    };

    const product = await prisma.product.findMany({
      where: {
        ...search,
        name: {
          equals: data.name,
          mode: 'insensitive',
        },
      },
    });

    if (product && product.length > 0)
      return {
        message: `Product ${product[0]?.name}-${product[0]?.weightUnit}${product[0]?.weightValue && `${'-' + product[0]?.weightValue}`} already exist.`,
        success: false,
        status: 409,
      };
    return { success: true };
  });
};
