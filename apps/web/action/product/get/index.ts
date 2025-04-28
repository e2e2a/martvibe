'use server';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { findProductByProfileId } from '@/service/products';
import { findStoreById } from '@/service/store';

export const getProductByProfileIdAction = async (profileId: number) => {
  return tryCatch(async () => {
    const products = await findProductByProfileId(profileId);
    return products;
  });
};

export const getProductByStoreIdAction = async (storeId: number) => {
  return tryCatch(async () => {
    const owner = await findStoreById(storeId);
    return await getProductByProfileIdAction(owner.id);
  });
};
