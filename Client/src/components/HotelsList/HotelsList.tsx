import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { hotelStore } from "../../Store";
import PaginadoGlobal from "../Pagination/PaginadoGlobal";

const HotelList = () => {
  const hotelsPerPage = 3; //Primer parametro del paginado global
  const { setCurrentPage, addFavorite, deleteFavorite } = hotelStore();
  const { hotels, currentPage, favoriteHotel } = hotelStore((state) => ({
    hotels: state.hotels, //segundo parámetro del paginadoGlobal
    currentPage: state.currentPage,
    favoriteHotel: state.favoriteHotel,
  }));
  const totalHotels = hotels?.length;
  const firstIndex = (currentPage - 1) * hotelsPerPage;
  const lastIndex = currentPage * hotelsPerPage;
  const currentHotels = hotels?.slice(firstIndex, lastIndex);

  const handlePaginadoHome = (pageNumbers:any) => {
    //tercer componente del paginado
    setCurrentPage(pageNumbers);
    PaginadoGlobal(pageNumbers);
  };



  return (
    <div>
      <div className="flex flex-col gap-4">
        {totalHotels ? (
          currentHotels.map((hotel) => (
            // <Link to={`/hotelpage/${hotel.id}`} key={hotel.id}>
              <Card
              key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                description={hotel.description}
                country={hotel.country}
                city={hotel.city}
                photo={hotel.photo}
                hotelCategory={hotel.hotelCategory}
                services={hotel.services}
                score={hotel.score}
              />
            // </Link>
          ))
        ) : (
          <p className="bg-neutral-800">No hay hoteles</p>
        )}
      </div>
      <PaginadoGlobal
        elementsPerPage={hotelsPerPage}
        elementToShow={hotels}
        pageSet={handlePaginadoHome}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HotelList;
