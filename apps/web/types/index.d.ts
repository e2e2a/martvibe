import { Product } from '@/generated/prisma';
import { Category } from '@/generated/prisma';

export type ProductWithCategory = Product & {
  category: Category[];
};
