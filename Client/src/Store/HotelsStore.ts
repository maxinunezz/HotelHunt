import axios from 'axios';
import { create } from 'zustand';
import { Hotel } from '../models';
import calculatePageNumbers from '../utils/calculatePageNamber';

type States = {
	hotels: Hotel[];
	searchResoults: any[];
	currentPage: number;
	pageNumbers: number[];
};

type Actions = {
	fetchHotels: () => Promise<void>;
	setCurrentPage: (pageNum) => void;
};

const initialState: States = {
	hotels: [],
	searchResoults: [],
	currentPage: 1,
	pageNumbers: [],
};

export const hotelStore = create<States & Actions>((set) => ({
	...initialState,

	fetchHotels: async () => {
		const { data } = await axios.get<Hotel[]>('http://localhost:3001/hotel');

		set((state) => ({
			...state,
			hotels: data,
		}));
	},

	setCurrentPage: (pageNum) => {
		set(() => ({
			currentPage: pageNum
		}))
	},
}));
