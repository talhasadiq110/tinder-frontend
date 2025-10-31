export interface Person {
  id: number;
  name: string;
  age: number;
  location: string;
  picture: string;
  created_at: string;
  updated_at: string;
}

export interface SwipeAction {
  type: 'like' | 'dislike';
  personId: number;
}

export interface RecommendationsResponse {
  message: string;
  count: number;
  data: Person[];
}

export interface LikedResponse {
  message: string;
  count: number;
  data: Person[];
}