import { useParams } from "react-router-dom"
import { roomsStore } from "../../Store"
import { useEffect, useState } from "react"
import { setRoomDetail, useFetchRooms } from "../../hooks"
const RoomPage = () => {
    const { id } = useParams()
    const { setRoom } = roomsStore();
    const [roomRender, setRoomRender] = useState()
    useFetchRooms()
    const allRooms = roomsStore((state) => state.rooms)
    
    
    useEffect(() => {
        const roomOnScreen = allRooms.find((roomRender) => {
            if (typeof roomRender.id === "number") {
                return roomRender.id === Number(id);
            } else {
                return roomRender.id === id;
            }        
        })
        setRoomRender(roomOnScreen)
       
        setRoom(id);
    }, [allRooms, id, setRoom])

    


    return (
        <div className="border-2 bg-yellow-300 items-center w-[80%]">
            <h1>Habitación: {roomRender?.name}</h1> 
            {/* Pedir propiedad name para habitaciones en Back */}
            <h2>Descripción: {roomRender?.description}</h2>
            <h2>Foto: {roomRender?.photo}</h2>
            {/* Acá se cambia la etiqueta h2 por una img */}
            <h2>Services: {roomRender?.services.map((service:string) => {
                return (
                    <h3 key={service}>{service}</h3>
                )
            })}</h2>
            <h1>Precio: {roomRender?.price}</h1>
        </div>
    )
}

export default RoomPage;