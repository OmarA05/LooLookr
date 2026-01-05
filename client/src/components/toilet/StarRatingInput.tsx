import React from 'react';
import clsx from 'clsx';

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

const StarRatingInput: React.FC<StarRatingInputProps> = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
          aria-label={`Rate ${star} stars`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={26}
            height={26}
            className={clsx('transition', {
              'text-[var(--uw-gold)] fill-[var(--uw-gold)] drop-shadow-lg': value >= star,
              'text-gray-500 fill-transparent stroke-gray-500': value < star,
            })}
          >
            <path
              fill="currentColor"
              d="M12 .587l3.668 7.431L24 9.753l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.6 0 9.753l8.332-1.735z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
