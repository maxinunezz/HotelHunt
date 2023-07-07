
import { searchStore } from '../../Store';
import NavBar from '../../components/NavBar/NavBar';

export default function HomePage() {
	const searchResultArray = searchStore(state => state.searchResults)
	console.log(searchResultArray);

	return (
		<div className="bg-slate-300 flex w-full">
			<NavBar />
			{
				searchResultArray.map(element => {
					return (
						<div>
							{element.name}
						</div>
					)
				})
			}

		</div>
	);
}
