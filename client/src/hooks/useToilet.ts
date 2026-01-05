import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchToilet, rateToilet } from '../api/toilets';

export const useToilet = (id?: string) => {
  return useQuery({
    queryKey: ['toilet', id],
    queryFn: () => fetchToilet(id as string),
    enabled: Boolean(id),
  });
};

export const useRateToilet = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stars, comment }: { stars: number; comment?: string }) =>
      rateToilet(id as string, stars, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topToilets'] });
      queryClient.invalidateQueries({ queryKey: ['toilet', id] });
    },
  });
};
