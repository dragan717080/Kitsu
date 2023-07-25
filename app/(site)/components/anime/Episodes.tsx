import { FC } from 'react';
import Image from 'next/image';
import Utils from '@/Utils';

const Episodes: FC = ({ episodes }) => {

  return (
    <div className='-mx-5'>
      <div className='pb-3 font-bold'>Episodes</div>
      {Utils.splitArrayToChunks(episodes, 4).map((row, index) =>
        <div className="grid grid-cols-4 gap-3" key={index} >
          {row.map((episode, index) =>
            <div key={index} >
              <div className='h-[4rem] w-[8rem]'>
                <Image height='140' width='220' alt={`${episode.title} Image`} src={episode.thumbnail} />
              </div>
              <div>
                <p className="line-clamp-2 py-3 font-bold text-sm">
                  {episode.title}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Episodes;
