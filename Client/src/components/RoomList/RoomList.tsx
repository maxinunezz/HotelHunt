import RoomCard from "../RoomCard/RoomCard";
import { roomsStore } from "../../Store";
import { Link } from 'react-router-dom'

const RoomList = () => {
    const roomsHotelId = roomsStore((state) => state.roomsHotelSelect)
    
    const roomsHotelValid = roomsHotelId?.length
    console.log(roomsHotelId[0]);
    
    return (
        <div className="justify-center items-center">   
        <p>{roomsHotelValid } blablablabla</p>   
                {
                    roomsHotelValid ? (roomsHotelId.map((room) => {                        
                        
                        return (                            
                        <Link to={`/roompage/${room.id}`}>
                            <RoomCard
                                key={room.id}
                                id={room.id}
                                name={room.name}
                                description={room.description}
                                price={room.price}
                                pax={room.pax}
                                services={room.services}
                                photo={room.photo}
                                floorNumber={room.floorNumber}
                                disabled={room.disabled}
                            />
                        </Link>

                    )}))
                        :
                        <p>No se encontró nada</p>
                }
            </div>
    )
}

export default RoomList;