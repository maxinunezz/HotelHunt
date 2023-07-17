import { useNavigate } from "react-router-dom";
import { tokenStore } from "../../Store";
import { userStore } from "../../Store/UserStore";
import ProfileSideBar from "../../components/ProfileSideBar/A-ProfileSideBar";
import { userDeleteToast, userUpdateToast } from "../../components/toast";
import axios from 'axios';
import { useState } from "react";
const url = import.meta.env.VITE_URL;

export default function UserSettings() {
    const navigate = useNavigate()
    const userData = tokenStore((state) => state.userState)
    const { deleteAccount, reset } = userStore()
    const { resetToken } = tokenStore()



    const user = {
        name: `${userData[0].name}`,
        lastName: `${userData[0].lastName}`,
        dateOfBirth: `${userData[0].birthDate}`,
        phoneNumber: `${userData[0].phoneNumber}`,
        email: `${userData[0].email}`
    };
    const handleDelete = async () => {
        try {
            const data = await axios.delete(
                `${url}/dashboard/user`,
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            console.log(data);

            userDeleteToast('Lamentamos verte partir')
            reset()
            resetToken()
            navigate('/')
        } catch (error) {
            console.log(error);

        }
    }

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        phoneNumber: "",
        isChecked: false,
        email: "",
        password: "",
        isCheckedValue: "normal",

    });
    const [errors, setErrors] = useState({})
    const validation = (input) => {
        let errors = {};
      
        if (!input.firstName || !/^(?:[A-Z][a-zA-Z]*)(?: [A-Z][a-zA-Z]*){0,2}$/.test(input.firstName)) {
          errors.firstName = "Debe tener un nombre válido con la primera letra mayúscula y permitir nombres compuestos de hasta 255 caracteres.";
        }
      
        if (!input.lastName || !/^(?:[A-Z][a-zA-Z]*)(?:-[A-Z][a-zA-Z]*){0,1}$/.test(input.lastName)) {
          errors.lastName = "Debe tener un apellido válido con la primera letra mayúscula. Permite compuestos separados por un guión (-)";
        }
      
        if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
          errors.email = "Debe tener un email válido.";
        }
      
        if (!input.password || input.password.length < 6) {
          errors.password = "Debe tener una contraseña válida con al menos 6 caracteres.";
        }
      
        if (!input.phoneNumber || !/^\d{10}$/.test(input.phoneNumber)) {
          errors.phoneNumber = "Debe tener un número de teléfono válido de 10 dígitos.";
        }
      
        return errors;
      };
      

        const handleChange = (event) => {

            setInput({
                ...input,
                [event.target.name]: event.target.value
            });
            setErrors(validation({
                ...input,
                [event.target.name]: event.target.value
            }))
            console.log(input);
        };

        const handleUpdate = async () => {
            if (Object.keys(errors).length > 0) {
                userUpdateToast("Must complete all fields!")
                return
            }

            const data = await axios.put(
                `${url}/dashboard/user`,
                {
                    name: input.firstName,
                    lastName: input.lastName,
                    birthDate: input.birthDate,
                    phoneNumber: input.phoneNumber,
                    admin: input.isCheckedValue,
                    email: input.email,
                    password: input.password,
                },
                {
                    headers: {
                        authorization: `Bearer ${userData[1]}`,
                    },
                }
            );
            userUpdateToast("UserData updated!")
            navigate('/')
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
                                    name="email"
                                    className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                    placeholder="Tu email"
                                    aria-invalid="false"
                                    value={user.email}
                                />
                            </label>

                            <label className="block mb-4">
                                <span className="text-gray-700 font-semibold">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    className="h-11 w-full px-3 border border-solid rounded text-grey-900 text-l 2xl:rounded-sm border-grey-500"
                                    placeholder="Tu password"
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
                                    className={`${
                                        Object.keys(errors).length > 0 || input.firstName === ""
                                          ? "bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-50"
                                          : "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                      }`}
                                    disabled={Object.keys(errors).length > 0}
                                >
                                    Actualizar datos
                                </button>
                                <button onClick={handleDelete} className="inline-flex ml-4 text-gray-700 text-sm py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100">
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }