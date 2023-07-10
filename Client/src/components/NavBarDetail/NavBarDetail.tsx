import React from 'react';

export default function NavbarDetail() {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="flex items-center">
                <img
                    className="h-[70px] w-[80px] mr-4"
                    src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png"
                    alt="Logo"
                />
                <div>
                    <h1 className="text-white">
                        <span className="text-5xl font-bold tracking-wider">HOTEL</span>
                        <span className="text-blue-500 text-5xl font-extrabold tracking-wider">HUNT</span>
                    </h1>
                </div>
            </div>
            <ul className="flex">
                <li className="mr-4">
                    <a href="#" className="text-white">Inicio</a>
                </li>
                <li className="mr-4">
                    <a href="#" className="text-white">Servicios</a>
                </li>
                <li className="mr-4">
                    <a href="#" className="text-white">Reservas</a>
                </li>
                <li>
                    <a href="#" className="text-white">Contacto</a>
                </li>
            </ul>
        </nav>
    );
}
