import axios from "axios";
import { tokenStore } from '../../Store';
import { useEffect } from "react";
import { useState } from "react";
import { errorToast } from "../toast";

interface Reservation {
    hotel: string;
    room: string;
    checkin: string;
    checkout: string;
    paymentStatus: string;
    price: number;
    UserEmail: string;
}

export default function ReservesDashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const url = import.meta.env.VITE_URL;
    const token = tokenStore((state) => state.userState);
    const [error, setError] = useState<string>("");


    const convertToCSV = (reservations) => {

        const csvRows = [];
        const headers = Object.keys(reservations[0]);
        csvRows.push(headers.join(","));

        for (const row of reservations) {
            const values = headers.map((header) => row[header]);
            csvRows.push(values.join(","));
        }

        return csvRows.join("\n");

    };

    const handleDownloadCSV = () => {
        if (reservations === undefined || reservations === null || reservations.length === 0) {
            errorToast("No hay datos que descargar");
        } else {
            const csvData = convertToCSV(reservations);
            const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.setAttribute("href", URL.createObjectURL(blob));
            link.setAttribute("download", "reservations.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };




    useEffect(() => {
        getReserves();
    }, []);

    const getReserves = async () => {
        try {
            const response = await axios.get(`${url}/dashboard/booking`, {
                headers: {
                    authorization: `Bearer ${token[1]}`
                }
            });
            const reserves: Reservation[] = response.data;
            setReservations(reserves);

        } catch (error) {
            setError(error.response.data);
        }
    }


    return (
        <div className="flex">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 flex-grow">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="flex justify-center items-center">
                            <div className="text-2xl font-bold mb-4 mt-16">Reservas</div>
                            <button
                                className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                onClick={handleDownloadCSV}>
                                Descargar CSV
                            </button>
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
                                        Usuario
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
                                            {reservation.UserEmail}
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
                                            {error}
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