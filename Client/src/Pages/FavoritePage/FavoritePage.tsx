import Card from "../../components/Card/Card";
import { hotelStore, tokenStore } from "../../Store";
import PaginadoGlobal from "../../components/Pagination/PaginadoGlobal";
import { userStore } from "../../Store/UserStore";
import { useEffect } from "react";
import { favoriteStore } from "../../Store/FavoriteStore";
import NavbarDetail from "../../components/NavBarDetail/NavBarDetail";

const FavoritePage = () => {
  const hotelsPerPage = 3; //primer parametro del paginado

  const { setCurrentPageFavorites, setHotelFavorites } = favoriteStore();
  const { favorites, currentPageFavorites } = favoriteStore((state) => state);
  const { getFavorite } = userStore();
  const token = tokenStore((state) => state.userState);
  const hotelFavorite=userStore(state=>state.favoriteHotel)
  const hotels=hotelStore(state=>state.hotels)

  useEffect(() => {
    // fetchHotels();
    getFavorite(token[1]);
  }, [token]);

  useEffect(()=>{
    const hotelFavorites = hotels.filter(hotel=> hotelFavorite.includes(hotel.id))
    
       setHotelFavorites(hotelFavorites)
        
    }, [hotelFavorite])
      

  const totalHotels = favorites?.length;
  const firstIndex = (currentPageFavorites - 1) * hotelsPerPage;
  const lastIndex = currentPageFavorites * hotelsPerPage;
  const currentHotels = favorites?.slice(firstIndex, lastIndex);

  const handlePaginado = (pageNumber: any) => {
    //tercer componente del paginado
    setCurrentPageFavorites(pageNumber);
  };


  

  return (
    <div>

      <div><NavbarDetail/></div>
      <div className="flex flex-col gap-4">
        {totalHotels ? (
          currentHotels.map((hotel) => (
            <Card
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              description={hotel.description}
              country={hotel.country}
              city={hotel.city}
              photo={Array.isArray(hotel.photo) ? hotel.photo[0] : hotel.photo}
              hotelCategory={hotel.hotelCategory}
              services={hotel.services}
              score={hotel.score}
            />
          ))
        ) : (
          <p className="bg-neutral-800">No hay hoteles favoritos</p>
        )}
      </div>
      <div>
      <PaginadoGlobal
        elementsPerPage={hotelsPerPage}
        elementToShow={favorites}
        pageSet={handlePaginado}
        currentPage={currentPageFavorites}
      />
      </div>
    </div>
  );
};

export default FavoritePage;
