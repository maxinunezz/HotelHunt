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
		const search = await axios.post(
			`http://localhost:3001/hotels/search`,
			data
		);
		const searchData = search.data;

		set((state) => ({
			...state,
			searchResults: searchData,
		}));
	},

	reset: () => {
		set(initialState);
	},
}));
