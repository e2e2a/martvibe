'use server';
import { Product } from '@/generated/prisma';
import { Decimal } from '@/generated/prisma/runtime/library';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';

export type ProductType = {
  name: string;
  price: Decimal;
  description?: string | null;
  weightUnit?: string | null;
  weightValue?: string | null;
  quantity?: number | null;
  unit?: string | null;
  unitValue?: number | null;
  category: number[];
  profileId: number;
};

export const createProduct = async (data: ProductType): Promise<Product> => {
  return tryCatch(async () => {
    return await prisma.product.create({
      data: {
        ...data,
        category: {
          connect: data.category.map(id => ({ id })),
        },
      },
    });
  }, `Failed to create product`);
};

export const findProductByProfileId = async (profileId: number): Promise<Product[] | []> => {
  return tryCatch(async () => {
    return await prisma.product.findMany({
      where: { profileId },
      include: {
        category: true,
      },
    });
  }, `Failed to fetch user by ID ${profileId}`);
};
