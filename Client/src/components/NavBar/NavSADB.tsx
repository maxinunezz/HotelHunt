import { Text } from "@rewind-ui/core";


const NavSADB = () => {

  return (
    <div className="navbar-wrapper shadow bg-slate-900 border rounded-xl">
      <div className="grid grid-cols-5 gap-4 p-4">
        <div className="flex items-center ml-[420px]">
          <Text variant="h6" className="text-lg font-medium text-white">
            Nombre
          </Text>
        </div>
        <div className="flex items-center ml-[360px]">
          <Text variant="h6" className="text-lg font-medium text-white">
            País
          </Text>
        </div>
        <div className="flex items-center ml-[220px]">
          <Text variant="h6" className="text-lg font-medium text-white">
            Ciudad
          </Text>
        </div>
        <div className="flex items-center ml-[100px]">
          <Text variant="h6" className="text-lg font-medium text-red-600 cursor-pointer">
            Eliminar
          </Text>
        </div>
        <div className="flex items-center ml-[-40px]">
          <Text variant="h6" className="text-lg font-medium text-yellow-600 cursor-pointer">
            Desactivar
          </Text>
        </div>
      </div>
    </div>
  );
  






};
export default NavSADB