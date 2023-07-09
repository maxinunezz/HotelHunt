import { useEffect } from 'react';
import { roomsStore } from '../Store';

export const useFetchRooms = (id:any) => {
	const { fetchRooms } = roomsStore();
	// const hoteles = hotelStore(state=> state.hotels)  llamar estado

	useEffect(() => {
		fetchRooms(id);
	}, [fetchRooms]);
};