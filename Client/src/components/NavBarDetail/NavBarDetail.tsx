import { House, Bed, UserCircle } from '@phosphor-icons/react';
import { useNavigate, useLocation } from 'react-router';
import CartComponent from "../CartComponent/CartComponent";
import UserMenu from '../UserMenuDropDown/UserMenu';
import AdminMenu from '../UserMenuDropDown/AdminMenu';
import { tokenStore } from '../../Store';


export default function NavbarDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoomSearch = location.pathname.toLocaleLowerCase().includes('/roomsearch')
  const isLogged = tokenStore((state) => state.userState);



  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 mb-20 justify-between w-full ">
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
            <li onClick={() => navigate('/')} className="mr-4 flex items-center px-2 py-2 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              <House size={32} weight="thin" className="mr-4 text-blue-500" />
              <a className="text-white">Inicio</a>
            </li>
            {!isRoomSearch &&
              <li onClick={() => navigate('/roomsearch')} className="mr-4 flex items-center px-2 py-2 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <Bed size={32} weight="thin" className="mr-4 text-blue-500" />
                <a className="text-white">All Rooms</a>
              </li >}
            <li className=" mr-4 flex items-center px-2 py-2 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
              {
                isLogged.length ? (
                  isLogged[2] === "normal" ? <UserMenu /> : <AdminMenu />)
                  :
                  (
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/login')}>
                      <UserCircle size={32} className="mr-2" />
                      <h1>Login</h1>
                    </div>
                  )
              }</li>
            {isLogged.length ?
              <li className=" mr-4 flex items-center px-2 py-2 cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <CartComponent />
              </li>
              :
              <li></li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}