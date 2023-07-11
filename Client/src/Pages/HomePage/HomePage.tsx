import { useEffect } from 'react';
import { searchStore, hotelStore } from '../../Store';
import HotelListSearch from '../../components/HotelsList/HotelListSearch';
import HotelList from '../../components/HotelsList/HotelsList';
import NavBar from '../../components/NavBar/NavBar';


export default function HomePage() {
	const searchResults = searchStore((state) => state.searchResults)
	const { fetchHotels } = hotelStore()
	useEffect(() => {
		fetchHotels()
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
