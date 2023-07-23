import { House,Bed } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';


export default function NavbarDetail() {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-900 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-[70px] w-[80px] mr-2"
            src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png"
            alt="Logo"
          />
          <h1 className="text-white">
            <span className="text-5xl font-bold tracking-wider">HOTEL</span>
            <span className="text-blue-500 text-5xl font-extrabold tracking-wider">HUNT</span>
          </h1>
        </div>
        <div className="flex items-center">
        <ul className="flex ml-8">
            <li className="mr-4 flex items-center">
              <House onClick={() => navigate('/')} size={32} weight="thin" className="mr-4 text-blue-500" />
              <a href="/" className="text-white">Inicio</a>
            </li>
            <li className="mr-4 flex items-center">
              <Bed onClick={() => navigate('/roomsearch')} size={32}  weight="thin" className="mr-4 text-blue-500" />
              <a href="/roomsearch" className="text-white">Todas las habitaciones</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
