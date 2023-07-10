import DashboardRow from "./DashboardRow";
import { hotelStore } from "../../Store/HotelsStore";
import { Hotel } from '../../models/hotel';
import { useEffect, useState } from 'react'
import { tokenStore } from "../../Store";
import axios from "axios";

export default function DashboardDetails() {

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
                            `Bearer ${token[0]}`
                    },
                },
            )
            if (response.data) {
                setHotelByUser(response.data);
            }
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getHotels()
    }, [])

    console.log(hotelByUser);

    return (
        <div className="flex flex-col h-full mt-2 bg-slate-300 rounded-xl">
            <hr />
            <div className="flex flex-col h-full overflow-y-auto">
                {hotelByUser?.length > 0 ? (
                    hotelByUser?.map((element: {id:string, name:string, country:string, city:string, photo:string}) => (
                        (
                            <DashboardRow
                                key={element.id}
                                name={element.name}
                                country={element.country}
                                city={element.city}
                                photo={element.photo}
                            />
                        )
                    ))
                ) : (
                    <p>No hay hoteles</p>
                )}
            </div>
        </div>
    );
}