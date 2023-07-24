import { CallBell, ClipboardText, Gear, SignOut, User } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '../../Store';
import { farewellAdminToast, farewellToast } from '../toast';
import { MouseEvent } from 'react';

export default function ProfileSideBar() {
    const userData = tokenStore((state) => state.userState)
    const navigate = useNavigate()
    const isAdmin = tokenStore((state) => state.userState)
    const { resetToken } = tokenStore()

    const role = userData[2] === 'admin';

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        document.cookie = "json=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        resetToken()
        role ? (
            farewellAdminToast("Gracias y éxito en sus ventas")
        ) : (
            farewellToast("Adiós y buena suerte!")
        )
        navigate('/farewell')
    }

    return (
        <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">

            <a>
                <div>
                    <h1 className="text-white">
                        <img
                            className="h-[180px] w-[190px] mr-2 center"
                            src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png"
                            alt="Logo"
                        />
                        <span className="text-3xl font-bold tracking-wider">HOTEL</span>
                        <span className="text-blue-500 text-3xl font-extrabold tracking-wider">HUNT</span>
                    </h1>
                </div>
            </a>


            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">

                    <span className="ml-3 my-8 py-3">
                        <button onClick={() => navigate('/')} type="button" className="flex items-center text-slate-100 text-m hover:underline">
                            <span className="inline-flex leading-none rotate-180 transform">
                                <svg width="24" height="24" className="pointer-events-none max-h-full max-w-full">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2">
                                        <path vector-effect="non-scaling-stroke" d="M10 17l5-5M10 7l5 5">
                                        </path>
                                    </g>
                                </svg>
                            </span>Volver</button>
                    </span>

                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                            cuenta
                        </label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <User size={20} />
                            </div>

                            <span
                                className="mx-2 text-sm font-medium"
                                onClick={() => navigate(`/profile/${isAdmin[0].name}+${isAdmin[0].lastName}`)}
                            >
                                Usuario
                            </span>
                        </a>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                            contenido
                        </label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            {role ? (
                                <><div className="w-5 h-5">
                                    <ClipboardText size={20} color="#fffafa" />
                                </div><span className="mx-2 text-sm font-medium" onClick={() => navigate('/profile/reservas')}>
                                        Reservas
                                    </span></>
                            ) : (
                                <><div className="w-5 h-5">
                                    <CallBell size={20} color="#fffafa" />
                                </div><span className="mx-2 text-sm font-medium" onClick={() => navigate('/profile/reservas')}>
                                        Mis Reservas
                                    </span></>
                            )}
                        </a>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                            personalización
                        </label>

                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <Gear size={20} color="#fffafa" />
                            </div>

                            <span className="mx-2 text-sm font-medium" onClick={() => navigate('/profile/configuracion')}>
                                Configuración
                            </span>
                        </a>
                    </div>

                    <div className="flex items-center h-14 pl-8 border-t border-grey-300">
                        <SignOut size={20} color="#fffafa" />
                        <button
                            type="button"
                            className="inline-flex disabled:cursor-text pl-2 text-white justify-between items-center w-full text-m hover:underline"
                            onClick={(event) => handleClick(event)}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </nav>

                <div>
                    <p className=" text-xs text-white ">© 2022 - Todos los derechos reservados</p>
                </div>

            </div>
        </aside>
    )
} 