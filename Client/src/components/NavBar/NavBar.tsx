
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { hotelStore, searchStore, tokenStore } from '../../Store';
import UserMenu from '../UserMenuDropDown/UserMenu';
import AdminMenu from '../UserMenuDropDown/AdminMenu';
import { Dropdown, Button, Input } from '@rewind-ui/core';
import {useState} from "react"
import CartComponent from '../CartComponent/CartComponent';


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
			{
				isLogged.length ? (
					isLogged[2] === "normal" ? <UserMenu /> : <AdminMenu />)
					:
					(
						<h1 onClick={() => navigate('/login')}>Login</h1>

					)
			}



			<SearchBar />

			<button onClick={handleAllHotels} >Mostrar todos los hoteles</button>
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
			<div>
				<h1 className="text-white">
					<span onClick={() => navigate('/')} className="text-4xl font-bold">HOTEL</span>
					<span onClick={() => navigate('/')} className="text-blue-500 text-4xl font-extrabold">HUNT</span>
				</h1>

			</div>
			<CartComponent/>

		</nav>
	);








}

