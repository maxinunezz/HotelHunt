import { useEffect } from 'react';
import { hotelStore } from '../Store';

export const useFetchHotels = () => {
	const { fetchHotels } = hotelStore();

	useEffect(() => {
		fetchHotels();
	}, [fetchHotels]);
};
