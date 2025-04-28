/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_ownerId_fkey";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "_StoreOwner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StoreOwner_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StoreOwner_B_index" ON "_StoreOwner"("B");

-- AddForeignKey
ALTER TABLE "_StoreOwner" ADD CONSTRAINT "_StoreOwner_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreOwner" ADD CONSTRAINT "_StoreOwner_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
