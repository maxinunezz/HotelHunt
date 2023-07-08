import { useParams } from "react-router-dom"
import { roomsStore } from "../../Store"
const RoomPage = () => {
    const { id } = useParams()
    const hotelSelectedRooms = roomsStore((state) => state.rooms)

    const roomOnScreen = hotelSelectedRooms.find((room) => {
        if (typeof room.id === "number") {
            return room.id === Number(id);
        } else {
            return room.id === id;
        }        
    })

    console.log(roomOnScreen);
    return (
        <div className="border-2 bg-rose-600 items-center w-[80%]">
            <h1>Habitación: {roomOnScreen?.name}</h1> 
            {/* Pedir propiedad name para habitaciones en Back */}
            <h2>Descripción: {roomOnScreen?.description}</h2>
            <h2>Foto: {roomOnScreen?.photo}</h2>
            {/* Acá se cambia la etiqueta h2 por una img */}
            <h2>Services: {roomOnScreen?.services}</h2>
        </div>
    )
}

export default RoomPage;