import { useParams, useNavigate } from "react-router-dom";
import { roomsStore } from "../../Store";
import { useEffect, useState } from "react";
import { setRoomDetail, useFetchRooms } from "../../hooks";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NavbarDetail from "../../components/NavBarDetail/NavBarDetail";
import Footer from "../../components/Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tokenStore } from "../../Store";
import { string } from "yup";
import { userStore } from "../../Store/UserStore";
import {
  reserveErrorToast,
  reserveSuccessToast1,
  reserveFullToast,
  noDatesToast,
  mustLoginToast, // Agregado: Toast de fechas faltantes
} from "../../components/toast";
import { toast } from "react-hot-toast";

export interface ReserveBooking {
  roomId: string;
  checkin: string;
  checkout: string;
  price: string;
}

const RoomPage = () => {
  const { id } = useParams();
  const { setRoom } = roomsStore();
  const [roomRender, setRoomRender] = useState();
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [date, setDate] = useState({ in: "", out: "" });
  const [reserve, setReserve] = useState<ReserveBooking[] | null>(null);
  const token = tokenStore((state) => state.userState);
  const room = roomsStore((state) => state.rooms);
  const { reserveRoomPayment } = userStore();
  const userReserve = userStore((state) => state.reserves);
  const navigate = useNavigate();

  useFetchRooms();
  const allRooms = roomsStore((state) => state.rooms);

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

  const images = roomRender?.photo.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const handleArrivalDateChange = (date) => {

    const currentDate = new Date();

    if (date.getTime() < currentDate.getTime()) {
      reserveErrorToast("No se puede reservar con una fecha anterior a la actual");
      return;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setArrivalDate(date);
    setDate((state) => ({ ...state, in: formattedDate }));
  };

  const handleDepartureDateChange = (date) => {

    const currentDate = new Date();

    if (date.getTime() < currentDate.getTime()) {
      reserveErrorToast("No se puede reservar con una fecha anterior a la actual");
      return;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setDepartureDate(date);
    setDate((state) => ({ ...state, out: formattedDate }));
  };

  const calculateDays = (item) => {
    const checkinDate = new Date(item.checkin);
    const checkoutDate = new Date(item.checkout);

    const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays;
  };

  const handleReserve = () => {
    console.log(token);
    if(token.length === 0) {
      mustLoginToast("Please login or signup to reserve a room")
      navigate('/login')
      return
    }
    
    if (userReserve.length === 4) {
      reserveFullToast("4 reservas máximas");
      return false;
    }

    if (!date.in || !date.out) {
      noDatesToast(); // Agregado: Mostrar toast de fechas faltantes
      return;
    }

    const newReserve: ReserveBooking = {
      roomId: id,
      checkin: date.in,
      checkout: date.out,
      price: roomRender?.price,
    };

    if (calculateDays(newReserve) < 1) {
      reserveErrorToast("Establezca al menos una noche");
      return;
    }

    setReserve([newReserve]);

    for (let i = 0; i < userReserve.length; i++) {
      if (userReserve[i].roomId === newReserve.roomId) {
        console.log("Esta habitación ya tiene una reserva activa");
        reserveErrorToast("Esta habitación ya tiene una reserva activa");
        return;
      }
    }

    reserveRoomPayment([...userReserve, newReserve]);
    reserveSuccessToast1();
  };
  console.log(userReserve);

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
                  <div className="flex justify-start mt-2">
                    <div className="flex items-center">
                      <DatePicker
                        selected={arrivalDate}
                        onChange={handleArrivalDateChange}
                        placeholderText="Fecha de llegada"
                        className="border-2 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 border-blue-500"
                        popperClassName="text-black"
                      />
                      <DatePicker
                        selected={departureDate}
                        onChange={handleDepartureDateChange}
                        placeholderText="Fecha de salida"
                        className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 border-blue-500"
                        popperClassName="text-black"
                      />
                    </div>
                  </div>
                  <div className="flex justify-start mt-4">
                    <h2 className="text-lg font-bold">Precio: $ {roomRender?.price}</h2>
                    <button
                      onClick={handleReserve}
                      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                    >
                      Reservar
                    </button>
                  </div>
                  <div className="bg-gray-200 p-4 rounded mt-5 shadow-lg border border-black">
                    <p className="text-gray-800">{roomRender?.description}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-[500px] md:ml-[30px] inline-block">
              <h2 className="text-2xl font-bold mt-4 mb-2">Servicios:</h2>
              <ul className="list-disc list-inside border-2 rounded shadow-lg">
                {roomRender?.services.map((service) => (
                  <li key={service} className="text-lg text-gray-800">
                    {service}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate(-1)} className="bg-blue-500 font-bold w-[80px] border-black rounded">Back</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomPage;
