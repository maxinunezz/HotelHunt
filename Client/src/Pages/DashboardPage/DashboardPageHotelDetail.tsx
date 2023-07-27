import { React } from "react"
import { useParams } from "react-router-dom";
import { tokenStore } from "../../Store";

const DashboardPageHotelDetail = () => {
    const { id } = useParams()
    const hotelsUser = tokenStore((state) => state.hotelsUserById)
    console.log(hotelsUser);
    
    const hotelonScreen = hotelsUser.find((hotel) => {
        if (typeof hotel.id === 'number') {
            return hotel.id === Number(id);
        } else {
            return hotel.id === id;
        }
    })
    console.log(hotelonScreen);
    
    return (
        <div className="flex flex-col bg-slate-100 rounded-lg p-4 h-full overflow-hidden">
            <h1>Hotel: {hotelonScreen.name}</h1>
            {
                hotelonScreen?.length ?
                hotelonScreen.roomsId.map((room) => {
                    return (
                        <div>
                            <h2>{room.name}</h2>
                            <h2>{room.price}</h2>
                            <h2>{room.pax}</h2>
                        </div>
                    )
                }) :
                <div className="text-red-600">
                    No hay habitaciones!!!
                </div>
            }
        </div>
    )
}

export default DashboardPageHotelDetail;