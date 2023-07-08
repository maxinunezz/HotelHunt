import RoomCard from "../RoomCard/RoomCard";
import { roomsStore } from "../../Store";
import { Link } from 'react-router-dom'

const RoomList = () => {
    const roomsHotelId = roomsStore((state) => state.rooms)
    const roomsHotelValid = roomsHotelId?.length
    return (
        <div className="justify-center items-center">      
                {
                    roomsHotelValid ? (roomsHotelId.map((room) => (
                        <Link to={`/roompage/${room.id}`}>
                            <RoomCard
                                key={room.id}
                                id={room.id}
                                name={room.name}
                                description={room.description}
                                pax={room.pax}
                                services={room.services}
                                photo={room.photo}
                            />
                        </Link>

                    )))
                        :
                        <p>No se encontró nada</p>
                }
            </div>
    )
}

export default RoomList;