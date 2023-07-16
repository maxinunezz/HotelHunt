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
	const [cookies, setCookie] = useCookies(['access']);
	const { saveInfo } = tokenStore();


	const findCookie = () => {
		const accessToken = cookies.access;
		console.log('Valor de la cookie "access":', accessToken);
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
