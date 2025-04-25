/*
  Warnings:

  - You are about to drop the column `classification` on the `Product` table. All the data in the column will be lost.
  - The `unitSize` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "classification",
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "weightUnit" TEXT,
ADD COLUMN     "weightValue" TEXT,
DROP COLUMN "unitSize",
ADD COLUMN     "unitSize" INTEGER;
