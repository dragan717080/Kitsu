'use client';
import { FC, useState, useEffect, MouseEvent } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Utils from '@/Utils';
import Episodes from '../../components/anime/Episodes';
import Characters from '../../components/anime/Characters';
import Reviews from '../../components/anime/Reviews';
import axios from 'axios';

const animeNavbarItems: string[] = ['Summary', 'Episodes', 'Characters', 'Reviews'];

const getData = async (id: string) => {
  const animeParam = id ? `/${id}` : '';
  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/animes${animeParam}`)
  const animeList = await response.data;
  return animeList;
}

const AnimeLayout = (props) => {

  const id: string = props.params.id

  const [activeNavbarItem, setActiveNavbarItem] = useState<animeNavbarItems>('Summary');

  const [anime, setAnime] = useState<any>({});
  const [animeDetails, setAnimeDetails] = useState<any>({});
  const [randomReview, setRandomReview] = useState<any>({});

  const getAnimeDetails = (anime) => {
    const animeDetailsKeys = ['English', 'Type', 'Status', 'Aired', 'Favorites', 'Followers'];
    const animeDetailsValues = [anime.title, 'TV', Utils.getAiringStatus(anime.endDate), Utils.formatDateTime(anime.startDate), anime.favoritesCount, anime.userCount];
    setAnimeDetails(Utils.listsToObject(animeDetailsKeys, animeDetailsValues))
    if (anime.reviews.length > 0)
      setRandomReview(anime.reviews[Math.floor(Math.random() * anime.reviews.length)]);
  }

  const handleNavbarClick = (e: MouseEvent) => {
    Array.from(document.getElementsByClassName('navbar-item')).forEach(navbarNode => navbarNode.classList.remove('t-red'));
    e.target.classList.add('t-red');
    setActiveNavbarItem(e.target.innerText);
  }

  const getPage = (title: string) =>
    title === 'Summary' ? <div className="max-w-[32rem]">{anime.synopsis}</div> : title === 'Episodes' ? <Episodes episodes={anime.episodes} /> : title === 'Characters' ? <Characters characters={anime.characters} /> : title === 'Reviews' ? <Reviews reviews={anime.reviews} /> : null;
  
  useEffect(() => {
    getData(id)
      .then(result => {
        setAnime(result);
        getAnimeDetails(result);
        console.log('result', result)
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
                    <div className='absolute bottom-3 mx-auto row w-2/5 ml-12'>
                      <div className="rounded-full overflow-hidden h-12">
                        <Image
                          height="50"
                          width="50"
                          alt={`${randomReview.user_avatar} avatar`}
                          src={randomReview.user_avatar}
                          className='h-12 w-12'
                        />
                      </div>``
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
          <div className="w-5/6 mx-auto flex">
            <div className="h-[fit-content] -mt-14 sticky">
              <Image height="277" width="195" src={anime.posterImage} alt={anime.title} className='h-[17rem] w-[12rem] max-w-fit' />
            </div>
            <div className="py-3 px-7 min-w-[35rem] flex flex-col items-center mb-12">
              <div className="mx-10">
                <div className="row-h space-x-2">
                  {animeNavbarItems.map((navbarItem, index) =>
                    <div
                      className={`tracking-tight border border-gray-50 bg-gray-100 text-center px-2 cursor-pointer navbar-item ${navbarItem === 'Summary' ? 't-red' : ''}`}
                      key={index}
                      onClick={(e) => handleNavbarClick(e)}
                    >
                      {navbarItem}
                    </div>
                  )
                  }
                </div>
              </div>
              <div className="row-h pt-7 pb-3 font-bold whitespace-nowrap">
                <div className='t-main tracking-wide mb-1 text-xl px-4 pl-4'>
                  {anime.title}
                </div>
                <div className="text-gray-400 pt-0.5 pr-7">
                  {anime.startDate.split('-')[0]}
                </div>
              </div>
              <div className="mx-auto row-h pl-4">
                <div className="my-auto pr-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 11.25C6 11.25 1 8 1 4C1 2.15 2.15 1 4 1C5.3 1 6 1.7 6 1.7C6 1.7 6.7 1 8 1C9.85 1 11 2.15 11 4C11 8 6 11.25 6 11.25Z"
                      strokeWidth="1.2"
                      fill="red"
                    />
                  </svg>
                </div>
                <div className='text-gray-900 pt-0.5 pr-3 text-xs'>
                  Rank # {anime.popularityRank} (Most Popular Anime)
                </div>
                <div className="my-auto pr-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  >
                    <path
                      d="M12 2L14.4978 8.24574H21.2541L16.2541 12.7543L18.7519 19L12 14.7543L5.24808 19L7.74586 12.7543L2.74586 8.24574H9.50222L12 2Z"
                      fill="yellow"
                    />
                  </svg>
                </div>
                <div className='text-gray-900 pt-0.5 pr-7 text-xs'>
                  Rank # {anime.ratingRank} (Highest Rating Anime)
                </div>
              </div>
              <div className='pt-6 px-4'>
                {getPage(activeNavbarItem)}
              </div>
            </div>
            <div className='bg-white mt-12 pt-3 pb-6 px-7 rounded-xl h-[fit-content]'>
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
