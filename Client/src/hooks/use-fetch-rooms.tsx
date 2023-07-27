import { useEffect } from 'react';
import { roomsStore } from '../Store';

export const useFetchRooms = () => {
	const { fetchRooms } = roomsStore();
	// const hoteles = hotelStore(state=> state.hotels)  llamar estado

	useEffect(() => {
		fetchRooms();
	}, [fetchRooms]);
};