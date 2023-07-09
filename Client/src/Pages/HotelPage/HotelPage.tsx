import { useParams } from "react-router-dom";
import { hotelStore, roomsStore } from "../../Store";
import { useFetchHotels, useHotelIdSetter } from "../../hooks";
import RoomList from "../../components/RoomList/RoomList";
import { useEffect, useState } from "react";

const HotelPage = () => {
    const { id } = useParams()
    const [roomsId, setroomsId] = useState([])
    console.log(id);
    const { hotelIdSetter } = roomsStore();

    useFetchHotels();
    const allHotels = hotelStore((state) => state.hotels);

    useEffect(() => {
        const hotelOnScreen = allHotels.find((hotel) => {
            if (typeof hotel.id === "number") {
                return hotel.id === Number(id);
            } else {
                return hotel.id === id;
            }
        })
        setroomsId(hotelOnScreen)
        console.log("que es esto?"+hotelOnScreen);
        
        hotelIdSetter(hotelOnScreen?.roomsId);

    }, [allHotels, hotelIdSetter, id])
    

      



    return (
        <div className="bg-teal-800 justify-center items-center">
            <h1 className="bg-lime-700 w-[70%]">Bienvenido a {`${roomsId?.name}`} </h1>
            <img src={roomsId?.photo}></img>
            {/* Error de typecript, no rompe la app, pero debería poder definirse de forma correcta */}
            {
                roomsId ? <RoomList /> : "no hay hotelon screenm"
            }

        </div>
    )
}

export default HotelPage;