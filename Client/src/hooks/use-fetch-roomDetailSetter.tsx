import { useEffect } from 'react';
import { roomsStore } from '../Store';

export const setRoomDetail = (id:any) => {
	const { setRoom } = roomsStore();
	// const hoteles = hotelStore(state=> state.hotels)  llamar estado

	useEffect(() => {
		setRoom(id);
	}, [setRoom]);
};