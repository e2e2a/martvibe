'use server';
import { Category } from '@prisma/client';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';

export const findAllCategories = async (): Promise<Category[]> => {
  return tryCatch(async () => {
    return await prisma.category.findMany(); // Fetch all users
  }, `Failed to fetch categories.`);
};
