import { Text } from "@rewind-ui/core";


const NavUserSA = () => {

    return (
        <div className="grid grid-cols-8 gap-4 bg-slate-900 h-[70px] rounded-xl border-[1px]">
            <div className="col-span-1 flex items-center justify-center ml-[-80px]">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Nombre
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[300px]">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Apellido
                </Text>
            </div>
            <div className="col-span-2 flex items-center justify-center whitespace-nowrap ml-[180px]">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Número de teléfono
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <Text variant="h6" className="text-lg font-medium text-red-600">
                    Eliminar
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[-50px]">
                <Text variant="h6" className="text-lg font-medium text-orange-400">
                    Desactivar
                </Text>
            </div>
        </div>

    );
};
export default NavUserSA