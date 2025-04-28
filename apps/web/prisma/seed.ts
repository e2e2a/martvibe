import { prisma } from '@/lib/prisma';

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'john_doe',
      role: 'OWNER',
      verified: true,
      verified_date: new Date(),
      revoke: false,
      password: 'hashedPassword',
      profile: {
        create: {
          bio: 'Hello, I am John Doe!',
          firstname: 'John',
          lastname: 'Doe',
          store_owner: {
            create: [
              { name: "John's Store 1" },
              { name: "John's Store 2" },
            ],
          },
        },
      },
    },
    include: {
      profile: {
        include: {
          store_owner: true,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      username: 'jane_doe',
      role: 'OWNER',
      verified: true,
      verified_date: new Date(),
      revoke: false,
      password: 'hashedPassword',
      profile: {
        create: {
          bio: 'Hello, I am Jane Doe!',
          firstname: 'Jane',
          lastname: 'Doe',
          store_owner: {
            create: [{ name: "Jane's Store" }],
          },
        },
      },
    },
  });

  const johnsFirstStoreId = user1?.profile?.store_owner[0]?.id;

  const seller = await prisma.user.create({
    data: {
      email: 'seller@example.com',
      username: 'seller_user',
      role: 'SELLER',
      verified: true,
      verified_date: new Date(),
      revoke: false,
      password: 'hashedPassword',
      profile: {
        create: {
          bio: 'I am a seller for Store 1',
          firstname: 'Seller',
          lastname: 'User',
          store_seller: {
            connect: [{ id: johnsFirstStoreId }],
          },
        },
      },
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
