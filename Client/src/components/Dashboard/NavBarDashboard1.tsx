import { useNavigate } from "react-router-dom";

const NavBarDashboard1 = () => {
    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-8 gap-4 bg-slate-900 p-4 rounded-lg shadow-lg mt-4 mr-4 ms-4">
            <div className="col-span-2">
                <button onClick={() => navigate("/formHotel")} className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Crear hotel
                </button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">Nombre</h6>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">País</h6>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">Ciudad</h6>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">Editar</h6>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">Eliminar</h6>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h6 className="text-lg font-medium text-white">Desactivar</h6>
            </div>
        </div>





    );
};
export default NavBarDashboard1