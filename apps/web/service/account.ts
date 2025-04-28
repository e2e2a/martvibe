'use server';
import { Account } from '@prisma/client';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';

type CreateAccountData = {
  providerAccountId: string;
  access_token?: string;
  expires_at?: Date | string | undefined;
  userId: number;
};

export const createAccount = async (data: CreateAccountData): Promise<Account> => {
  return tryCatch(async () => {
    return await prisma.account.create({
      data: data,
    });
  }, `Failed to create account`);
};

export const findAccountByUserId = async (userId: number): Promise<Account | null> => {
  return tryCatch(async () => {
    return await prisma.account.findFirst({
      where: { userId },
    });
  }, `Failed to fetch account by userId ${userId}`);
};
