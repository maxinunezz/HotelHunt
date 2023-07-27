import { useEffect, useState } from 'react'
import { tokenStore, SAStore } from "../../Store";
import axios from "axios";
import NavRating from '../NavBar/NavSARatings';
import RatingRow from './SARatingRow';



export default function SARatings() {
    const [ratings, setRatings] = useState<any[]>([])
    const update = SAStore((state) => state.updated)
    const userData = tokenStore((state) => state.userState)
    const url = import.meta.env.VITE_URL;


    const getRatings = async () => {
        try {
            const response = await axios.get(
                `${url}/rating`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            )
            if (response.data) {
                setRatings(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getRatings()
    }, [])
    useEffect(() => {
        getRatings()
    }, [update])



    return (
        <div className="flex flex-col h-full mt-2 bg-slate-600 rounded-xl p-4">
            <NavRating />
            <div className="flex flex-col h-full mt-4">
                {ratings?.length > 0 ? (
                    ratings?.map((element: { id: string, userName: string, hotelName: string, comment: string, score: number }) => (
                        <div key={element.id} className="mb-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-95">
                            <RatingRow
                                id={element.id}
                                userName={element.userName}
                                hotelName={element.hotelName}
                                comment={element.comment}
                                score={element.score}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-grow items-center justify-center p-4 bg-white rounded-lg shadow-md">
                        <p className="text-red-600 font-medium">No hay comentarios</p>
                    </div>
                )}
            </div>
        </div>


    );
}
