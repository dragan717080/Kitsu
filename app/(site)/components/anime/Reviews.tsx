import { FC } from 'react';
import Image from 'next/image';
import Utils from '@/Utils';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledArrowDropUp = styled(ArrowDropUp)({
  marginTop: '-5px', // Adjust the margin as needed
});

const StyledArrowDropDown = styled(ArrowDropDown)({

});

const Reviews: FC = ({ reviews }) => {
  reviews = reviews.sort((a, b) => b.likesCount - a.likesCount);
  console.log('reviews', reviews)
  return (
    <div className='-mx-5'>
      <div className='pb-3 font-bold'>Reviews</div>
      {reviews.map((review, index) =>
        <div className="row mb-6" key={index} >
          <div className="rounded-full overflow-hidden h-10">
            <Image height='40' width='40' alt={`${review.user_name} Avatar`} src={review.user_avatar} className='h-full' />
          </div>
          <div className='row-v ml-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#000000" d="M2 16h20l-10-9z" />
            </svg>
            <div className='mx-auto'>{review.likesCount}</div>
            <svg viewBox="0 0 24 24" fill="#000" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-drop-up">
              <path d="M12 19l-7-7h14l-7 7z" />
            </svg>
          </div>
          <div className="h-[4.5rem] row overflow-hidden ml-7 max-w-sm">
            <p className="line-clamp-3">
              { Utils.htmlToPlainText(review.content) }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reviews;
