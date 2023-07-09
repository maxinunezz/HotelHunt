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
	changeCurrentPage: (payload: number | boolean) => void;
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
			pageNumbers: calculatePageNumbers(data.length),
			currentPage: 1,
		}));
	},

	changeCurrentPage: (payload) => {
		set((state) => ({
			...state,
			currentPage:
				typeof payload === 'number'
					? payload
					: payload
					? state.currentPage + 1
					: state.currentPage - 1,
		}));
	},
}));
