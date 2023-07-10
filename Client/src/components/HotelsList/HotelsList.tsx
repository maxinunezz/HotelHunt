import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { hotelStore } from '../../Store';
import { Pagination } from '../Pagination/Pagination';

const hotelsPerPage = 3;

const HotelList = () => {
	const { hotels, currentPage } = hotelStore((state) => ({
		hotels: state.hotels,
		currentPage: state.currentPage,
	}));

	const totalHotels = hotels?.length;
	const firstIndex = (currentPage - 1) * hotelsPerPage;
	const lastIndex = currentPage * hotelsPerPage;
	const currentHotels = hotels?.slice(firstIndex, lastIndex);

	return (
		<div>
			<div className="flex flex-col gap-4">
				{totalHotels ? (
					currentHotels.map((hotel) => (
						<Link to={`/hotelpage/${hotel.id}`} key={hotel.id}>
							<Card
								id={hotel.id}
								name={hotel.name}
								description={hotel.description}
								country={hotel.country}
								city={hotel.city}
								photo={hotel.photo}
							/>
						</Link>
					))
				) : (
					<p className="bg-neutral-800">No hay hoteles</p>
				)}
			</div>
			<Pagination />{' '}
		</div>
	);
};

export default HotelList;
