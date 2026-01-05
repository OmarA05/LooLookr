export type LatLng = { lat: number; lng: number };

export type ToiletSummary = {
  id: string;
  name: string;
  buildingCode: string;
  floor?: string;
  location: LatLng;
  avgStars: number;
  ratingCount: number;
  score: number;
};

export type Rating = {
  stars: number;
  comment?: string;
  createdAt: string;
};

export type ToiletDetail = ToiletSummary & {
  buildingName?: string;
  gender?: string;
  ratings?: Rating[];
};

export type User = {
  id: string;
  email: string;
  userName?: string;
};
