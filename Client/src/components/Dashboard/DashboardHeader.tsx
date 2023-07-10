import { Button } from "@rewind-ui/core";
import { useNavigate } from "react-router-dom";
import { tokenStore } from "../../Store";


export default function DashboardHeader() {
    const titleClass = "flex justify-center items-center rounded-lg bg-slate-700 text-white p-4";
    const navigate = useNavigate();
    const handleNavigate = () => navigate("/formHotel");

    const token = tokenStore((state) => state.userState)
    const userSave = token[3]


    return (
        <div className="flex items-center mb-2">
            <div className={titleClass}>
                <h3>{userSave.name}</h3>
            </div>
            <div className="w-1 h-12 bg-slate-400 mx-2 rounded-xl" />
            <div className={titleClass}>
                <h3>Hoteles</h3>
            </div >
            <Button onClick={handleNavigate} tone="outline" color="blue" className="ml-auto font-bold py-2 px-4 rounded" >
                AGREGAR HOTEL
            </Button>
        </div>
    );
}