import {  useEffect, useState } from "react"
import { errorToast } from "../toast";
import SARowRoom from "./SARowRooms";
import axios from "axios";
import NavSADBRoom from "../NavBar/NavRoomSA";
import { SAStore, tokenStore } from "../../Store";
const url = import.meta.env.VITE_URL;

const SARooms = () => {
    const [roomByUser, setRoomByUser] = useState([])
    const update = SAStore((state) => state.updated)
    const userData = tokenStore((state) => state.userState);

    const roomsAdmin = async () => {
        try {
            const response = await axios.get(
                `${url}/room/admin`,{
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            )
            if (response.data) {
                setRoomByUser(response.data)
            }
        } catch (error:any) {
            errorToast(error.response.data);

        }
    }

    useEffect(() => {
        roomsAdmin()
    }, [])
    useEffect(() => {
        roomsAdmin()
    }, [update])

    return (
        <div className="flex flex-col bg-slate-100 rounded-lg p-4 h-full overflow-hidden">
            <NavSADBRoom />
            <div className="flex flex-col h-full overflow-y-auto">
                {
                    roomByUser?.length > 0 ? (
                        roomByUser?.map((element: { id: string, hotelName: string,  name: string, photo: [], disabled:boolean}) => (
                            <div>
                                <SARowRoom
                                    key={element.id}
                                    id={element.id}
                                    name={element.name}
                                    hotelName={element.hotelName}
                                    photo={element.photo}
                                    disabled={element.disabled}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No rooms</p>
                    )
                }
            </div>

        </div>
    )
}

export default SARooms;