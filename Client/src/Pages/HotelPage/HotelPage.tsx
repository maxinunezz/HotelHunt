import { useParams } from "react-router-dom";
import {useEffect} from 'react'
import { hotelStore, roomsStore } from "../../Store";
import {  useFetchHotels, useFetchRooms } from "../../hooks";
import RoomList from "../../components/RoomList/RoomList";

const HotelPage = () => {
    const {id} = useParams()
    useFetchRooms(id);
    useFetchHotels();
    const allRooms = roomsStore((state)=> state.rooms);
    const allHotels = hotelStore((state)=> state.hotels);
    console.log(allRooms);
    console.log(allHotels);

    const hotelOnScreen = allHotels.find((hotel) => {
        if (typeof hotel.id === "number") {
            return hotel.id === Number(id);
        } else {
            return hotel.id === id;
        }
    })
    
    return (
        <div className="bg-teal-800 justify-center items-center">
            <h1 className="bg-lime-700 w-[70%]">Bienvenido a {`${hotelOnScreen?.name}`} </h1> 
            {/* Error de typecript, no rompe la app, pero debería poder definirse de forma correcta */}
           <RoomList/> 
        </div>
    )
}

export default HotelPage;