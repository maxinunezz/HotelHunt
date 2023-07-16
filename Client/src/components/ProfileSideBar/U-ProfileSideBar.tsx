import { CallBell, Gear, SignOut, User } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '../../Store';
import { farewellAdminToast } from '../toast';

export default function ProfileSideBar() {
    const navigate = useNavigate()
    const isAdmin = tokenStore((state) => state.userState)
    const { reset } = tokenStore()
    const handleClick = (event) => {
        event.preventDefault()
        console.log(isAdmin[0])
        reset()
        farewellAdminToast("Adiós y buena suerte!")
        navigate('/farewell')
    }

    return (
        <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a>
                <img onClick={() => navigate('/')} className="w-auto h-24 cursor-pointer" src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png" alt="" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">cuenta</label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <User size={20} />
                            </div>
                            <span className="mx-2 text-sm font-medium" onClick={() => navigate('/userprofile/:name')}>Usuario</span>
                        </a>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">contenido</label>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <CallBell size={20} color="#fffafa" />
                            </div>
                            <span className="mx-2 text-sm font-medium" onClick={() => navigate('/userprofile/reservas')}>Mis Reservas</span>
                        </a>
                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">personalización</label>

                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <div className="w-5 h-5">
                                <Gear size={20} color="#fffafa" />
                            </div>

                            <span className="mx-2 text-sm font-medium" onClick={() => navigate('/userprofile/configuracion')}>Configuración</span>
                        </a>
                    </div>

                    <div className="flex items-center h-14 pl-8 border-t border-grey-300">
                        <SignOut size={20} color="#fffafa" />
                        <button type="button" className="inline-flex disabled:cursor-text pl-2 text-white justify-between items-center w-full text-m hover:underline" onClick={(event) => handleClick(event)}>Cerrar sesión</button>
                    </div>

                </nav>
            </div>
        </aside>
    )
} 