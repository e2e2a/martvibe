

export interface User {
  id: number;
  email: string;
  username?: string;
  role?: 'ADMIN' | 'SELLER' | 'BUYER' | 'OWNER';
  profile?: Profile;
  verified: boolean;
  verified_date?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: number;
  userId: number;
  bio: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  suffix?: string;
  storeId: number;
  store: Store;
  approved?: boolean;
  approved_date?: Date | null;
  verified: boolean;
  verified_date?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: number;
  name: string;
  profileId?: number;
  profile?: Profile | null;
  createdAt: Date;
  updatedAt: Date;
}
