import { tryCatch } from "@/lib/helpers/tryCatch";
import { prisma } from "@/lib/prisma";
import { UserWithProfile } from "@/types";

export const findStoreById = async (id: number): Promise<any | null> => {
  return tryCatch(async () => {
    return await prisma.store.findUnique({
      where: { id },
    });
  }, `Failed to fetch store by ID ${id}`);
};