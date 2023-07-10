import { useParams } from 'react-router-dom';
import { hotelStore, roomsStore } from '../../Store';
import { useFetchHotels, useHotelIdSetter } from '../../hooks';
import RoomList from '../../components/RoomList/RoomList';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';

const HotelPage = () => {
	const { id } = useParams();
	const [roomsId, setroomsId] = useState([]);
	
	const { hotelIdSetter } = roomsStore();

	useFetchHotels();
	const allHotels = hotelStore((state) => state.hotels);

	useEffect(() => {
		const hotelOnScreen = allHotels.find((hotel) => {
			if (typeof hotel.id === 'number') {
				return hotel.id === Number(id);
			} else {
				return hotel.id === id;
			}
		});
		setroomsId(hotelOnScreen);
		

		hotelIdSetter(hotelOnScreen?.roomsId);
	}, [allHotels, hotelIdSetter, id]);

	return (
		<div className="bg-black h-screen flex flex-col overflow-hidden">
			<NavBar />
			<div className="flex-grow mt-20">
				<div className="max-w-screen-lg mx-auto p-8">
					<div className="mt-2 flex justify-between">
						<div className="w-1/3 mr-6">
							<div className="w-full h-full rounded-lg overflow-hidden">
								<img
									src={roomsId?.photo}
									alt="Foto de la habitación"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
						<div className="w-2/3">
							<div className="bg-white p-6 rounded-lg shadow-lg">
								<h2 className="text-3xl font-bold mb-4">{roomsId?.name}</h2>
								<h3 className="text-lg font-bold mb-4">Descripción</h3>
								<p>{roomsId?.description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-screen-lg mx-auto p-8 mt-8">
				{roomsId ? <RoomList /> : <p className="text-white">No hay habitaciones disponibles.</p>}
			</div>
		</div>
	);










};

export default HotelPage;
