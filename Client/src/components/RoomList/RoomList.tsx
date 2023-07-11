import RoomCard from '../RoomCard/RoomCard';
import { roomsStore } from '../../Store';
import { Link } from 'react-router-dom';
import { RoomsPagination } from '../Pagination/RoomsPagination';

const roomsPerPage = 3;

const RoomList = () => {
	const { roomsHotelSelect, currentPage } = roomsStore((state) => ({
		roomsHotelSelect: state.roomsHotelSelect,
		currentPage: state.currentPage,
	}));	

	const totalRooms = roomsHotelSelect?.length;
	const firstIndex = (currentPage - 1) * roomsPerPage;
	const lastIndex = currentPage * roomsPerPage;
	const currentRooms = roomsHotelSelect?.slice(firstIndex, lastIndex);
	console.log(currentRooms);

	return (
		<div>
			<div className="grid grid-cols-3 justify-center mb-4 gap-5">
				{totalRooms ? (
					currentRooms.map((room) => {
						return (
							<Link to={`/roompage/${room.id}`} key={room.id}>
								<RoomCard
									id={room.id}
									name={room.name}
									description={room.description}
									price={room.price}
									pax={room.pax}
									services={room.services}
									photo={room.photo}
									floorNumber={room.floorNumber}
									disabled={room.disabled}
								/>
							</Link>
						);
					})
				) : (
					<p>No se encontró nada</p>
				)}
			</div>
			<RoomsPagination />
		</div>
	);

};

export default RoomList;
