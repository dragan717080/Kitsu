import { FC } from 'react';
import Image from 'next/image';
import Utils from '@/Utils';

const Characters: FC = ({characters}) => {
  console.log('characters', characters)

  return (
    <div className='-mx-5'>
      <div className='pb-3 font-bold'>Characters</div>
      {Utils.splitArrayToChunks(characters, 4).map((row, index) =>
        <div className="grid grid-cols-4 gap-3" key={index} >
          {row.map((character, index) =>
            <div key={index} >
              <div className='h-[12rem] w-[8rem]'>
                <Image height='140' width='220' alt={`${character.name} Image`} src={character.image} className='h-full' />
              </div>
              <div>
                <p className="line-clamp-2 py-3 font-bold text-sm">
                  {character.names.en}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Characters;
