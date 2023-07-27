import { useEffect } from 'react';
import { roomsStore } from '../Store';

export const useHotelIdSetter = (roomsHotelSelected:[]) => {
	const { hotelIdSetter } = roomsStore();
	// const hoteles = hotelStore(state=> state.hotels)  llamar estado

	useEffect(() => {
		hotelIdSetter(roomsHotelSelected);
	}, [hotelIdSetter]);
};