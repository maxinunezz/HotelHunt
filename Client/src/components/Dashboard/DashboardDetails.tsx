import DashboardRow from "./DashboardRow";
import { useEffect, useState } from 'react'
import { tokenStore } from "../../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardDetails() {
    const { getHotelByUser } = tokenStore()
    const navigate = useNavigate()
    const token = tokenStore((state) => state.userState)

    const [hotelByUser, setHotelByUser] = useState()

    const getHotels = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/dashboard/',
                {
                    headers:
                    {
                        authorization:
                            `Bearer ${token[1]}`,
                    },
                },
            )
            console.log(token[0])
            if (response.data) {

                setHotelByUser(response.data);
                getHotelByUser(response.data);
            }
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getHotels()
    }, [])


    return (
        <div className="flex flex-col h-full mt-2 bg-slate-300 rounded-xl">
            <hr />
            <div className="flex flex-col h-full overflow-y-auto">
                {hotelByUser?.length > 0 ? (
                    hotelByUser?.map((element: { id: string, name: string, country: string, city: string, photo: string }) => (
                        (
                            <div onClick={() => navigate(`/dashboard/hoteldetail/${element.id}`)}>
                                <DashboardRow
                                    key={element.id}
                                    id={element.id}
                                    name={element.name}
                                    country={element.country}
                                    city={element.city}
                                    photo={element.photo}
                                />
                            </div>
                        )
                    ))
                ) : (
                    <p>No hay hoteles</p>
                )}
            </div>
        </div>
    );
}