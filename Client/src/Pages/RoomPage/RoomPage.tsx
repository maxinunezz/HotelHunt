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
  const { saveInfo } = tokenStore();
  const [roomRender, setRoomRender] = useState<Room | null>();
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [date, setDate] = useState<{ in: string; out: string }>({
    in: "",
    out: "",
  });
  const [reservesOnScreen, setReservesOnScreen] = useState<ReserveBooking[]>(
    []
  );
  const token = tokenStore((state) => state.userState);
  const { reserveRoomPayment } = userStore();

  useEffect(() => {
    const sessionSA: string | null =
      window.sessionStorage.getItem("SALoginInfo");
    const session: string | null = window.sessionStorage.getItem("tokenUser");

    if (sessionSA) {
      const parsedSessionSA = JSON.parse(sessionSA);
      saveInfo(parsedSessionSA);
    } else if (session) {
      const parsedSession = JSON.parse(session);
      saveInfo(parsedSession);
    } else {
    }
  }, []);

  const reservesInScreen = async () => {
    try {
      const response = await axios.get(`${url}/booking/all/${id}`);
      const rawData = response.data;

      const formattedData = rawData.map((item: any) => ({
        ...item,
        checkin: new Date(item.checkin).toISOString().slice(0, 10),
        checkout: new Date(item.checkout).toISOString().slice(0, 10),
      }));

      setReservesOnScreen(formattedData);

      return formattedData;
    } catch (error) {
      console.error("Error fetching reserves:", error);
    }
  };

  useEffect(() => {
    reservesInScreen();
  }, []);

  const getNextReservationDate = (checkInDate: Date) => {
    const auxArray = reservesOnScreen.sort(
      (a, b) => new Date(a.checkin).getTime() - new Date(b.checkin).getTime()
    );

    const nextReservation = auxArray.find(
      (reserve) => parseISO(reserve.checkin) > checkInDate
    );

    return nextReservation ? parseISO(nextReservation.checkin) : null;
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

      if (nextReservationDate !== null) {
        setDepartureDate(nextReservationDate);
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

      if (arrivalDate) {
        const nextReservationDate = getNextReservationDate(arrivalDate);

        if (nextReservationDate !== null && date > nextReservationDate) {
          setDepartureDate(nextReservationDate);
          setDate((state) => ({
            ...state,
            out: format(nextReservationDate, "yyyy-MM-dd"),
          }));
        }
      }
    } else {
      setDepartureDate(null);
      setDate((state) => ({ ...state, out: "" }));
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
      {roomRender ? (
        <div className="border-4 border-blue-500 bg-white p-20 min-h-screen flex justify-end items-center">
          <div className="flex flex-col items-center mt-[100px]">
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
                          minDate={addDays(arrivalDate, 1)}
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
                      className="ml-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                    >
                      Reservar
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className=" ml-[600px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
                    >
                      Back
                    </button>
                  </div>

                  <div className="bg-gray-200 p-4 rounded shadow-lg border border-black mt-5">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold">Servicios:</h2>
                      {roomRender?.services.map((service: any) => (
                        <div
                          key={service}
                          className="flex items-center text-lg text-gray-800"
                        >
                          <span className="mr-2">✓</span>
                          {service}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <p className="font-bold pe-1">{`Pertenece al hotel: `}</p>
                      <button
                        onClick={() =>
                          navigate(`/hotelpage/${roomRender?.hotelId}`)
                        }
                        className="font-bold hover:text-blue-600"
                      >
                        {`${hotelOfThisRoom(roomRender?.hotelId)}`}
                      </button>
                    </div>

                    <p className="text-gray-800 mt-4">
                      {roomRender?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/4 md:ml-auto"></div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Footer /> <NavbarDetail />
    </div>
  );
};

export default RoomPage;
