import { ClipboardText, Gear, SignOut, User } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { tokenStore, SAStore } from '../../Store';
import { farewellAdminToast, errorToast } from '../toast';
import { MouseEvent, useEffect } from 'react';

export default function SABar() {
    const navigate = useNavigate()
    const { setHotels, setReservs, setComents, setUsers} = SAStore();
    const { resetToken } = tokenStore()
    const isLogged = tokenStore((state) => state.userState)

    useEffect(()=>{
        if(isLogged[2] !== 'super'){
            errorToast('Acceso Restringido');
            navigate('/')
        }
    },[])



    const setRender = (arg:String) => {
        if(arg === "coments"){
            setComents(true);
            setHotels(false);
            setReservs(false)
            setUsers(false);
        }
        else if(arg === "reserves"){
            setHotels(false);
            setReservs(true);
            setComents(false);
            setUsers(false);
        }else if(arg === "hotels" ){
            setHotels(true);
            setReservs(false);
            setComents(false);
            setUsers(false);
        }else if(arg === "users"){
            setHotels(false);
            setReservs(false);
            setComents(false);
            setUsers(true);

        }
    }

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        document.cookie = "json=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        resetToken()
        farewellAdminToast("Cierre exitoso")
        navigate('/SALogin')
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

                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                            Panel de Administración
                        </label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <User size={20} />
                            </div>

                            <span
                                className="mx-2 text-sm font-medium"
                                onClick={() => setRender("hotels")}
                            >
                                Hoteles
                            </span>
                        </a>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                            contenido
                        </label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <><div className="w-5 h-5">
                                <ClipboardText size={20} color="#fffafa" />
                            </div><span className="mx-2 text-sm font-medium" onClick={() => setRender("reserves")}>
                                    Reservas
                                </span></>
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

                            <span className="mx-2 text-sm font-medium" onClick={() => setRender("coments")}>
                                Comentarios
                            </span>
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

                            <span className="mx-2 text-sm font-medium" onClick={() => setRender("users")}>
                                users
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
                    <p className=" text-xs text-white ">© 2023 - Todos los derechos reservados</p>
                </div>

            </div>
        </aside>
    )
} 