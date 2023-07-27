import { Text } from "@rewind-ui/core";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { tokenStore, SAStore } from "../../Store";
import { userDeleteToast } from "../toast";
import { useState } from "react";
const url = import.meta.env.VITE_URL;

export default function RatingRow({
    id,
    userName,
    hotelName,
    comment,
    score,
}: {
    id: string;
    userName: string;
    hotelName: string;
    comment: string;
    score: number;
}) {

    const userData = tokenStore((state) => state.userState);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { setUpdated } = SAStore();
    const currentState = SAStore((state) => state.updated)

    const handleDelete = () => {
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(
                `${url}/rating/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            console.log(response.data)

            if (response.data) {
                userDeleteToast("Comentario eliminado");
                setShowConfirmDialog(false);
                setUpdated(!currentState);
            }

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className={`dashboard-row rounded-md p-4 mb-4 bg-white'}`}>
            <div className="grid grid-cols-8 gap-4">
                <div className="col-span-1 flex flex-col justify-center" style={{ transform: 'translateX(40px)' }}>
                    <Text variant="h6" className="text-lg font-medium">
                        {userName}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ transform: 'translateX(40px)' }}>
                    <Text variant="h6" className="text-lg font-medium">
                        {hotelName}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ transform: 'translateX(230px)' }}>
                    <Text variant="h6" className="text-lg font-medium">
                        {comment}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ transform: 'translateX(300px)' }}>
                    <Text variant="h6" className="text-lg font-medium">
                        {score}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ transform: 'translateX(300px)' }}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}>
                        <FaTrashAlt />
                    </button>
                </div>
            </div>

            {showConfirmDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black z-10">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
                        <p className="text-lg mb-6">¿Estás seguro de que deseas eliminar este hotel?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-orange-600 text-white px-4 py-2 rounded-md mr-2"
                                onClick={(e) => { e.stopPropagation(); confirmDelete(); }}
                            >
                                Sí
                            </button>
                            <button
                                className="bg-lime-500 text-white px-4 py-2 rounded-md"
                                onClick={(e) => { setShowConfirmDialog(false); e.stopPropagation(); }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}