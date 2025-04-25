import { prisma } from '@/lib/prisma';

const categories = ['Fresh Produce', 'Dairy & Eggs', 'Meat & Poultry', 'Seafood', 'Frozen Foods', 'Grains & Pasta', 'Canned Goods', 'Condiments & Sauces', 'Baking Supplies', 'Snacks', 'Beverages', 'Breakfast Items', 'Refrigerated Foods', 'None'];

export async function seedCategory() {
  // Seeding Users
  const createdCategories = [];

  for (const name of categories) {
    const category = await prisma.category.create({
      data: { name },
    });
    createdCategories.push(category);
  }

  // Additional models can be seeded here if needed.
}

// This will run the main function
seedCategory()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
