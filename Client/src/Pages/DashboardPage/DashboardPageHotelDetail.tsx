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
        <div className="flex flex-col bg-slate-100 rounded-lg p-4 h-full overflow-hidden">
            <h1>Hotel: {hotelonScreen.name}</h1>
            <div className="flex flex-col h-full overflow-y-auto">
                {
                    roomByUser?.length > 0 ? (
                        roomByUser?.map((element: { id: string, name: string, photo: string[], pax: number, disabled:boolean}) => (
                            <div onClick={()=> navigate(`/roompage/${element.id}`)} key={element.id}>
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
                        <p>No rooms</p>
                    )
                }
            </div>
            <button onClick={() => navigate(`/formRoom`)}>Add room</button>
            <button className="bg-teal-600" onClick={() => navigate(-1)}>Back</button>

        </div>
    )
}

export default DashboardPageHotelDetail;