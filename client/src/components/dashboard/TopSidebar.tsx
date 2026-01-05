import React, { useMemo } from 'react';
import { ToiletSummary } from '../../types';
import ToiletListItem from './ToiletListItem';

export type SidebarFilters = {
  buildingCode?: string;
  search?: string;
};

type TopSidebarProps = {
  toilets?: ToiletSummary[];
  isLoading?: boolean;
  filters: SidebarFilters;
  onFiltersChange: (filters: SidebarFilters) => void;
  selectedId?: string;
  onSelect?: (id?: string) => void;
};

const TopSidebar: React.FC<TopSidebarProps> = ({
  toilets,
  isLoading,
  filters,
  onFiltersChange,
  selectedId,
  onSelect,
}) => {
  const buildingOptions = useMemo(() => {
    if (!toilets) return [];
    const unique = new Set(toilets.map((t) => t.buildingCode));
    return Array.from(unique);
  }, [toilets]);

  return (
    <div className="glass shadow-card flex h-full max-h-[calc(100vh-80px)] w-full flex-col rounded-3xl border border-white/10 p-6">
      <div className="mb-4 flex flex-col gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--uw-gold)]">Leaderboard</p>
          <h2 className="text-2xl font-semibold">Top 10 Bathrooms</h2>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-300">
            Building
            <select
              value={filters.buildingCode || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, buildingCode: e.target.value || undefined })
              }
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-[var(--uw-gold)] focus:outline-none"
            >
              <option value="">All</option>
              {buildingOptions.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-gray-300">
            Search
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              placeholder="Search building, floor, name..."
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-[var(--uw-gold)] focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {isLoading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-16 animate-pulse rounded-xl bg-white/10" />
            ))}
          </div>
        )}
        {!isLoading && toilets && toilets.length === 0 && (
          <div className="text-sm text-gray-400">No bathrooms found.</div>
        )}
        {!isLoading && toilets && toilets.length > 0 && (
          <div className="flex flex-col gap-3">
            {toilets.map((toilet) => (
              <ToiletListItem
                key={toilet.id}
                toilet={toilet}
                isSelected={toilet.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSidebar;
