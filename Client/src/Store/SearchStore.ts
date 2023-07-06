import axios from 'axios';
import { create } from 'zustand';

type States = {
	searchResults: any[];
};

type Actions = {
	fetchSearchResults: (criterio: string, value: string) => Promise<void>;
	reset: () => void;
};

const initialState: States = {
	searchResults: [],
};

export const searchStore = create<States & Actions>((set) => ({
	...initialState,

	fetchSearchResults: async (data) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		}
		return await axios.get(
			`http://localhost:3001/hotel/search`, 
			config
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

	reset: () => {
		set(initialState);
	},
}));
