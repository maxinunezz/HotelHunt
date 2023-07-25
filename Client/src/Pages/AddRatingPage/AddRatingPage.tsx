import React, { useEffect, useState } from 'react';
import { hotelStore } from '../../Store';
import axios from 'axios';
import {UserState} from '../../Store/TokenStore'

const url = import.meta.env.VITE_URL;



const CommentForm: React.FC = () => {
    const [score, setScore] = useState<number | undefined>(undefined);
    const [comment, setComment] = useState<string>('');
    const { fetchHotels } = hotelStore();
    const [token, setToken] = useState<UserState | undefined>();
    const [hotelId, setHotelId] = useState("");
    const userId = token?.[0]?.id
    useEffect(() => {
        const storedToken = window.localStorage.getItem("tokenInfo");
        if (storedToken) {
            // Si el token ya está almacenado en el localStorage, obtén y parsea el valor
            setToken(JSON.parse(storedToken));
        }
        const storedHotelId = window.localStorage.getItem("hotelId");
        if (storedHotelId) {
            // Si el token ya está almacenado en el localStorage, obtén y parsea el valor
            setHotelId(storedHotelId);
        }

        fetchHotels();
    }, []);
    
    const authorizationHeader = token ? { authorization: `Bearer ${token[1]}` } : {};
  
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (score !== undefined && comment.trim() !== '') {
            const response = await axios.post(
                `${url}/rating`,
                {
                    hotelId: hotelId,
                    userId: userId,
                    comment: comment,
                    score: score,
                },
                {
                    headers: {
                        authorization: `Bearer ${authorizationHeader}`,
                    },
                }
            );
            console.log(response.data);
            window.close();
        } else {
            // Si los inputs no son válidos, puedes mostrar un mensaje de error o hacer alguna otra acción
            console.log('Por favor, completa ambos campos antes de enviar el comentario.');
        }
    };
    
    return (
        <div className="w-80 mx-auto mt-8">
        <div className="bg-slate-700 rounded-lg shadow-lg p-4 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-black">Agregar Comentario</h2>
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="score" className="text-lg font-medium mb-2 text-black">
                Puntaje:
              </label>
              <input
                id="score"
                type="number"
                min="1"
                max="5"
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value, 10))}
                required
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="comment" className="text-lg font-medium mb-2 text-black">
                Comentario:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Enviar comentario
            </button>
          </form>
        </div>
      </div>
      
    );
};

export default CommentForm;
