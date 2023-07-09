
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { User } from '@phosphor-icons/react'

export default function NavBar() {
	return (
		<nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 flex items-center justify-between w-full">
			<Link to="/" className="text-white hover:text-gray-300 flex items-center">
				<span>Login</span>
				<User size={32} className="ml-2" />
			</Link>

			<SearchBar />

			<div>
				<h1 className="text-white">
					<span className="text-4xl font-bold">HOTEL</span>
					<span className="text-blue-500 text-4xl font-extrabold">HUNT</span>
				</h1>
			</div>

			<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
				User
			</button>
		</nav>
	);








}

