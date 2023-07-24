import axios from 'axios';
import { create } from 'zustand';
import { Hotel } from '../models';
const url = import.meta.env.VITE_URL;

type States = {
	searchResults: Hotel[];
	currentPageSearch: number;
};

type Actions = {
 
	orderByNameSearch: (array:Hotel[], event:string) => void;
	orderByCategorySearch: (array:Hotel[], event:string) => void;
	setCurrentPageSearch:(pageNum:number)=>void;
	reset:()=>void;
};

const initialState: States = {
	searchResults: [],
	currentPageSearch: 1
};

export const searchStore = create<States & Actions>((set) => ({
	...initialState,

	fetchSearchResults: async (data:any) => {
		
		
		return await axios.post(
			`${url}/hotel/search`, data
		).then((response) => {
			if(response.data.length > 0) {
				const result = response.data;
				
				set((state) => ({
					...state,
					searchResults: result,
				}))
			}
		}).catch((error) => {
			console.error(error, "Server Error");
		})
		
	},
	setCurrentPageSearch: (pageNum) => {
		set(() => ({
			currentPageSearch: pageNum
		}))
	},

	reset: () => {
		set(initialState);
	},

	orderByNameSearch: (array, event) => {
		
     

		if(event==='ASC'){
		const arrayAux = array.sort(function(a,b) {
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
			searchResults: arrayAux,
		}));}

		else if(event==='DES'){
			const arrayAux = array.sort((a, b) => b.name.localeCompare(a.name));
			set((state) => ({
				...state,
				searchResults: arrayAux,
			}))

		}
	},
	orderByCategorySearch: (array, event) => {
		
		if(event==='ASC'){
		const arrayAux = array.sort(function(a,b) {
			if (a.hotelCategory > b.hotelCategory) {
				return 1
			}
			if (a.hotelCategory < b.hotelCategory) {
				return -1
			}
			return 0
		})
		set((state) => ({
			...state,
			searchResults: arrayAux,
			
		}));}

		else if(event==='DES'){
			const arrayAux = array.sort(function (a, b) {
				if (a.hotelCategory > b.hotelCategory) {
					return -1
				}
				if (a.hotelCategory < b.hotelCategory) {
					return 1
				}
				return 0
			})
			set((state) => ({
				...state,
				searchResults: arrayAux,
				
				
			}))

		}
	},
}));





