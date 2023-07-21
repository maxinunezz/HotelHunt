import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";

const reservations = [
    {
        hotel: "Hotel A",
        room: "Standard Room",
        checkInDate: "10/07/2023",
        checkOutDate: "15/07/2023",
        price: "$200",
    },
    {
        hotel: "Hotel B",
        room: "Deluxe Suite",
        checkInDate: "20/07/2023",
        checkOutDate: "25/07/2023",
        price: "$300",
    },
];

export default function ReservasPage() {
    return (
        <div className="flex">
            <ProfileSideBar />
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
                                        Precio
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                        <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.hotel}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {reservation.room}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {reservation.checkInDate}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {reservation.checkOutDate}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {reservation.price}
                                            </td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}