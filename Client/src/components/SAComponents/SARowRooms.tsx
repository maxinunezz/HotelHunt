import { Text } from "@rewind-ui/core";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { tokenStore, SAStore } from "../../Store";
import { userDeleteToast, successToast, errorToast } from "../toast";
import { useState } from "react";
const url = import.meta.env.VITE_URL;

export default function SARoomRow({
    id,
    name,
    hotelName,
    photo,
    disabled,
}: {
    id: string;
    name: string;
    hotelName: string;
    photo: string[];
    disabled: boolean;
}) {
    const userData = tokenStore((state) => state.userState);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showConfirmDisabled, setConfirmDisabled] = useState(false);
    const [isChecked, setIsChecked] = useState(disabled);
    const { setUpdated } = SAStore();
    const currentState = SAStore((state) => state.updated)

    const handleDelete = () => {
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(
                `${url}/room/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );

            if (response.data) {

                userDeleteToast('Habitación eliminada');
                setShowConfirmDialog(false);
                setUpdated(!currentState);
            }

        } catch (error: any) {
            errorToast(error.response.data)
        }
    };

    const ConfirmDisabled = async () => {
        try {
            const requestBody = { disabled: isChecked };
            const response = await axios.put(
                `${url}/room/${id}`,
                requestBody,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            if (response.data) {
                successToast("Habitación activada/desactivada");
                setConfirmDisabled(false);
                setUpdated(!currentState)
            }

        } catch (error: any) {
            errorToast(error.response.data);
        }
    }

    const handleChangeCheckbox = (e:any) => {
        e.stopPropagation();
        setIsChecked(e.target.checked);
        if (e.target.checked !== disabled) {
            setConfirmDisabled(true);
        } else {
            setConfirmDisabled(false)
        }
    }


    return (
        <div className={`dashboard-row rounded-md p-4 mb-4 ${disabled ? 'bg-slate-400' : 'bg-white'}`}>
            <div className="grid grid-cols-8 gap-4">
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
                        {hotelName}
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
                <div className="col-span-1 flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChangeCheckbox}
                    />
                </div>
            </div>

            {showConfirmDialog && (
                <div className="bg-slate-600">
                    <div className="confirm-dialog-overlay" onClick={() => setShowConfirmDialog(false)} />
                    <div className="confirm-dialog-content">
                        <h3 className="confirm-dialog-title">Confirmar eliminación</h3>
                        <p className="confirm-dialog-message">¿Estás seguro de que deseas eliminar este habitación?</p>
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
            {showConfirmDisabled && (
                <div className="bg-slate-600">
                    <div className="confirm-dialog-overlay" onClick={() => setShowConfirmDialog(false)} />
                    <div className="confirm-dialog-content">
                        <h3 className="confirm-dialog-title">Confirmar activación/desactivación</h3>
                        <p className="confirm-dialog-message">¿Estás seguro de que deseas activar/desactivar este habitación?</p>
                        <div className="confirm-dialog-buttons">
                            <button className="border-slate-950 text-white bg-orange-600 w-[100px]" onClick={(e) => { e.stopPropagation(); ConfirmDisabled(); }}>
                                Sí
                            </button>
                            <button className="border-slate-950 text-white bg-lime-500 w-[100px]" onClick={(e) => { setConfirmDisabled(false); e.stopPropagation(); }}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}