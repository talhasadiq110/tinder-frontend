import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { api } from '../services/api';
import { likedPeopleState, swipeHistoryState } from '../store/atoms';
import { Person } from '../types';

export const useSwipeActions = () => {
  const queryClient = useQueryClient();
  const setLikedPeople = useSetRecoilState(likedPeopleState);
  const setSwipeHistory = useSetRecoilState(swipeHistoryState);

  const likeMutation = useMutation({
    mutationFn: api.likePerson,
    onSuccess: (data, personId) => {
      // Invalidate recommendations to refresh the list
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      
      // Update liked people list
      if (data.success) {
        setLikedPeople(prev => {
          // Find the person in current recommendations and add to liked
          const recommendations = queryClient.getQueryData<{ data: Person[] }>(['recommendations']);
          const person = recommendations?.data.find(p => p.id === personId);
          return person ? [...prev, person] : prev;
        });
      }
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: api.dislikePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  return {
    likePerson: (personId: number) => likeMutation.mutate(personId),
    dislikePerson: (personId: number) => dislikeMutation.mutate(personId),
    isLoading: likeMutation.isPending || dislikeMutation.isPending,
  };
};