import axios from 'axios';
import { create } from 'zustand';

type States = {
	searchResults: any[];
};

type Actions = {
	fetchSearchResults: (data: {}) => Promise<void>;
	reset: () => void;
};

const initialState: States = {
	searchResults: [],
};

export const searchStore = create<States & Actions>((set) => ({
	...initialState,

	fetchSearchResults: async (data) => {
		
		console.log(data);
		return await axios.post(
			`http://localhost:3001/hotel/search`, data
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

/* type Actions = {
	fetchSearchResults: (data: {}) => Promise<void>;
	reset: () => void;
};
---
export const searchStore = create<States & Actions>((set) => ({
	...initialState,

	fetchSearchResults: async (data) => {
		
		console.log(data);
		return await axios.post(
			`http://localhost:3001/hotel/search`, data
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

----

const [data, setData] = useState({
		criterion: "",
		value: "",
	})
	const { fetchSearchResults } = searchStore()


	const handleSearch = async () => {
		console.log("Estoy en el handler");
		
		if(!selectedOption) {
			return
		}
		setData({
			criterion: selectedOption,
			value: input,
		})

		await fetchSearchResults(data);
		
		
	} */