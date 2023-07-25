import { NextResponse } from "next/server";
import { getCollection } from "@/prisma/PrismaCollections";

const getAllAnimes = async () => {
    try {
        const animes = await getCollection('anime');
        return NextResponse.json(animes)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getAllAnimes as GET };
