import { useQuery } from '@tanstack/react-query';
import { fetchTopToilets, ToiletFilters } from '../api/toilets';

export const useTopToilets = (filters?: ToiletFilters) => {
  return useQuery({
    queryKey: ['topToilets', filters],
    queryFn: () => fetchTopToilets(filters),
  });
};
