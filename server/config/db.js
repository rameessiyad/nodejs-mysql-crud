const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect to database", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
