import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { hotelStore, searchStore, tokenStore } from '../../Store';
import UserMenu from '../UserMenuDropDown/UserMenu';
import AdminMenu from '../UserMenuDropDown/AdminMenu';
import { Dropdown, Button, Input } from '@rewind-ui/core';
import { UserCircle } from '@phosphor-icons/react';
import CartComponent from '../CartComponent/CartComponent';
import { useState } from 'react';

export default function NavBar() {
	const navigate = useNavigate()
	const isLogged = tokenStore((state) => state.userState)
	const allHotels = hotelStore((state) => state.hotels)
	const { reset } = searchStore()
	const { orderByNameASC, resetHotels, fetchHotels } = hotelStore()
	const [filterByNameState, setfilterByNameState] = useState()

	const handleAllHotels = (element: Event) => {
		element.preventDefault()
		resetHotels()
		fetchHotels()
		reset()
	}

	const handleOrderByName = () => {
		console.log("Handler filtro by name");
		orderByNameASC(allHotels)

	}
	const handleOrderByCategory = () => {
		console.log("Handler filtro by category");

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

			<button
				className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
				onClick={handleAllHotels}
			>
				todos los hoteles
			</button>

			<Dropdown size='md'>
				<Dropdown.Trigger>
					<Button className="w-500">{`Ordenar por: `}</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={() => handleOrderByName()}>
						Ordenar por Nombre ASC
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
