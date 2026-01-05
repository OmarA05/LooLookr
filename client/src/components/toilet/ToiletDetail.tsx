import React, { useState } from 'react';
import { ToiletDetail as ToiletDetailType } from '../../types';
import StarRating from './StarRating';
import StarRatingInput from './StarRatingInput';
import { useRateToilet } from '../../hooks/useToilet';
import { useToast } from '../../hooks/useToast';

type ToiletDetailProps = {
  toilet?: ToiletDetailType;
};

const ToiletDetail: React.FC<ToiletDetailProps> = ({ toilet }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const { showToast } = useToast();
  const mutation = useRateToilet(toilet?.id);

  if (!toilet) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-gray-300">
        Select a bathroom to view details.
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stars) {
      showToast('Please pick a star rating', 'error');
      return;
    }
    try {
      await mutation.mutateAsync({ stars, comment: comment || undefined });
      showToast('Rating saved', 'success');
      setComment('');
      setStars(0);
    } catch (error) {
      showToast('Could not save rating', 'error');
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 p-6 shadow-card">
      <div className="flex flex-col gap-2 border-b border-white/5 pb-4">
        <div className="text-sm uppercase tracking-[0.18em] text-[var(--uw-gold)]">
          {toilet.buildingCode}
        </div>
        <h1 className="text-2xl font-semibold">{toilet.name}</h1>
        <p className="text-gray-300">
          {toilet.buildingName || toilet.buildingCode} {toilet.floor ? `• Floor ${toilet.floor}` : ''}
        </p>
        <StarRating value={toilet.avgStars} />
        <p className="text-xs text-gray-400">{toilet.ratingCount} ratings</p>
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">Rate this bathroom</h3>
          <p className="text-sm text-gray-400">0-5 stars, optional comment.</p>
        </div>
        <StarRatingInput value={stars} onChange={setStars} />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={280}
          placeholder="Add an optional comment (max 280 chars)"
          className="min-h-[120px] rounded-lg border border-white/10 bg-white/5 p-3 text-white focus:border-[var(--uw-gold)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="self-start rounded-lg bg-[var(--uw-gold)] px-4 py-2 font-semibold text-black transition hover:brightness-90 disabled:opacity-60"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit rating'}
        </button>
      </form>

      {toilet.ratings && toilet.ratings.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Recent ratings</h3>
          <div className="flex flex-col gap-2">
            {toilet.ratings.slice(0, 3).map((rating, idx) => (
              <div
                key={`${rating.createdAt}-${idx}`}
                className="rounded-lg border border-white/5 bg-white/5 p-3 text-sm"
              >
                <div className="flex items-center justify-between">
                  <StarRating value={rating.stars} size="sm" showNumber={false} />
                  <span className="text-xs text-gray-400">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && <p className="mt-2 text-gray-200">{rating.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToiletDetail;
