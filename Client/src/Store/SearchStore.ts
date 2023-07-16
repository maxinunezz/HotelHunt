import axios from 'axios';
import { create } from 'zustand';
import { Hotel } from '../models';

type States = {
	searchResults: Hotel[];
	currentPageSearch: number;
};

type Actions = {
	fetchSearchResults: (data: {}) => Promise<void>;
	setCurrentPageSearch: (newPages:any) => void;
	reset: () => void;
	orderByNameSearch: (array:Hotel[], event:string) => void;
	orderByCategorySearch: (array:Hotel[], event:string) => void;
};

const initialState: States = {
	searchResults: [],
	currentPageSearch: 1
};

export const searchStore = create<States & Actions>((set) => ({
	...initialState,

	fetchSearchResults: async (data) => {
		
		
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
			if (a.hotelcategory > b.hotelcategory) {
				return 1
			}
			if (a.hotelcategory < b.hotelcategory) {
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
				if (a.hotelcategory > b.hotelcategory) {
					return -1
				}
				if (a.hotelcategory < b.hotelcategory) {
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