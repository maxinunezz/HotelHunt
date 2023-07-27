import { Text } from "@rewind-ui/core";


const NavSADBRoom = () => {

    return (
        <div className="navbar-wrapper shadow bg-slate-900 border rounded-xl">
            <div className="grid grid-cols-8 gap-4 p-4">
                <div className="col-span-2 flex items-center ml-[10px]">
                    <Text variant="h6" className="text-lg font-medium text-white">
                        Foto de la Habitación
                    </Text>
                </div>
                <div className="col-span-2 flex items-center ml-[-20px]">
                    <Text variant="h6" className="text-lg font-medium text-white">
                        Nombre de Habitación
                    </Text>
                </div>
                <div className="col-span-1 flex items-center whitespace-nowrap ml-[-120px]">
                    <Text variant="h6" className="text-lg font-medium text-white">
                        Nombre del Hotel
                    </Text>
                </div>
                <div className="col-span-1 flex items-center ml-[-50px]">
                    <Text variant="h6" className="text-lg font-medium text-red-600 cursor-pointer">
                        Eliminar
                    </Text>
                </div>
                <div className="col-span-1 flex items-center ml-[-60px]">
                    <Text variant="h6" className="text-lg font-medium text-yellow-600 cursor-pointer">
                        Desactivar
                    </Text>
                </div>
            </div>
        </div>
    );





};
export default NavSADBRoom