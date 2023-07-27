import { Text } from "@rewind-ui/core";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { tokenStore, SAStore } from "../../Store";
import { userDeleteToast, successToast, errorToast } from "../toast";
import { useState } from "react";
const url = import.meta.env.VITE_URL;

export default function HotelsRow({
    id,
    name,
    country,
    city,
    photo,
    disabled,
}: {
    id: string;
    name: string;
    country: string;
    city: string;
    photo: string;
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
                `${url}/hotel/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );

            if (response.data) {
                userDeleteToast("Usuario eliminado");
                setShowConfirmDialog(false);
                setUpdated(!currentState);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const ConfirmDisabled = async () => {
        try {
            const requestBody = { disabled: isChecked, };
            const response = await axios.put(
                `${url}/hotel/${id}`,
                requestBody,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            if (response.data) {
                successToast("Habitacion actualizada");
                setConfirmDisabled(false);
                setUpdated(!currentState)
            }

        } catch (error: any) {
            errorToast(error.response.data);
        }
    }

    const handleChangeCheckbox = (e: any) => {
        e.stopPropagation();
        setIsChecked(e.target.checked);
        if (e.target.checked !== disabled) {
            setConfirmDisabled(true);
        } else {
            setConfirmDisabled(false)
        }
    }


    return (
        <div className={` rounded-md p-5 mb-5 ${disabled ? 'bg-slate-400' : 'bg-white'}`}>
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
                        {country}
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        {city}
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

            {showConfirmDisabled && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-black z-10">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4">Confirmar activación/desactivación</h3>
                        <p className="text-lg mb-6">¿Estás seguro de que deseas activar/desactivar este hotel?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-orange-600 text-white px-4 py-2 rounded-md mr-2"
                                onClick={(e) => { e.stopPropagation(); ConfirmDisabled(); }}
                            >
                                Sí
                            </button>
                            <button
                                className="bg-lime-500 text-white px-4 py-2 rounded-md"
                                onClick={(e) => { setConfirmDisabled(false); e.stopPropagation(); }}
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