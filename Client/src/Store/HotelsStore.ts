import axios from 'axios';
import { create } from 'zustand';
import { Hotel } from '../models';


type States = {
	hotels: Hotel[];
	currentPage: number;
	pageNumbers: number[];
};

type Actions = {
	fetchHotels: () => Promise<void>;
	setCurrentPage: (pageNum: number) => void;
	orderByName: (array: Hotel[], event: string) => void;
	orderByCategory: (array: Hotel[], event: string) => void;
	resetHotels: () => void;
};

const initialState: States = {
	hotels: [],
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
	orderByName: (array, event) => {



		if (event === 'ASC') {
			const arrayAux = array.sort(function (a, b) {
				if (a.name > b.name) {
					return 1
				}
				if (a.name < b.name) {
					return -1
				}
				return 0
			})
			set((state) => ({
				...state,
				hotels: arrayAux,
			}));
		}

		else if (event === 'DES') {
			const arrayAux = array.sort((a, b) => b.name.localeCompare(a.name));
			set((state) => ({
				...state,
				hotels: arrayAux,
			}))

		}
	},
	orderByCategory: (array, event) => {
		if (event === 'ASC') {
			const arrayAux = array.sort((a, b) => parseInt(a.hotelCategory) - parseInt(b.hotelCategory));
			set((state) => ({
				...state,
				hotels: arrayAux,
			}));
		} else if (event === 'DES') {
			const arrayAux = array.sort((a, b) => parseInt(b.hotelCategory) - parseInt(a.hotelCategory));
			set((state) => ({
				...state,
				hotels: arrayAux,
			}));
		}
	},


	resetHotels: () => {
		set(initialState);
	},


}));
