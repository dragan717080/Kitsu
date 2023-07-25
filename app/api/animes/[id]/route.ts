import { NextResponse } from "next/server";
import { getItem } from "@/prisma/PrismaCollections";
import Utils from "@/Utils";

const getAnimeById = async (req, res) => {

    const id = req.url.split('/')[req.url.split('/').length - 1];

    try {
        const animes = await getItem(
          'anime', 
          ['characters', 'episodes', 'reviews'], 
          {id});
        return NextResponse.json(animes)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getAnimeById as GET };
