import { useParams } from "react-router-dom"
import { roomsStore } from "../../Store"
import { useEffect, useState } from "react"
import { setRoomDetail, useFetchRooms } from "../../hooks"
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import NavbarDetail from '../../components/NavBarDetail/NavBarDetail';
import Footer from "../../components/Footer/Footer";


const RoomPage = () => {
    const { id } = useParams()
    const { setRoom } = roomsStore();
    const [roomRender, setRoomRender] = useState()
    useFetchRooms()
    const allRooms = roomsStore((state) => state.rooms)
    console.log(allRooms);

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

    const images = roomRender?.photo.map(url => ({
        original: url,
        thumbnail: url
    }));




    return (
        <div>
            <NavbarDetail />
            <div className="border-2 bg-white p-4 rounded-lg h-screen flex justify-end items-center">
            <div className="flex flex-col items-center">
                    <div className="flex flex-col md:flex-row  ">
                        <div className="md:w-[900px] mb-2 md:justify-center md:items-center">
                            {roomRender?.photo && (
                                <div className="w-full h-auto">
                                    <h1 className="text-2xl font-bold mb-4">Habitación: {roomRender?.name}</h1>
                                    <ImageGallery items={images} className="w-full h-full object-cover" />
                                    <div className="flex justify-start mt-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                            Reservar
                                        </button>
                                        <h2 className="text-lg text-[25px] font-bold ml-2">Precio: $ {roomRender?.price}</h2>
                                    </div>
                                    <p className="mt-4">{roomRender?.description}</p>
                                </div>
                            )}
                        </div>
                        <div className="md:w-[400px] md:ml-4">
                            <h2 className="text-lg font-bold mt-[40px] mb-2">Servicios:</h2>
                            <ul className="list-disc list-inside mb-4 ml-4">
                                {roomRender?.services.map((service: string) => (
                                    <li key={service}>{service}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default RoomPage;