/*
  Warnings:

  - You are about to drop the `_StoreOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StoreOwner" DROP CONSTRAINT "_StoreOwner_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreOwner" DROP CONSTRAINT "_StoreOwner_B_fkey";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "ownerId" INTEGER;

-- DropTable
DROP TABLE "_StoreOwner";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
