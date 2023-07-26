import { useParams, useNavigate } from "react-router-dom";
import { Room, hotelStore, roomsStore } from "../../Store";
import { useEffect, useState } from "react";
import { useFetchRooms } from "../../hooks";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NavbarDetail from "../../components/NavBarDetail/NavBarDetail";
import Footer from "../../components/Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tokenStore } from "../../Store";
import { userStore } from "../../Store/UserStore";
import { parseISO, addDays, isWithinInterval, format } from "date-fns";
const url = import.meta.env.VITE_URL;

import {
  reserveErrorToast,
  reserveSuccessToast1,
  reserveFullToast,
  mustLoginToast,
} from "../../components/toast";

export interface ReserveBooking {
  roomId: string;
  checkin: string;
  checkout: string;
  price: number;
}

const RoomPage = () => {
  const { id } = useParams();
  const { setRoom } = roomsStore();
  const [roomRender, setRoomRender] = useState<Room | null>();
  const [arrivalDate, setArrivalDate] = useState<Date | null>();
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [date, setDate] = useState({ in: "", out: "" });
  const [reservesOnScreen, setReservesOnScreen] = useState<ReserveBooking[]>(
    []
  );
  const token = tokenStore((state) => state.userState);
  const { reserveRoomPayment } = userStore();

  const reservesInScreen = async () => {
    try {
      const response = await axios.get(`${url}/booking/all/${id}`);
      const rawData = response.data;

      // Formatear las fechas en los datos recibidos sin incluir la hora
      const formattedData = rawData.map((item: any) => ({
        ...item,
        checkin: new Date(item.checkin).toISOString().slice(0, 10),
        checkout: new Date(item.checkout).toISOString().slice(0, 10),
      }));

      setReservesOnScreen(formattedData);

      return formattedData;
    } catch (error) {
      console.error("Error fetching reserves:", error);
      // Aquí puedes agregar lógica para manejar el error, como mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    reservesInScreen();
  }, []);

  const getNextReservationDate = (checkInDate: Date): Date => {
    const nextReservation = reservesOnScreen.find(
      (reserve) => parseISO(reserve.checkin) > checkInDate
    );

    return nextReservation ? parseISO(nextReservation.checkin) : new Date();
  };

  const getBlockedDates = () => {
    const blockedDates: Date[] = [];

    reservesOnScreen.forEach((reserve) => {
      const checkinDate = parseISO(reserve.checkin);
      const checkoutDate = parseISO(reserve.checkout);
      let currentDate = new Date(checkinDate);

      while (
        !isWithinInterval(currentDate, {
          start: checkoutDate,
          end: addDays(checkoutDate, 1),
        })
      ) {
        blockedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return blockedDates;
  };

  const blockedDates = getBlockedDates();

  const userReserve = userStore((state) => state.reserves);
  const navigate = useNavigate();
  useFetchRooms();
  const allRooms = roomsStore((state) => state.rooms);
  const allHotels = hotelStore((state) => state.hotels);

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

  const images =
    roomRender?.photo.map((url) => ({
      original: url,
      thumbnail: url,
    })) || [];

  const currentDate = new Date();

  const handleArrivalDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      setArrivalDate(date);
      setDate((state) => ({ ...state, in: formattedDate }));

      const nextReservationDate = getNextReservationDate(date);
      if (nextReservationDate) {
        setDepartureDate(nextReservationDate); // Establecer el max date del datepicker de "checkout" con la siguiente reserva disponible
      } else {
        setDepartureDate(null);
      }
    }
  };

  const handleDepartureDateChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      setDepartureDate(date);
      setDate((state) => ({ ...state, out: formattedDate }));

      if (arrivalDate && getNextReservationDate(arrivalDate)) {
        const nextReservationDate = getNextReservationDate(arrivalDate);
        if (date > nextReservationDate) {
          setDepartureDate(nextReservationDate); // Actualizar la fecha de checkout si es posterior a la siguiente reserva disponible
          setDate((state) => ({
            ...state,
            out: format(nextReservationDate, "yyyy-MM-dd"),
          }));
        }
      }
    }
  };

  const calculateDays = (item: ReserveBooking) => {
    const checkinDate = new Date(item.checkin);
    const checkoutDate = new Date(item.checkout);

    const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays;
  };

  const handleReserve = () => {
    if (token.length === 0) {
      mustLoginToast("Please login or signup to reserve a room");
      navigate("/login");
      return;
    }

    if (userReserve.length === 4) {
      reserveFullToast("4 reservas máximas");
      return false;
    }

    if (!date.in || !date.out) {
      reserveErrorToast("Seleccionar las fechas de llegada y salida");
      return;
    }

    const newReserve: ReserveBooking = {
      roomId: id ?? "",
      checkin: date.in,
      checkout: date.out,
      price: Number(roomRender?.price) ?? 0,
    };

    if (calculateDays(newReserve) < 1) {
      reserveErrorToast("Establezca al menos una noche");
      return;
    }

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

  const hotelOfThisRoom = (hotelId: any) => {
    const hotelBelong = allHotels.find((hotel) => {
      return hotel.id.toString() === hotelId;
    });
    return hotelBelong?.name;
  };

  return (
    <div>
      <NavbarDetail />
      {roomRender ? (
        <div className="border-4 border-blue-500 bg-white p-20 min-h-screen flex justify-end items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 md:ml-auto"></div>
              <div className="md:w-1/2 mb-2 md:justify-center md:items-center">
                {roomRender?.photo && (
                  <div className="w-full h-auto">
                    <h1 className="text-2xl font-bold mb-4">
                      Habitación: {roomRender?.name}
                    </h1>
                    <div className="w-full h-90 overflow-hidden shadow-lg">
                      <ImageGallery items={images} />
                    </div>
                    <div className="flex justify-start mt-2">
                      <div className="flex items-center">
                        <DatePicker
                          selected={arrivalDate}
                          onChange={handleArrivalDateChange}
                          placeholderText="Fecha de llegada"
                          className="border-2 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 border-blue-500"
                          popperClassName="text-black"
                          minDate={currentDate}
                          excludeDates={blockedDates}
                        />

                        {arrivalDate && (
                          <DatePicker
                            selected={departureDate}
                            onChange={handleDepartureDateChange}
                            placeholderText="Fecha de salida"
                            className="border-2 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 border-blue-500"
                            popperClassName="text-black"
                            minDate={addDays(arrivalDate, 1)} // La fecha de checkOut debe ser al menos 1 día después del checkIn
                            excludeDates={blockedDates}
                            maxDate={getNextReservationDate(arrivalDate)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-start mt-4">
                      <h2 className="text-lg font-bold">
                        Precio: $ {roomRender?.price}
                      </h2>
                      <button
                        onClick={handleReserve}
                        className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                      >
                        Reservar
                      </button>
                    </div>
                    <div className="bg-gray-200 p-4 rounded mt-5 shadow-lg border border-black">
                      <div className="flex ">
                        <p className="font-bold pe-1">{`Pertenece al hotel: `}</p>
                        <button
                          onClick={() =>
                            navigate(`/hotelpage/${roomRender?.hotelId}`)
                          }
                          className="font-bold hover:text-blue-600"
                        >{`${hotelOfThisRoom(roomRender?.hotelId)}`}</button>
                      </div>
                      <p className="text-gray-800">{roomRender?.description}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-[500px] md:ml-[30px] inline-block">
                <h2 className="text-2xl font-bold mt-4 mb-2">Servicios:</h2>
                <ul className="list-disc list-inside border-2 rounded shadow-lg">
                  {roomRender?.services.map((service: any) => (
                    <li key={service} className="text-lg text-gray-800">
                      {service}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-blue-500 font-bold w-[80px] border-black rounded"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Footer />
    </div>
  );
};

export default RoomPage;
