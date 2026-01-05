import { api } from './client';
import type { ToiletDetail, ToiletSummary } from '../types';

export type ToiletFilters = {
  buildingCode?: string;
  search?: string;
  minStars?: number;
  nearLat?: number;
  nearLng?: number;
  radiusMeters?: number;
};

export const fetchTopToilets = async (filters?: ToiletFilters) => {
  const params: Record<string, string | number> = {
    limit: 10,
  };

  if (filters?.buildingCode) params.buildingCode = filters.buildingCode;
  if (filters?.search) params.search = filters.search;
  if (filters?.minStars) params.minStars = filters.minStars;
  if (filters?.nearLat && filters?.nearLng) {
    params.nearLat = filters.nearLat;
    params.nearLng = filters.nearLng;
  }
  if (filters?.radiusMeters) params.radiusMeters = filters.radiusMeters;

  const { data } = await api.get<ToiletSummary[]>('/api/toilets/top', { params });
  return data;
};

export const fetchToilet = async (id: string) => {
  const { data } = await api.get<ToiletDetail>(`/api/toilets/${id}`);
  return data;
};

export const rateToilet = async (id: string, stars: number, comment?: string) => {
  const { data } = await api.post<ToiletDetail>(`/api/toilets/${id}/rate`, {
    stars,
    comment,
  });
  return data;
};
