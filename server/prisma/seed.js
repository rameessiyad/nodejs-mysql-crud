const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Computers" },
      { name: "TV" },
      { name: "Storage" },
      { name: "Accessories" },
    ],
    skipDuplicates: true,
  });

  await prisma.tag.createMany({
    data: [
      { name: "Apple" },
      { name: "keyboard" },
      { name: "IOS" },
      { name: "SSD" },
      { name: "USB" },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
