
import { hotelStore } from '../../Store';
import { Link } from 'react-router-dom';

const HotelList = () => {
	const hoteles = hotelStore((state) => state.hotels);
	const totalHoteles = hoteles?.length;

	return (
		<div className="flex flex-col gap-4">
			{totalHoteles ? (
				hoteles.map((hotel) => (
					<Link to={`/hotelpage/${hotel.id}`} key={hotel.id}>
						<div className="bg-white rounded-md shadow-md flex">
							<img src={hotel.photo} alt={hotel.name} className="w-1/4 h-auto object-cover rounded-md" />
							<div className="p-4 flex flex-col justify-between">
								<div>
									<h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
									<p className="text-gray-600">{hotel.description}</p>
									<p className="text-gray-500 mt-2">Ubicación: {hotel.city}, {hotel.country}</p>

								</div>
								<div className="flex justify-end items-center">
									<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
										Reservar
									</button>
								</div>
							</div>
						</div>
					</Link>
				))
			) : (
				<p className="bg-neutral-800">No hay hoteles</p>
			)}
		</div>

	);
};

export default HotelList;
