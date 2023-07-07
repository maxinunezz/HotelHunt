import { roomsStore } from "../../Store";
import {  useFetchRooms } from "../../hooks";

const HotelPage = () => {
    useFetchRooms();
    const allRooms = roomsStore((state)=> state.rooms);
    console.log(allRooms);

    return (
        <div>
            k pasa larvas
        </div>
    )
}

export default HotelPage;