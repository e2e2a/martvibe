-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "saledId" INTEGER;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_saledId_fkey" FOREIGN KEY ("saledId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
