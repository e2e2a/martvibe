/*
  Warnings:

  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('pcs', 'tray', 'box', 'ml', 'g');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Description" TEXT,
ADD COLUMN     "classification" TEXT,
ADD COLUMN     "unit" "Unit" NOT NULL,
ADD COLUMN     "unitSize" TEXT;
