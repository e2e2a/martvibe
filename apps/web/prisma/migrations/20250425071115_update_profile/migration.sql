-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_storeId_fkey";

-- CreateTable
CREATE TABLE "_ProfileStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProfileStore_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProfileStore_B_index" ON "_ProfileStore"("B");

-- AddForeignKey
ALTER TABLE "_ProfileStore" ADD CONSTRAINT "_ProfileStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileStore" ADD CONSTRAINT "_ProfileStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
