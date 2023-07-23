import { useNavigate } from "react-router-dom";
import { tokenStore, UserState } from "../../Store";
import { userStore } from "../../Store/UserStore";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import { userDeleteToast, userUpdateToast } from "../../components/toast";
import axios from 'axios';
import { useState } from "react";
const url = import.meta.env.VITE_URL;

export default function AdminSetting() {
    const navigate = useNavigate()
    const userData = tokenStore((state) => state.userState)
    const { reset } = userStore()
    const { resetToken, saveInfo } = tokenStore()

    const user = {
        name: `${userData[0].name}`,
        lastName: `${userData[0].lastName}`,
        dateOfBirth: `${userData[0].birthDate}`,
        phoneNumber: `${userData[0].phoneNumber}`,
        email: `${userData[0].email}`
    };

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        isChecked: false,
        nuevo_password: "",
        password: "",
        isCheckedValue: "normal",
        nuevo_email: "",
        email: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const validation = (inputObject: typeof input) => {
        const errors: { [key: string]: string } = {};

        if (!inputObject.firstName || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(inputObject.firstName)) {
            errors.firstName = "Debe tener un nombre válido con la primera letra mayúscula y permitir nombres compuestos de hasta 255 caracteres.";
        }

        if (!inputObject.lastName || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(inputObject.lastName)) {
            errors.lastName = "Debe tener un apellido válido con la primera letra mayúscula. Permite compuestos separados por un guión (-)";
        }

        if (!inputObject.password || inputObject.password.length < 6) {
            errors.password = "Debe tener una contraseña válida con al menos 6 caracteres.";
        }

        if (!inputObject.email || inputObject.email.length === 0 || inputObject.email !== user.email) {
            errors.email = "Debe ingresar su email actual";
        }

        if (!inputObject.phoneNumber || !/^\d{10}$/.test(inputObject.phoneNumber)) {
            errors.phoneNumber = "Debe tener un número de teléfono válido de 10 dígitos.";
        }

        return errors;
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${url}/dashboard/user`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            userDeleteToast('Lamentamos verte partir')
            reset()
            resetToken()
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))
    };

    const handleUpdate = async () => {

        if (input.email.length === 0 || input.password.length === 0) {
            return userUpdateToast('Ingrese su email y contraseña')
        }

        const { data } = await axios.put(
            `${url}/dashboard/user`,
            {
                name: input.firstName,
                lastName: input.lastName,
                birthDate: input.birthDate,
                phoneNumber: input.phoneNumber,
                admin: input.isCheckedValue,
                email: input.nuevo_email,
                password: input.nuevo_password,
            },
            {
                headers: {
                    authorization: `Bearer ${userData[1]}`,
                },
            }
        );

        if (data?.error) {
            userUpdateToast(data.error)
        } else if (data.message) {
            const values = {
                email: input.email,
                password: input.password
            }
            await axios.post(`${url}/user/auth`, values).then((response) => {
                if (response.data) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore:next-line
                    const arrayAux: UserState = [];
                    const tokenRaw = response.data.token
                    const statusadmin = response.data.admin
                    const logeado = true
                    const userData = response.data.data
                    arrayAux[0] = userData
                    arrayAux[1] = tokenRaw
                    arrayAux[2] = statusadmin
                    arrayAux[3] = logeado
                    saveInfo(arrayAux)
                }
            }
            )
            userUpdateToast("UserData updated!")
            navigate('/')
        }
    }

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
                                placeholder={`Current name: ${user.name}`}
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.firstName && <p className="text-red-700">{errors.firstName}</p>}
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Apellidos</span>
                            <input
                                type="text"
                                name="lastName"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder={`Current lastname: ${user.lastName}`}
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.lastName && <p className="text-red-700">{errors.lastName}</p>}
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Fecha de Nacimiento</span>
                            <input
                                type="date"
                                name="birthDate"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder={`Current date of birth: ${user.dateOfBirth}`}
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Número de Contacto</span>
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder={`Current number: ${user.phoneNumber}`}
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.phoneNumber && <p className="text-red-700">{errors.phoneNumber}</p>}

                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Email</span>
                            <input
                                type="text"
                                name="nuevo_email"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="Ingrese su nuevo Email (opcional)"
                                aria-invalid="false"
                            />
                        </label>
                        {errors.nuevo_email && <p className="text-red-700">{errors.nuevo_email}</p>}

                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Email</span>
                            <input
                                type="text"
                                name="email"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="Email actual (requerido)"
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.email && <p className="text-red-700">{errors.email}</p>}

                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Password</span>
                            <input
                                type="password"
                                name="nuevo_password"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="Ingrese su nueva password (opcional)"
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.nuevo_password && <p className="text-red-700">{errors.nuevo_password}</p>}

                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Password</span>
                            <input
                                type="password"
                                name="password"
                                className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                placeholder="Password actual (requerido)"
                                aria-invalid="false"
                                onChange={(event) => handleChange(event)}
                            />
                        </label>
                        {errors.password && <p className="text-red-700">{errors.password}</p>}

                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Quiero publicar mi hotel</span>
                            <input
                                type="checkbox"
                                name="isChecked"
                                checked={input.isChecked}
                                onChange={(event) => setInput({ ...input, isChecked: event.target.checked, isCheckedValue: event.target.checked ? "admin" : "normal" })}
                                className="form-checkbox h-4 w-4 text-indigo-600"
                            />
                        </label>
                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                                disabled={(input.email.length === 0 || input.password.length === 0) || Object.keys(errors).length > 0}
                            >
                                Actualizar datos
                            </button>
                            <button onClick={handleDelete} className="inline-flex ml-4 text-white text-sm py-2 px-4 border border-red-500 bg-red-700 rounded-md hover:bg-red-600">
                                Borrar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}