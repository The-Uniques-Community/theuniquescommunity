/**
 * @file ReviewCard.jsx
 * @description Testimonial card component displaying reviewer identity, company role, quote, date, and 5-star rating.
 * @architecture Testimonial presentation component in src/utils/Card/ used within testimonial carousels and landing feedback grids.
 * @agent_note Star ratings compute whole and half stars via react-icons/fa FaStar, FaStarHalfAlt, FaRegStar based on a 1-5 scale.
 */

import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

/**
 * @component ReviewCard
 * @description Displays user endorsement card with author portrait, name, position/company, narrative text, date, and star rating.
 * @param {Object} props - Component properties
 * @param {string} props.name - Reviewer's full name
 * @param {string} props.title - Job designation or position
 * @param {string} props.company - Associated company or organization
 * @param {string} props.image - Avatar or profile image URL
 * @param {string} props.review - Testimonial quote or endorsement text
 * @param {number} props.rating - Rating score out of 5
 * @param {string} props.date - Submission or publication date string
 * @state None
 * @api None
 */
const ReviewCard = ({ name, title, company, image, review, rating, date }) => {
  /**
   * @desc Dynamically constructs an array of 5 star icons representing full, half, or empty rating
   * @param {number} rating - Numeric rating between 1 and 5
   * @returns {JSX.Element[]} Array of star icon components
   */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className='rounded-md min-w-[290px] min-h-64 relative shadow-md p-4 bg-white'>
      <div className='flex space-x-5 items-center'>
        <div>
          <img src={image} alt={name} className='w-16 h-16 rounded-full object-cover' />
        </div>
        <div>
          <h2 className='font-semibold text-lg'>{name}</h2>
          <p className='text-gray-500'>{title}, {company}</p>
        </div>
      </div>
      <div className='my-5'>
        <p className='text-sm text-slate-500'>{review}</p>
      </div>
      <div className='flex justify-between items-center absolute bottom-4 w-full right-0 left-0 px-4'>
        <div className='flex items-center space-x-1'>
          {renderStars(rating)}
        </div>
        <div>
          <p className='text-sm text-slate-500'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
