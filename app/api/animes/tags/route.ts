import { NextResponse } from "next/server";
import { getCollection } from "@/prisma/PrismaCollections";
import { Tag } from "@/app/interfaces/types";
import { animeTags } from "@/app/(site)/constants/enums";
import Utils from "@/Utils";

const getAnimesTags = async () => {

  function getAnimesByTags(animes, tags) {
    const animesByTags = {};

    tags.forEach((tag) => {
      animesByTags[tag] = animes.filter((anime) => anime.tags.includes(tag));
    });

    Object.keys(animesByTags).forEach((tag) =>
      Utils.shuffleArray(animesByTags[tag]));

    const result = {};
    tags.forEach((tag) => {
      const remainingAnimes = animesByTags[tag].slice(0, 4);
      result[tag] = remainingAnimes.map(({ id, title, posterImage }) => ({ id, title, posterImage }));
      tags.forEach((otherTag) => {
        if (otherTag !== tag) {
          animesByTags[otherTag] = animesByTags[otherTag].filter(
            (anime) => !remainingAnimes.includes(anime)
          );
        }
      });
    });

    return result;
  }

  try {
    const animes = await getCollection('anime');
    const result = getAnimesByTags(animes, ["highest rating", "top", "trending", "most popular"]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

export { getAnimesTags as GET };
