import { useEffect } from 'react';
import { searchStore, hotelStore } from '../../Store';
import HotelListSearch from '../../components/HotelsList/HotelListSearch';
import HotelList from '../../components/HotelsList/HotelsList';
import NavBar from '../../components/NavBar/NavBar';
import { useCookies } from 'react-cookie';
import { tokenStore } from '../../Store';


export default function HomePage() {
	const searchResults = searchStore((state) => state.searchResults)
	const { fetchHotels } = hotelStore()
	const [cookies, setCookie] = useCookies(["json"]);
	const { saveInfo } = tokenStore();
	

	const findCookie = () => {
		if(cookies.json) {
			const arrayAux: [] = [];
			const logeado = true
			const userData = cookies.json && cookies.json.data;
			const tokenRaw = cookies.json && cookies.json.token;
			const statusadmin = cookies.json && cookies.json.admin;
			arrayAux.push(userData)
			arrayAux.push(tokenRaw)
			arrayAux.push(statusadmin)
			arrayAux.push(logeado)
			saveInfo(arrayAux)
		}
		// const accessToken = cookies;
		// console.log('Valor de la cookie "access":', accessToken);
	}

	useEffect(() => {
		fetchHotels()
		findCookie()

	}, [])


	return (
		<div className="bg-slate-600 min-h-screen w-screen p-10">
			<NavBar />


			<div className="mt-16">
				{
					searchResults?.length ? <HotelListSearch /> : <HotelList />
				}
			</div>
		</div>

	);
}
