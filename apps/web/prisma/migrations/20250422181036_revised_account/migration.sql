/*
  Warnings:

  - You are about to drop the column `accessTokenExpires` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessTokenExpires",
DROP COLUMN "providerId",
DROP COLUMN "providerType",
ADD COLUMN     "expires_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerAccountId_key" ON "Account"("providerAccountId");
