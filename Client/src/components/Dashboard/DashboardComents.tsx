import axios from "axios";
import { tokenStore } from '../../Store';
import { useEffect } from "react";
import { useState } from "react";

interface Ratings {
    hotel: string;
    coments: string;
    score: number;
}

export default function ComentsDashboard() {
    const [ratings, setRatings] = useState<Ratings[]>([]);
    const url = import.meta.env.VITE_URL;
    const token = tokenStore((state) => state.userState);
    const [, setError] = useState<string>("");



    useEffect(() => {
        getRatings();
    }, []); // eslint-disable-line

    const getRatings = async () => {
        try {
            const response = await axios.get(`${url}/dashboard/rating`, {
                headers: {
                    authorization: `Bearer ${token[1]}`
                }
            });
            const ratings: Ratings[] = response.data;
            setRatings(ratings);

        } catch (error:any) {
            setError(error.response.data);
        }
    }


    return (
        <div className="p-[20px] bg-slate-600 rounded-lg h-full w-full shadow-md border border-gray-300">


            <h2 className="text-3xl font-semibold mb-4 text-white shadow-md bg-gradient-to-r from-slate-900 to-slate-900 px-4 py-2 rounded-lg">
                COMENTARIOS
            </h2>


            <div className="overflow-x-auto w-[1545px] max-h-[820px] overflow-y-auto">
                <ul className="space-y-4 my-4">
                    {ratings.length > 0 ? (
                        ratings.map((rating, index) => (
                            <li
                                key={index}
                                className={`p-4 rounded-lg transition duration-300 ease-in-out ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    } hover:bg-gray-100 border border-gray-200`}
                            >

                                <h3 className="text-xl font-semibold mb-2">{rating.hotel}</h3>
                                <p className="text-lg whitespace-wrap break-words">{rating.coments}</p>
                                <p className="text-lg whitespace-nowrap">Calificación: {rating.score}</p>
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="p-8 rounded-lg border border-red-500 bg-red-500 text-white text-center">
                                <p className="text-lg font-bold mb-2">No existen comentarios</p>
                                <p className="text-base">¡Sé el primero en dejar un comentario!</p>
                            </div>
                        </div>

                    )}
                </ul>
            </div>
        </div>

    );
}