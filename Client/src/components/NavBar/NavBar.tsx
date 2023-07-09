
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { User } from '@phosphor-icons/react'
import { tokenStore } from '../../Store';
import UserMenu from '../UserMenuDropDown/UserMenu';
import AdminMenu from '../UserMenuDropDown/AdminMenu';

export default function NavBar() {
	const isLogged = tokenStore((state) => state.userState)
	console.log(isLogged);
	console.log("isLogged");

	return (
		<nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 flex items-center justify-between w-full">
			{
				isLogged.length ? (
					isLogged[1] === "normal" ? <UserMenu />: <AdminMenu/>)
					:
					(
						<UserMenu />

					)
			}



			<SearchBar />

			<div>
				<h1 className="text-white">
					<span className="text-4xl font-bold">HOTEL</span>
					<span className="text-blue-500 text-4xl font-extrabold">HUNT</span>
				</h1>

			</div>


		</nav>
	);








}

