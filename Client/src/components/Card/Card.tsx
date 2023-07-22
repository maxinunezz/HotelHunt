import axios from 'axios';
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

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={`filled-star-${i}`} className="text-yellow-500">
          ★
        </span>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  const [ratingValue, setRatingValue] = useState<number | null>(null);
useEffect(() => {
  const fetchRating = async () => {
    try {
      const response = await axios.get(`${url}/rating/${id}`);
      const scores = response.data.map((element) => element.score);

      if (Array.isArray(scores) && scores.length > 0) {
        const sum = scores.reduce((acc, score) => acc + score, 0);
        const average = Math.round(sum / scores.length);
        setRatingValue(average);
      } else {
        setRatingValue(null);
      }
    } catch (error) {
      console.log(error);
      setRatingValue(null);
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
            'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
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
            <div className='flex'>
            <p className='mr-2'>Categoría de hotel:</p>
              {renderStars(Number(hotelCategory))}
            </div>
            <div className='flex'>
            {ratingValue !== null ? (
                <p>Calificación Popular: {ratingValue}</p>
              ) : (
                <p>Calificación Popular: Sin calificación aún</p>
              )}
          </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Ver habitaciones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
