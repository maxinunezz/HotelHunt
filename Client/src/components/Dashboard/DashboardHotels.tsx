import DashboardRow from "./DashboardRow";
import { useEffect, useState } from 'react'
import { tokenStore } from "../../Store";
import  NavBarDashboard1  from "./NavBarDashboard1"
import  { getHotels } from '../../utils/GlobalFunction'

export default function DashboardHotel() {
    const { getHotelByUser } = tokenStore()
    const [hotelByUser, setHotelByUser] = useState()
    


    useEffect(() => {
        const hotels = getHotels()
        setHotelByUser(hotels);
        getHotelByUser(hotels);
    }, [])


    return (
        <div className="flex flex-col h-full mt-2 bg-slate-300 rounded-xl">
            <hr />            
            <NavBarDashboard1 />
            <div className="flex flex-col h-full overflow-y-auto">
                {hotelByUser?.length > 0 ? (
                    hotelByUser?.map((element: { id: string, name: string, country: string, city: string, photo: string, disabled: boolean }) => (
                        (
                            <div>
                                <DashboardRow
                                    key={element.id}
                                    id={element.id}
                                    name={element.name}
                                    country={element.country}
                                    city={element.city}
                                    photo={element.photo}
                                    disabled={element.disabled}
                                />
                            </div>
                        )
                    ))
                ) : (
                    <p>No hay hoteles</p>
                )}
            </div>
        </div>
    );
}
