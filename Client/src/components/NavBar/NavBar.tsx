
import SearchBar from '../SearchBar/SearchBar';
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


		</nav>
	);








}

