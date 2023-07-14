import { useNavigate, useParams } from "react-router-dom";
import { roomsStore } from "../../Store";
import { useEffect, useState } from "react";
import { setRoomDetail, useFetchRooms } from "../../hooks";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import NavbarDetail from '../../components/NavBarDetail/NavBarDetail';
import Footer from "../../components/Footer/Footer";

const RoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setRoom } = roomsStore();
  const [roomRender, setRoomRender] = useState();
  useFetchRooms();
  const allRooms = roomsStore((state) => state.rooms);
  console.log(allRooms);

  useEffect(() => {
    const roomOnScreen = allRooms.find((roomRender) => {
      if (typeof roomRender.id === "number") {
        return roomRender.id === Number(id);
      } else {
        return roomRender.id === id;
      }
    });
    setRoomRender(roomOnScreen);
    setRoom(id);
  }, [allRooms, id, setRoom]);

  const images = roomRender?.photo.map(url => ({
    original: url,
    thumbnail: url
  }));

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavbarDetail />
      <div className="border-4 border-blue-500 bg-white p-20 min-h-screen flex justify-end items-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 md:ml-auto"></div>
            <div className="md:w-1/2 mb-2 md:justify-center md:items-center">
              {roomRender?.photo && (
                <div className="w-full h-auto">
                  <h1 className="text-2xl font-bold mb-4">Habitación: {roomRender?.name}</h1>
                  <div className="w-full h-90 overflow-hidden shadow-lg">
                    <ImageGallery items={images} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-start mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                      Reservar
                    </button>
                    <h2 className="text-lg font-bold ml-4">Precio: $ {roomRender?.price}</h2>
                  </div>
                  <div className="bg-gray-200 p-4 rounded mt-4 shadow-lg border border-black">
                    <p className="text-gray-800">{roomRender?.description}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-[500px] md:ml-[30px] inline-block">
              <h2 className="text-2xl font-bold mt-4 mb-2">Servicios:</h2>
              <ul className="list-disc list-inside border-2 rounded shadow-lg">
                {roomRender?.services.map((service) => (
                  <li key={service} className="text-lg text-gray-800">{service}</li>
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
