import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { hotelStore, searchStore } from '../../Store';
import { Pagination } from '../Pagination/Pagination';
import { PaginadoGlobal } from '../Pagination/PaginadoGlobal';


const HotelListSearch = () => {
    const hotelsPerPage = 3; //primer parametro del paginado
    const currentPageSearch = searchStore((state) => state.currentPageSearch)   //cuarto y ultimo parametro de paginado, la página actual
    
    const { setCurrentPageSearch } = searchStore()

    const searchResults = searchStore((state) => state.searchResults)   //para este componente, este es el segundo parametro del paginado

    const totalHotels = searchResults?.length;
    const firstIndex = (currentPageSearch - 1) * hotelsPerPage;
    const lastIndex = currentPageSearch * hotelsPerPage;
    const currentHotels = searchResults?.slice(firstIndex, lastIndex);

    const handlePaginado = (pageNumber) => {       //tercer parametro del paginado
        setCurrentPageSearch(pageNumber)
        paginado(pageNumber);

    }



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
                                hotelCategory={hotel.hotelcategory}
                                services={hotel.services}
                            />
                        </Link>
                    ))
                ) : (
                    <p className="bg-neutral-800">No hay hoteles</p>
                )}
            </div>
            <PaginadoGlobal elementsPerPage={hotelsPerPage} elementToShow={searchResults} pageSet={handlePaginado} currentPage={currentPageSearch} />
        </div>
    );
};

export default HotelListSearch;