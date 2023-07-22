import { Buildings } from "@phosphor-icons/react";
import axios from "axios";
import { hotelStore } from "../../Store";
import { useEffect, useState } from "react";
import { Hotel } from "../../models";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL;

interface CardProps {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  photo: string[];
  services: string[];
  hotelCategory: string;
  score: number;
}

const Card: React.FC<Hotel> = ({
  id,
  name,
  description,
  country,
  city,
  photo,
  hotelCategory,
}) => {

  const hotelFavorite = hotelStore((state)=>state.favoriteHotel)
  const { addFavorite, deleteFavorite } = hotelStore();


  const renderStars = (rating: number) => {
    const filledStars = rating;
    const emptyStars = 5 - rating;

    const stars = [];

    // Renderizar estrellas llenas
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={`filled-star-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    // Renderizar estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };


  const renderIcon = (score: number) => {
    const icons = [];

    for (let i = 0; i < score; i++) {
      icons.push(<Buildings key={`building-${i}`} size={32} />);
    }

    return icons;
  };
  
 const isFav = hotelFavorite.some((favHotel) => favHotel.id === id);
  const handleFavorite = () => {
   
    const hotel ={
      id,
      name,
      description,
      country,
      city,
      photo,
      hotelCategory,
      score: ratingValue || 0, // Supongo que deseas guardar el rating actual en el estado

    }
  
    if (!isFav) {
      addFavorite(hotel);

    } else {
      deleteFavorite(id);



    }
  
     // Cambiar el estado local a su valor opuesto (true -> false, false -> true)
  };

  console.log(hotelFavorite);
  
  


  const [ratingValue, setRatingValue] = useState<number | null>(null);
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${url}/rating/${id}`);
        const score = response.data[0].score;
     

        setRatingValue(score);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRating();
  }, [id]);

  return (
  
    <div className="bg-white h-[460px] max-w-5xl rounded-md shadow-md flex mx-auto transform hover:scale-105 transition duration-300">
  
        <img
        src={photo}
        alt={name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
        }}
        className="w-1/3 h-full object-cover rounded-l-md"
      />
     
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-1">{name}</h2>
            <p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis">
              {description}
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              Ubicación: {city}, {country}
            </p>
          </div>
          <div> 
            <div className="flex">
              <p>Hotel category: </p>
              {renderStars(Number(hotelCategory))}
            </div>
            <div className="flex">
              <p>Popular rating:</p>
              {/* Renderizar el icono de Phosphor repetidamente */}
              {ratingValue !== null && renderIcon(ratingValue)}
            </div>
          </div>
          <div className="flex justify-end">
       
          <button onClick={handleFavorite}>{isFav ? "💚" : "🤍"}</button>
           
        </div> 
          </div>
      </div>
    </div>  
  );
};

export default Card;
