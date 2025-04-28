'use server';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
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
  }, `Failed to fetch product by profileId ${profileId}`);
};

export const findProductById = async (id: number): Promise<Product | null> => {
  return tryCatch(async () => {
    return await prisma.product.findFirst({
      where: { id },
      include: {
        category: true,
      },
    });
  }, `Failed to fetch Product by ID ${id}`);
};
interface IProps {
  quantity: number;
  id: number;
}
export const updateProductById = async (data: IProps): Promise<Product | null> => {
  return tryCatch(async () => {
    return await prisma.product.update({
      where: { id: data.id },
      data: {
        quantity: data.quantity,
      },
    });
  }, `Failed to update Product by ID ${data.id}`);
};
