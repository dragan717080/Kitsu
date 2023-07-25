import { PrismaClient } from "@prisma/client";

// Instantiate Prisma Client
const prisma = new PrismaClient();

const getQuery = (relations, where) => {
  const d = relations.length > 0
  ? {
    include: relations.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {}),
  }
  : {};
if (Object.keys(where).length > 0) d.where = where;
return d;
}

const getCollection = async (
  col: string, 
  relations: string[] = [], 
  where = {}
  ): Promise => {
  try {
    const d = getQuery(relations, where);
    const data = await prisma[col].findMany(d);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const getItem = async (
  col: string,
  relations: string[] = [],
  where = {}
): Promise => {
  try {
    const d = getQuery(relations, where);
    const data = await prisma[col].findUnique(d);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export { getCollection, getItem };
