/*
  Warnings:

  - You are about to drop the column `Description` on the `Product` table. All the data in the column will be lost.
  - The `unit` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT;

-- DropEnum
DROP TYPE "Unit";
