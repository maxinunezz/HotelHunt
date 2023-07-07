import Card from '../Card/Card';
import { hotelStore } from '../../Store';

const HotelList = () => {
	const hoteles = hotelStore((state) => state.hotels);
	const totalHoteles = hoteles?.length;

	return (
		<div>
			<div>
				{totalHoteles ? (
					hoteles.map((hotel) => (
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
					))
				) : (
					<p className="bg-neutral-800">No hay hoteles</p>
				)}
			</div>
		</div>
	);
};

export default HotelList;
