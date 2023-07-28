import { create } from 'zustand';
import { Hotel } from '../models';

type States = {
	favorites: Hotel[];
	currentPageFavorites: number;
};

type Actions = {
    setHotelFavorites:(data:Hotel[]) => void;
    setCurrentPageFavorites: (pageNum:number) => void;

};

const initialState: States = {
	favorites: [],
	currentPageFavorites: 1
};

export const favoriteStore = create<States & Actions>((set) => ({
	...initialState,

	setHotelFavorites:(data) => {
		
		set(() => ({
			favorites: data
		}))
		
	},
	setCurrentPageFavorites: (pageNum) => {
		set(() => ({
			currentPageFavorites: pageNum
		}))
	},

	reset: () => {
		set(initialState);
	},

	
	
}));





