import { Buildings } from '@phosphor-icons/react';
import { Button } from '@rewind-ui/core';
import axios from 'axios';
import { tokenStore } from '../../Store';
import { log } from 'console';
import { useEffect, useState } from 'react';
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

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  country,
  city,
  photo,
  services,
  hotelCategory,
  score
}) => {

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
      icons.push(<Buildings key={`building-${i}`} size={32} color='darkblue' />);
    }

    return icons;
  };
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${url}/rating/${id}`);
        const scores = response.data.map((element) => element.score);
        const sum = scores.reduce((acc, score) => acc + score, 0);
        const average = Math.round(sum / scores.length);
        setRatingValue(average);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRating();
  }, [id]);

  const orderedServices = () => {
    const stringRaw = services.join(', ');
    return stringRaw
  }

  return (
    <div className="bg-white h-[480px] max-w-5xl rounded-md shadow-md flex mx-auto transform hover:scale-105 transition duration-300">
      {/* Hotel Photo */}
      <img
        src={photo}
        alt={name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
        }}
        className="w-1/3 h-full object-cover rounded-l-md"
      />
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="h-full flex flex-col justify-between">
          {/* Hotel Name (made it larger) */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <div className="flex justify-start mt-auto">
              <p className="text-gray-500 text-sm mb-4">
                Ubicación: {city}, {country}
              </p>
            </div>
            <p className="text-black text-sm  text-[18px] ">
              {description}
            </p>
          </div>
          {/* Ordered Services */}
          {/*<div>
            <p>Servicios: {orderedServices()}</p>
          </div>*}
          {/* Hotel Category and Popular Rating */}
          <div>
            <div className='flex text-[20px] mt-[100px]'>
              <p>Calificación popular:</p>
              {/* Render the Phosphor icon repeatedly */}
              {ratingValue !== null && renderIcon(ratingValue)}
            </div>

            <div className='flex mt-'>
              <p className='text-[20px]'>Categoria:{renderStars(Number(hotelCategory))} </p>

            </div>
          </div>
          {/* "Ver habitaciones" button */}
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Ver habitaciones
            </button>
          </div>
        </div>
        {/* Hotel Location (moved it to the leftmost side) */}

      </div>
    </div>
  );


};

export default Card;
