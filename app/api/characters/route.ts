import { NextResponse } from "next/server";
import { getCollection } from "@/prisma/PrismaCollections";

const getAllCharacters = async () => {
    try {
        const characters = await getCollection('character');
        return NextResponse.json(characters)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getAllCharacters as GET };
