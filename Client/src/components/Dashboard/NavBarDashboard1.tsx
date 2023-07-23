import { Text } from "@rewind-ui/core";
import { useNavigate } from "react-router-dom";

const NavBarDashboard1 = () => {
    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-8 gap-4 bg-white">
                <div className="col-span-2">
                    <Text>
                    <button onClick={() => navigate("/formHotel")} className="bg-blue-500 font-bold w-[80px] border-black rounded ml-5">Crear hotel</button>
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Nombre
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Pais
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Ciudad
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Editar
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Eliminar
                    </Text>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Text variant="h6" className="text-lg font-medium">
                        Desactivar
                    </Text>
                </div>               
            </div>
    );
};
export default NavBarDashboard1