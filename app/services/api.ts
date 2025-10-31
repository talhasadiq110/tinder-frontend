import { LikedResponse, RecommendationsResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Get recommendations
  getRecommendations: async (): Promise<RecommendationsResponse> => {
    const response = await fetch(`${API_BASE_URL}/recommendations`);
    return response.json();
  },

  // Like a person
  likePerson: async (personId: number): Promise<{ message: string; success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/like/${personId}`, {
      method: 'GET',
    });
    return response.json();
  },

  // Dislike a person
  dislikePerson: async (personId: number): Promise<{ message: string; success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/dislike/${personId}`, {
      method: 'GET',
    });
    return response.json();
  },

  // Get liked people
  getLikedPeople: async (): Promise<LikedResponse> => {
    const response = await fetch(`${API_BASE_URL}/liked`);
    return response.json();
  },
};