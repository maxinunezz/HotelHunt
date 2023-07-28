import DashboardRow from "./DashboardRow";
import { useEffect, useState } from 'react'
import { tokenStore } from "../../Store";
import axios from "axios";
import NavBarDashboard1 from "./NavBarDashboard1";
import { DashStore } from "../../Store";


export default function DashboardHotel() {
    const { getHotelByUser } = tokenStore()
    const token = tokenStore((state) => state.userState)
    const url = import.meta.env.VITE_URL;
    const update = DashStore((state) => state.updated)


    const [hotelByUser, setHotelByUser] = useState<any[]>([])

    const getHotels = async () => {
        try {
            const response = await axios.get(
                `${url}/dashboard`,
                {
                    headers:
                    {
                        authorization:
                            `Bearer ${token[1]}`,
                    },
                },
            )
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
    useEffect(() => {
        getHotels()
    }, [update])



    return (
        <div className="flex flex-col h-full bg-slate-600 rounded-xl shadow-md border border-gray-300">
            <NavBarDashboard1 />

            <div className="flex flex-col h-full overflow-y-auto">
                {hotelByUser?.length > 0 ? (
                    hotelByUser?.map((element: { id: string, name: string, country: string, city: string, photo: string, disabled: boolean }) => (
                        <div
                            key={element.id}
                            className="p-4 transition-transform transform hover:scale-95"
                        >
                            <DashboardRow
                                id={element.id}
                                name={element.name}
                                country={element.country}
                                city={element.city}
                                photo={element.photo}
                                disabled={element.disabled}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col h-full items-center justify-center">
                        <div className="bg-red-500 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">No hay hoteles</p>
                            <p className="text-white text-base">¡Agrega un nuevo hotel para empezar!</p>
                        </div>
                    </div>

                )}
            </div>
        </div>

    );
}
