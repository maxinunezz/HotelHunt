import HotelList from '../../components/HotelsList/HotelsList';
import NavBar from '../../components/NavBar/NavBar';


export default function HomePage() {
	



	return (
		<div className="bg-slate-600 min-h-screen w-screen p-10">
			<NavBar/>


			<div className="mt-16">
				<HotelList />
			</div>
		</div>

	);
}
