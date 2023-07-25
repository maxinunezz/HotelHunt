import {  useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { tokenStore } from "../../Store";
import DashboardRowRoom from "../../components/Dashboard/DashboardRowRoom";
import axios from "axios";
import { Room } from "../../Store";
const url = import.meta.env.VITE_URL;

const DashboardPageHotelDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const token = tokenStore((state) => state.userState)
    const hotelsUser = tokenStore((state) => state.hotelsUserById)
    console.log(hotelsUser);

    const [roomByUser, setRoomByUser] = useState<Room[]>([])


    const hotelonScreen = hotelsUser.find((hotel) => {
        if (typeof hotel.id === 'number') {
            return hotel.id === Number(id);
        } else {
            return hotel.id === id;
        }
    })
    console.log(hotelonScreen);
    const roomsInThisHotel = async () => {
        try {
            const response = await axios.get(
                `${url}/dashboard/room/${hotelsUser[0].id}`,
                {
                    headers:
                    {
                        authorization:
                            `Bearer ${token[1]}`,
                    },
                }
            )
            if (response.data) {
                setRoomByUser(response.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        roomsInThisHotel()
    }, [])

    return (
        <div className="flex flex-col bg-slate-600 rounded-lg p-4 h-screen overflow-hidden">
            <h1 className="text-3xl font-semibold text-white mb-4">Hotel: {hotelonScreen.name}</h1>
            <div className="flex flex-col h-full overflow-y-auto">
                {roomByUser?.length > 0 ? (
                    roomByUser?.map((element: { id: string, name: string, photo: string[], pax: number, disabled: boolean }) => (
                        <div
                            key={element.id}
                            onClick={() => navigate(`/roompage/${element.id}`)}
                            className="cursor-pointer transition-transform transform hover:scale-95"
                        >
                            <DashboardRowRoom
                                id={element.id}
                                name={element.name}
                                photo={element.photo}
                                pax={element.pax}
                                disabled={element.disabled}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center flex-grow">
                        <div className="p-8 rounded-lg border border-red-500 bg-red-500 text-white text-center">
                            <p className="text-lg font-bold mb-2">No hay habitaciones</p>
                            <p className="text-base">¡Agrega una nueva habitación para empezar!</p>
                        </div>
                    </div>
                )}
            </div>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-teal-600" onClick={() => navigate(`/formRoom`)}>
                Agregar habitación
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600" onClick={() => navigate(-1)}>
                Volver
            </button>
        </div>

    );


}

export default DashboardPageHotelDetail;