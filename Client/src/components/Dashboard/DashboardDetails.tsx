import DashboardRow from "./DashboardRow";
import { hotelStore } from "../../Store/HotelsStore";
import { Hotel } from '../../models/hotel';
import { useEffect } from 'react'

export default function DashboardDetails() {
    const fetchHotels = hotelStore((state) => state.fetchHotels);
    const hoteles = hotelStore((state) => state.hotels)

    useEffect(() => {
        fetchHotels();
    }, [fetchHotels])

    return (
        <div className="flex flex-col h-full mt-2 bg-slate-300 rounded-xl">
            <DashboardRow
                name=""
                country=""
                city=""
                photo=""
            />
            <hr />
            <div className="flex flex-col h-full overflow-y-auto">
                {hoteles?.length > 0 ? (
                    hoteles.map((hotel: Hotel, index: number) => (
                        index > 0 ? (
                            <DashboardRow
                                key={hotel.id}
                                name={hotel.name}
                                country={hotel.country}
                                city={hotel.city}
                                photo={hotel.photo}
                            />
                        ) : null
                    ))
                ) : (
                    <p>No hay hoteles</p>
                )}
            </div>
        </div>
    );
}