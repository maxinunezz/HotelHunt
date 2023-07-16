import { tokenStore } from "../../Store";
import ProfileSideBar from "../../components/ProfileSideBar/A-ProfileSideBar";

export default function AdminSetting() {
    const userData = tokenStore((state) => state.userState)
    console.log(userData);

    const user = {
        name: `${userData[0].name}`,
        lastName: `${userData[0].lastName}`,
        dateOfBirth: `${userData[0].birthDate}`,
        phoneNumber: `${userData[0].phoneNumber}`,
    };
    return (
        <div className="flex-auto">
            <div className="flex">
                <ProfileSideBar />
                <div className="w-3/4 mx-auto p-8">
                    <h1 className="text-2xl font-bold mb-6 ml-4">Configuración de la cuenta</h1>
                    <div className="bg-white rounded shadow p-6">
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Nombres</span>
                            <input
                                type="text"
                                name="firstName"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="p. ej., Juan"
                                aria-invalid="false"
                                value={user.name}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Apellidos</span>
                            <input
                                type="text"
                                name="lastName"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="p. ej., Pérez"
                                aria-invalid="false"
                                value={user.lastName}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Fecha de Nacimiento</span>
                            <input
                                type="date"
                                name="birthDate"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="dd/mm/aaaa"
                                aria-invalid="false"
                                value={user.dateOfBirth}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Número de Contacto</span>
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="Ingresa tu número de teléfono"
                                aria-invalid="false"
                                value={user.phoneNumber}
                            />
                        </label>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Actualizar datos
                            </button>
                            <button
                                type="button"
                                className="inline-flex ml-4 text-gray-700 text-sm py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Borrar mi cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}