import { Category } from '@/custom/generated/prisma/client';
import { Product, Profile, Sale, Store, User } from '@/custom/generated/prisma/client';
import { LucideIcon } from 'lucide-react';

export type UserWithProfile = User & { profile: ProfileWithStore };
export type ProfileWithStore = Profile & {
  store_owner: Store[]; // Stores where the user is an owner
  store_seller: Store[];
};

export type ProductWithCategory = Product & {
  category: Category[];
};

export type SidebarItems = {
  title: string;
  url?: string;
  items?: SidebarItems[];
  icon: LucideIcon;
};

export type SaleWithProduct = Sale & {
  product: ProductWithCategory;
};
