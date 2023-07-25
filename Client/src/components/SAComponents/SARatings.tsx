import { useEffect, useState } from 'react'
import { tokenStore, SAStore } from "../../Store";
import axios from "axios";
import NavRating from '../NavBar/NavSARatings';
import RatingRow from './SARatingRow';



export default function SARatings() {
    const [ratings, setRatings] = useState<any[]>([])
    const update = SAStore((state) => state.updated)
    const userData = tokenStore((state)=> state.userState)
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
        <div className="flex flex-col h-full mt-2 bg-slate-300 rounded-xl">
            <hr />            
            <NavRating />
            <div className="flex flex-col h-full overflow-y-auto">
                {ratings?.length > 0 ? (
                    ratings?.map((element: { id: string, userName: string, hotelName: string, comment: string, score: number }) => (
                        (
                            <div key={element.id}>
                                <RatingRow
                                    key={element.id}
                                    id={element.id}
                                    userName={element.userName}
                                    hotelName={element.hotelName}
                                    comment={element.comment}
                                    score={element.score}
                                />
                            </div>
                        )
                    ) )
                ) : (
                    <p>No hay comentarios</p>
                ) }
            </div>
        </div>
    );
}
