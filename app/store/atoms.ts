import { atom } from 'recoil';
import { Person } from '../types';

export const likedPeopleState = atom<Person[]>({
  key: 'likedPeopleState',
  default: [],
});

export const swipeHistoryState = atom<Array<{ type: 'like' | 'dislike'; person: Person }>>({
  key: 'swipeHistoryState',
  default: [],
});