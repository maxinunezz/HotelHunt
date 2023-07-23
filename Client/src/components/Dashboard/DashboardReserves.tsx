import axios from "axios";
import { tokenStore } from '../../Store';
import { useEffect } from "react";
import { useState } from "react";

interface Reservation {
    hotel: string;
    room: string;
    checkin: string;
    checkout: string;
    paymentStatus: string;
    price: number;
  }

export default function reservesDashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const url = import.meta.env.VITE_URL;
    const token = tokenStore((state) => state.userState);
    
    const getReserves = async () => {
        try {
            const response = await axios.get(`${url}/booking/getReserves`, {
                headers: {
                    authorization: `Bearer ${token[1]}`
                }
            });
            const reserves: Reservation[] = response.data;
            console.log(reserves);
            setReservations(reserves); 

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReserves();
    }, []);

    console.log(reservations);



    return (
        <div className="flex">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 flex-grow">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="flex justify-center items-center">

                            <div className="text-2xl font-bold mb-4 mt-16">Reservas</div>
                        </div>
                        <table className="min-w-full">
                            <thead className="bg-gray-200 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Hotel
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Habitación
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Fecha de ingreso
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Fecha de salida
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Importe
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Estado de pago
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(reservations.length > 0) ? (reservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {reservation.hotel}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {reservation.room}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {reservation.checkin}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {reservation.checkout}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {reservation.price}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {reservation.paymentStatus}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td
                                            colSpan={6} // Indicar el número de columnas para ocupar en la tabla
                                            className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                        >
                                            No tienes reservas aún
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}