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
    const [error, setError] = useState<string>("");



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

        } catch (error) {
            setError(error.response.data);
        }
    }


    return (
        <div className="flex">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 flex-grow">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="flex justify-center items-center">
                            <div className="text-2xl font-bold mb-4 mt-16">Comentarios</div>
                        </div>
                        <table className="min-w-full">
                            <thead className="bg-gray-200 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Hotel
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Comentario
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Calificación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(ratings.length > 0) ? (ratings.map((rating, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {rating.hotel}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {rating.coments}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {rating.score}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td
                                            colSpan={6} 
                                            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                        >
                                            {error}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}