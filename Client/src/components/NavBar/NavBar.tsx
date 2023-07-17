import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { hotelStore, searchStore, tokenStore } from "../../Store";
import UserMenu from "../UserMenuDropDown/UserMenu";
import AdminMenu from "../UserMenuDropDown/AdminMenu";
import { Dropdown, Button, Input } from "@rewind-ui/core";
import { UserCircle } from '@phosphor-icons/react';
import { useEffect, useState } from "react";
import CartComponent from '../CartComponent/CartComponent';

export default function NavBar() {
  const navigate = useNavigate();
  const isLogged = tokenStore((state) => state.userState);
  const allHotels = hotelStore((state) => state.hotels);
  const searchResults = searchStore((state) => state.searchResults)
  const { reset, orderByCategorySearch, orderByNameSearch } = searchStore();
  const { orderByName, resetHotels, fetchHotels , orderByCategory} = hotelStore();
  const [filterByNameState, setfilterByNameState] = useState();

  const [orderByNameState, setOrderByNameState] = useState("");
  const [orderByCategoryState, setOrderByCategoryState] = useState("");

  const handleAllHotels = (element: Event) => {
    element.preventDefault();
    resetHotels();
    fetchHotels();
    reset();
  };

  
  

  
  useEffect(() => {
    orderByName(allHotels, orderByNameState);
    orderByNameSearch(searchResults, orderByNameState)
	setOrderByNameState("")
	setOrderByCategoryState("")
  }, [orderByNameState]);

  useEffect(() => {
    orderByCategory(allHotels, orderByCategoryState);
    orderByCategorySearch(searchResults, orderByCategoryState)
	setOrderByNameState("")
	setOrderByCategoryState("")
  }, [orderByCategoryState]);

  const handleRoomSearch=()=>{
    navigate('/roomSearch')
  }

  return (
		<nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 flex items-center justify-between w-full">

			<div className="flex items-center">
				<img
					className="h-[70px] w-[80px] mr-2"
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
			<SearchBar />
      <button onClick={handleRoomSearch} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
        Habitaciones</button>

			<button
				className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
				onClick={handleAllHotels}
			>
				Mostrar todos los hoteles
			</button>

			<Dropdown size='md'>
				<Dropdown.Trigger>
					<Button className="w-500">{`Ordenar por: `}</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
        <Dropdown.Item onClick={() => setOrderByNameState("ASC")}>
            Ordenar por Nombre ASC
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOrderByNameState("DES")}>
            Ordenar por Nombre DES
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOrderByCategoryState("ASC")}>
            Ordenar por Categoria ASC
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOrderByCategoryState("DES")}>
            Ordenar por Categoria DES
          </Dropdown.Item>					
				</Dropdown.Content>
			</Dropdown>

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
			}
        <CartComponent/>

		</nav>
	);

  
}

