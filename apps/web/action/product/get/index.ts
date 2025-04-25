'use server';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { findProductByProfileId } from '@/service/products';

export const getProductByProfileIdAction = async (profileId: number) => {
  return tryCatch(async () => {
    const products = await findProductByProfileId(profileId);

    return { products, success: true, status: 200 };
  });
};
