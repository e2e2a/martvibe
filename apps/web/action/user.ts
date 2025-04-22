"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example seeding code
async function main() {
  // Your seeding logic
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
