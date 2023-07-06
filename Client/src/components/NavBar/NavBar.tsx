import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
	return (
		<nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 space-x-5 flex items-center mr-auto justify-between w-full">
			<Link to="/">Login Page</Link>

			<SearchBar />

			<div>
				<h1>algo</h1>
			</div>

			<button>User</button>
		</nav>
	);
}
