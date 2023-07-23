import { useEffect } from 'react';
import { searchStore, hotelStore } from '../../Store';
import HotelListSearch from '../../components/HotelsList/HotelListSearch';
import HotelList from '../../components/HotelsList/HotelsList';
import NavBar from '../../components/NavBar/NavBar';
import Footer from "../../components/Footer/Footer";


export default function HomePage() {
	const searchResults = searchStore((state) => state.searchResults)
	const { fetchHotels } = hotelStore()

	useEffect(() => {
		fetchHotels()
	}, []) // eslint-disable-line

	return (
		<div className="bg-slate-600 min-h-screen">
			<div className="relative z-10" >
				<NavBar />

			</div>

			<div className="p-10">
				<div className="mt-[70px]">
				</div>

				<div className="mt-8">
					{searchResults?.length ? <HotelListSearch /> : <HotelList />}
				</div>
			</div>
			<div className='mt-[4%]'>
				<Footer />
				</div>

		</div>

	);
}
