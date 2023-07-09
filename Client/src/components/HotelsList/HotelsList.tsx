import { hotelStore } from '../../Store';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

const HotelList = () => {
	const hoteles = hotelStore((state) => state.hotels);
	const totalHoteles = hoteles?.length;

		<div className="flex flex-col gap-4">
			{totalHoteles ? (
				hoteles.map((hotel) => (
					<Link to={`/hotelpage/${hotel.id}`} key={hotel.id}>
						<Card
							key={hotel.key}
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
	);
};

export default HotelList;
