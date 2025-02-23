import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialCategories: Prisma.CategoryCreateInput[] = [
  { name: "Work" },
  { name: "Personal" },
  { name: "Social" },
  { name: "Travel" },
  { name: "Health" },
  { name: "Other" }
];

const initialAccounts = [
  {
    title: "Google",
    url: "https://google.com",
    username: "google",
    password: "password",
    notes: "This is a note",
    categoryName: "Work" // Asignamos una categoría por nombre
  },
  {
    title: "Facebook",
    url: "https://facebook.com",
    username: "facebook",
    password: "password",
    categoryName: "Social"
  },
  {
    title: "Twitter",
    url: "https://twitter.com",
    username: "twitter",
    password: "password",
    notes: "This is a note",
    categoryName: "Social"
  }
];

async function main() {
  console.log("Deleting existing data...");

  // Eliminar todas las cuentas primero porque dependen de Category
  await prisma.account.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Start seeding ...");

  // Crear las categorías y almacenar los IDs
  const categoriesMap = new Map();
  for (const c of initialCategories) {
    const category = await prisma.category.create({ data: c });
    categoriesMap.set(category.name, category.id); // Guardamos el ID asociado al nombre
    console.log(`Created category with id: ${category.id}`);
  }

  // Crear las cuentas con la relación a categoría
  for (const a of initialAccounts) {
    const categoryId = categoriesMap.get(a.categoryName); // Obtener el ID de la categoría
    if (!categoryId) {
      console.warn(`Category not found for account: ${a.title}`);
      continue;
    }

    await prisma.account.create({
      data: {
        title: a.title,
        url: a.url,
        username: a.username,
        password: a.password,
        notes: a.notes,
        categoryId: categoryId // Enlazamos la cuenta con la categoría
      }
    });
    console.log(`Created account: ${a.title} in category: ${a.categoryName}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
