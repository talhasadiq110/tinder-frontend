import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useLikedList = () => {
  return useQuery({
    queryKey: ['liked'],
    queryFn: api.getLikedPeople,
  });
};