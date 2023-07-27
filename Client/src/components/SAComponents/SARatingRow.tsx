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
                <div className="col-span-1 flex flex-col justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {userName}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {hotelName}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {comment}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {score}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}>
                        <FaTrashAlt />
                    </button>
                </div>
            </div>

            {showConfirmDialog && (
                <div className="bg-slate-600">
                    <div className="confirm-dialog-overlay" onClick={() => setShowConfirmDialog(false)} />
                    <div className="confirm-dialog-content">
                        <h3 className="confirm-dialog-title">Confirmar eliminación</h3>
                        <p className="confirm-dialog-message">¿Estás seguro de que deseas eliminar este comentario?</p>
                        <div className="confirm-dialog-buttons">
                            <button className="border-slate-950 text-white bg-orange-600 w-[100px]" onClick={(e) => { e.stopPropagation(); confirmDelete(); }}>
                                Sí
                            </button>
                            <button className="border-slate-950 text-white bg-lime-500 w-[100px]" onClick={(e) => { setShowConfirmDialog(false); e.stopPropagation(); }}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}