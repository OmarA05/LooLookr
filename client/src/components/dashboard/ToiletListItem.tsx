import React from 'react';
import clsx from 'clsx';
import { ToiletSummary } from '../../types';
import StarRating from '../toilet/StarRating';

type ToiletListItemProps = {
  toilet: ToiletSummary;
  isSelected?: boolean;
  onSelect?: (id?: string) => void;
};

const ToiletListItem: React.FC<ToiletListItemProps> = ({ toilet, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect?.(toilet.id)}
      className={clsx(
        'w-full rounded-xl border px-4 py-3 text-left transition',
        isSelected
          ? 'border-[var(--uw-gold)] bg-[var(--uw-gold)]/10'
          : 'border-white/5 bg-white/5 hover:border-[var(--uw-gold)]/60 hover:bg-white/10'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-sm uppercase tracking-[0.16em] text-[var(--uw-gold)]">
            {toilet.buildingCode}
          </div>
          <h3 className="text-lg font-semibold">{toilet.name}</h3>
          <p className="text-xs text-gray-400">
            {toilet.buildingCode}
            {toilet.floor ? ` • Floor ${toilet.floor}` : ''}
          </p>
        </div>
        <div className="text-right">
          <StarRating value={toilet.avgStars} />
          <p className="text-xs text-gray-400">{toilet.ratingCount} ratings</p>
        </div>
      </div>
    </button>
  );
};

export default ToiletListItem;
