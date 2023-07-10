import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { hotelStore, searchStore } from '../../Store';
import { Pagination } from '../Pagination/Pagination';

const hotelsPerPage = 3;

const HotelListSearch = () => {
    const { currentPage } = hotelStore((state) => ({
        currentPage: state.currentPage,
    }));
    const searchResults = searchStore((state) => state.searchResults)
    const totalHotels = searchResults?.length;
    const firstIndex = (currentPage - 1) * hotelsPerPage;
    const lastIndex = currentPage * hotelsPerPage;
    const currentHotels = searchResults?.slice(firstIndex, lastIndex);

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
        </div>
    );
};

export default HotelListSearch;
