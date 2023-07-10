import { useEffect } from 'react';
import { hotelStore } from '../Store';

export const useFetchHotels = () => {
	const { fetchHotels } = hotelStore();
	// const hoteles = hotelStore(state=> state.hotels)  llamar estado

	useEffect(() => {
		fetchHotels();
	}, [fetchHotels]);
};
