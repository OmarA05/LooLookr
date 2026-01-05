import React from 'react';
import clsx from 'clsx';

type StarRatingProps = {
  value: number;
  showNumber?: boolean;
  size?: 'sm' | 'md';
};

const StarRating: React.FC<StarRatingProps> = ({ value, showNumber = true, size = 'md' }) => {
  const stars = Array.from({ length: 5 }, (_, idx) => idx + 1);
  const starSize = size === 'sm' ? 16 : 20;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={starSize}
            height={starSize}
            className={clsx('transition', {
              'text-[var(--uw-gold)] fill-[var(--uw-gold)]': value >= star - 0.25,
              'text-gray-500 fill-transparent stroke-gray-500': value < star - 0.25,
            })}
          >
            <path
              fill="currentColor"
              d="M12 .587l3.668 7.431L24 9.753l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.6 0 9.753l8.332-1.735z"
            />
          </svg>
        ))}
      </div>
      {showNumber && <span className="text-sm text-gray-300">{value.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
