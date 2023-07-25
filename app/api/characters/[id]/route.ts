import { NextResponse } from "next/server";
import { getCollection, getItem } from "@/prisma/PrismaCollections";

const getCharacterById = async (req, res) => {

    const id = req.url.split('/')[req.url.split('/').length - 1];

    try {
        const characters = await getItem('character', [], {id});
        return NextResponse.json(characters)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getCharacterById as GET };
