import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: api.getRecommendations,
  });
};