import { Text } from "@rewind-ui/core";


const NavRating = () => {

    return (
        <div className="grid grid-cols-8 gap-4 bg-slate-900 p-4 rounded-xl border border-white">
            <div className="col-span-1 flex items-center justify-center">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Nombre de usuario
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[100px] whitespace-nowrap">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Hotel calificado
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[300px]">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Comentario
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[400px]">
                <Text variant="h6" className="text-lg font-medium text-white">
                    Puntuación
                </Text>
            </div>
            <div className="col-span-1 flex items-center justify-center ml-[390px]">
                <Text variant="h6" className="text-lg font-medium text-red-500 ">
                    Eliminar
                </Text>
            </div>
        </div>


    );
};
export default NavRating