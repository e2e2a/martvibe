import prisma from '@/lib/prisma';

async function main() {
  // Seeding Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'john_doe',
      role: 'OWNER', // Assuming you have a role enum
      verified: true,
      profile: {
        create: {
          bio: 'Hello, I am John Doe!',
          firstname: 'John',
          lastname: 'Doe',
          store: {
            create: {
              name: "John's Store",
            },
          },
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
      profile: {
        create: {
          bio: 'Hello, I am Jane Doe!',
          firstname: 'Jane',
          lastname: 'Doe',
          store: {
            create: {
              name: "Jane's Store",
            },
          },
        },
      },
    },
  });

  console.log({ user1, user2 });

  // Additional models can be seeded here if needed.
}

// This will run the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
