import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';
import { ProfileWithStore } from '@/types';

export const findProfileByUserId = async (userId: number): Promise<ProfileWithStore> => {
  return tryCatch(async () => {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        store_seller: true,
        store_owner: true,
      },
    });
  }, `Failed to fetch profile ${userId}`);
};
