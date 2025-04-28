import { Role, User } from '@/custom/generated/prisma';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { prisma } from '@/lib/prisma';
import { UserWithProfile } from '@/types';

export const findAllUsers = async (): Promise<User[]> => {
  return tryCatch(async () => {
    return await prisma.user.findMany();
  }, `Failed to fetch users.`);
};

export const findUserById = async (userId: number): Promise<UserWithProfile | null> => {
  return tryCatch(async () => {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            store_seller: true,
            store_owner: true,
          },
        },
      },
    });
  }, `Failed to fetch user by ID ${userId}`);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return tryCatch(async () => {
    return await prisma.user.findUnique({
      where: { email: email },
      include: {
        profile: {
          include: {
            store_seller: true,
            store_owner: true,
          },
        },
      },
    });
  }, `Failed to fetch user by email ${email}`);
};

export const findUsersByRole = async (role: Role): Promise<User[]> => {
  return tryCatch(async () => {
    return await prisma.user.findMany({
      where: { role: role },
    });
  }, `Failed to fetch users by role ${role}`);
};

export const createUser = async (userData: {
  email: string;
  username?: string;
  role?: Role;
}): Promise<User> => {
  return tryCatch(async () => {
    return await prisma.user.create({
      data: userData,
    });
  }, `Failed to create user`);
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  return tryCatch(async () => {
    return await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }, `Failed to update user ${userId}`);
};

// export const deleteUser = async (userId: number): Promise<User> => {
//   return tryCatch(async () => {
//     return await prisma.user.delete({
//       where: { id: userId },
//     });
//   }, `Failed to delete user with ID ${userId}`);
// };
