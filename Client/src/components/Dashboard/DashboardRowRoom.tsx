import { Text } from "@rewind-ui/core";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { tokenStore } from "../../Store";
import { useNavigate } from "react-router-dom";
import { userDeleteToast } from "../toast";
import axios from "axios";
const url = import.meta.env.VITE_URL;



export default function DashboardRowRoom({
    id,
    name,
    photo,
    pax,
    disabled
}: {
    id: string;
    name: string;
    photo: string[];
    pax: number;
    disabled: boolean;
}) {
    const navigate = useNavigate()
    const userData = tokenStore((state) => state.userState);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDelete = () => {
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await axios.delete(
                `${url}/dashboard/room/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            console.log(data);
            console.log("Hotel eliminado");

            userDeleteToast('Room eliminated');


            setShowConfirmDialog(false);
            navigate(-1)

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {
        navigate(`/dashboard/roomupdate/${id}`)
    };
    return (        

        <div className={`dashboard-row rounded-md p-4 mb-4 ${disabled ? 'bg-slate-400' : 'bg-white'}`}>
            Wena larvas
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-2">
                    <img src={photo[0]} alt={name} className="w-48 h-48 object-cover" />
                </div>
                <div className="col-span-1 flex flex-col justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {name}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {pax}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {`Disabled: ${disabled}`}
                    </Text>
                </div>

                <div className="col-span-1 flex items-center justify-center">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}>
                        <FaEdit />
                    </button>
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
                        <p className="confirm-dialog-message">¿Estás seguro de que deseas eliminar esta room?</p>
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
    )
}