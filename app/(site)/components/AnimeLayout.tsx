'use client';
import { FC, useState, useEffect, ReactNode, createContext, useMemo } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Utils from '@/Utils';
import axios from 'axios';


const animeNavbarItems: string[] = ['Summary', 'Episodes', 'Characters', 'Reviews'];

const getData = async (id: string) => {
  const animeParam = id ? `/${id}` : '';
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/animes${animeParam}`)
  const animeList = await response.data;
  return animeList;
}

const MyContext = createContext('Hello');

const AnimeLayout = (props) => {

  const id = props.id
  console.log('props', props)

  const [activeNavbarItem, setActiveNavbarItem] = useState<animeNavbarItems>('Summary');

  const [anime, setAnime] = useState<any>({});
  const [animeDetails, setAnimeDetails] = useState<any>({});
  const [randomReview, setRandomReview] = useState<any>({});

  const getAnimeDetails = (anime) => {
    console.log('anime', anime)
    const animeDetailsKeys = ['English', 'Type', 'Status', 'Aired', 'Favorites', 'Followers'];
    const animeDetailsValues = [anime.title, 'TV', Utils.getAiringStatus(anime.endDate), Utils.formatDateTime(anime.startDate), anime.favoritesCount, anime.userCount];
    setAnimeDetails(Utils.listsToObject(animeDetailsKeys, animeDetailsValues))
    if (anime.reviews.length > 0)
      setRandomReview(anime.reviews[Math.floor(Math.random() * anime.reviews.length)]);
  }

  const memoizedAnime = useMemo(() => anime, [anime]);

  useEffect(() => {
    getData(id)
      .then(result => {
        setAnime(result);
        getAnimeDetails(result);
      });
  }, []);

  return Object.keys(anime).length > 0
    ? (
      <div className='bg-gray-200 row-v flex-1'>
        <div className="h-[20rem] w-full relative">
          <div
            className="h-[20rem] w-full relative bg-img"
            style={{ backgroundImage: `url(${anime.coverImage})` }}
          >
            <div className="absolute bottom-0 top-0 w-full bg-black bg-opacity-50">
              <div className="relative h-[20rem] w-full row-h">
                {Object.keys(randomReview).length > 0 &&
                  (
                    <div className='absolute bottom-3 mx-auto row w-2/5'>
                      <div className="rounded-full overflow-hidden h-12">
                        <Image
                          height="50"
                          width="50"
                          alt={`${randomReview.user_avatar} avatar`}
                          src={randomReview.user_avatar}
                          className='h-12 w-12'
                        />
                      </div>
                      <div className="text-white pt-2 pr-14 pl-5 w-[40rem] h-16">
                        <p className="line-clamp-2">
                          {Utils.htmlToPlainText(randomReview.content)}
                        </p>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex-1">
          <div className="w-3/4 mx-auto flex">
            <div className="h-[fit-content] -mt-7 sticky">
              <Image height="277" width="195" src={anime.posterImage} alt={anime.title} />
            </div>
            <div className="py-3">
              <div className="mx-10">
                <div className="row-h space-x-2">
                  {animeNavbarItems.map((navbarItem, index) =>
                    <div
                      className='tracking-tight border border-gray-50 bg-gray-100 text-center px-2'
                      key={index}
                    >
                      <a href={navbarItem === 'Summary' ? id : `${id}/${navbarItem.toLowerCase()}`}>
                        {navbarItem}
                      </a>
                    </div>
                  )
                  }
                </div>
              </div>
              <div className="row-h pt-4 font-bold whitespace-nowrap">
                <div className='t-main tracking-wide mb-1 text-xl px-4'>
                  {anime.title}
                </div>
                <div className="text-gray-400 pt-0.5 pr-7">
                  {anime.startDate.split('-')[0]}
                </div>
              </div>
              <MyContext.Provider value={'Hello from Provider!'} >
                { props.children }
              </MyContext.Provider>
            </div>
            <div className='bg-white mt-12 pt-3 pb-6 px-7 rounded-xl'>
              <div className="t-main font-bold tracking-wide mb-1 text-lg">
                Anime Details
              </div>
              <div className="mt-7 row-v">
                {Object.keys(animeDetails).map((k, index) =>
                  <div className="flex" key={index} >
                    <div className="font-semibold w-20 flex-shrink-0">{k}</div>
                    <div>{animeDetails[k]}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
    )
    : <div className="row h-screen bg-gray-300 flex-1">
      <div className="spinner"></div>
    </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const animeList = await getData();

  const paths = animeList.map((anime) => ({
    params: { id: anime.id },
  }));

  return {
    paths,
    fallback: false,
  };
}


export default AnimeLayout;
export { MyContext };
