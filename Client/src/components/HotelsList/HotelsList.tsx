import Card from '../Card/Card';
import { hotelStore } from '../../Store';
import { Link } from 'react-router-dom';

const HotelList = () => {
	const hoteles = hotelStore((state) => state.hotels);
	const totalHoteles = hoteles?.length;
	console.log(hoteles);
	

	return (
		<div>
			<div>
				{totalHoteles ? (
					hoteles.map((hotel) => (
						<Link to={`/hotelpage/${hotel.id}`}>x	
							<Card
								key={hotel.id}
								id={hotel.id}
								name={hotel.name}
								description={hotel.description}
								country={hotel.country}
								city={hotel.city}
								photo={hotel.photo}
								maxCapacity={hotel.maxCapacity}
							/>
						</Link>

					))
				) : (
					<p className="bg-neutral-800">No hay hoteles</p>
				)}
			</div>
		</div>
	);
};

export default HotelList;
