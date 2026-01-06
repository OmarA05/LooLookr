export interface Bathroom {
  _id: string;
  name: string;
  buildingCode: string;
  buildingName: string;
  location: { lat: number; lng: number };
  tags?: string[];
  avgRating?: number;
  ratingCount?: number;
  score?: number;
}

export interface RatingSummary {
  bathroomId: string;
  avgRating: number;
  ratingCount: number;
}
