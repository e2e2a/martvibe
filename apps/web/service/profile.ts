import { Profile } from '@/generated/prisma';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';

export const findProfileByUserId = async (userId: number): Promise<Profile> => {
  return tryCatch(async () => {
    return await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }, `Failed to fetch profile ${userId}`);
};
