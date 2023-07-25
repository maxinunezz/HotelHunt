import axios from "axios";
import { tokenStore } from '../../Store';
import { useEffect } from "react";
import { useState } from "react";
import { errorToast } from "../toast";
import * as XLSX from 'xlsx';


interface Reservation {
    hotelName: string;
    roomName: string;
    checkin: string;
    checkout: string;
    paymentStatus: string;
    price: number;
    userEmail: string;
}

export default function ReservesDashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const url = import.meta.env.VITE_URL;
    const token = tokenStore((state) => state.userState);
    const [error, setError] = useState<string>("");
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const handleDownloadExcel = () => {
        if (reservations === undefined || reservations === null || reservations.length === 0) {
            errorToast("No hay datos que descargar");
        } else {
            const worksheet = XLSX.utils.json_to_sheet(reservations);

            const totalRow = { hotelName: 'Total:', price: totalPrice };
            XLSX.utils.sheet_add_json(worksheet, [totalRow], { skipHeader: true, origin: -1 });

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Reservas");
            XLSX.writeFile(workbook, "reservations.xlsx");
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

            // Calcular la suma de los importes
            const total = reserves.reduce((acc, reservation) => acc + (+reservation.price), 0);
            setTotalPrice(total);

        } catch (error:any) {
            setError(error.response.data);
        }
    };


    return (
        <div className="p-[20px] bg-slate-600 rounded-lg h-full w-full shadow-md border border-gray-300 ">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-semibold mb-4 text-white shadow-md bg-gradient-to-r from-slate-900 to-slate-900 px-4 py-2 rounded-lg">
                                    RESERVAS
                                </h2>
                                <button
                                    className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                    onClick={handleDownloadExcel}
                                >
                                    Descargar Excel
                                </button>
                            </div>
                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Hotel
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Habitación
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Usuario
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Fecha de ingreso
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Fecha de salida
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Importe
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-8 py-4 text-left">
                                            Estado de pago
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.length > 0 ? (
                                        reservations.map((reservation, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                            >
                                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {reservation.hotelName}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.roomName}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.userEmail}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.checkin}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.checkout}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.price}
                                                </td>
                                                <td className="text-sm text-gray-900 px-8 py-4 whitespace-nowrap">
                                                    {reservation.paymentStatus}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                                                {error}
                                            </td>
                                        </tr>
                                    )}
                                    {reservations.length > 0 && (
                                        <tr className="bg-gray-100">
                                            <td className="px-8 py-4 whitespace-nowrap text-sm font-bold text-gray-900" colSpan={5}>
                                                Total:
                                            </td>
                                            <td className="px-8 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                ${totalPrice.toFixed(2)}
                                            </td>
                                            <td className="px-8 py-4 whitespace-nowrap"></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}