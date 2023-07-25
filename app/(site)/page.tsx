'use client';

import Image from 'next/image';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import getCollection from '@/prisma/PrismaCollections';
import { animeTags } from './constants/enums';
import Utils from '@/Utils';
import axios from 'axios';

export default function Home() {

  const session = useSession();
  const [animes, setAnimes] = useState<any>([]);

  const getData = async () => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_URL}/api/animes/tags`)
        .then(result => result.data)
        .then(result => setAnimes(result));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SessionProvider session={session}>
      <div className="flex-1 row-v py-12 sm:px-6 lg:px-8 bg-gray-100">
        {Object.entries(animes).map(([tag, animesForTag], index) => (
          <div key={index}>
            <div className="row-v">
              <div className='t-main font-bold tracking-wide mb-1 text-lg' key={index} >
                {Utils.toTitleCase(tag)} Animes
              </div>
              <div className="flex align-center">
                {animesForTag.map((anime, index) => (
                  <div className='mr-4 max-w-none tag-card' key={index}>
                    <div className="container max-w-none overflow-hidden w-300 h-400">
                      {anime.posterImage &&
                        <a href={`/animes/${anime.id}`}>
                          <Image
                            height="400"
                            width="240"
                            alt=''
                            className="w-full h-full transition-transform duration-300 transform scale-100 hover:scale-120 max-w-none rounded-2xl"
                            src={anime.posterImage}
                          />
                        </a>
                      }
                    </div>
                    <div className='mx-auto w-70 text-center tag-title mt-1' key={index}>
                      {anime.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SessionProvider>
  )
}
