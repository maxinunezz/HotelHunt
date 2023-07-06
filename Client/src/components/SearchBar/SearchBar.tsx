import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';
import { useFetchHotels } from '../../hooks';
import { Dropdown, Button, Input } from '@rewind-ui/core';
import { searchStore } from '../../Store';
import { useStore } from 'zustand'


const SearchBar = () => {
	useFetchHotels();
	
	const [input, setinput] = useState('');
	const [selectedOption, setSelectedOption] = useState<string | undefined>();
	const [data, setData] = useState({
		criterion: "",
		value: "",
	})
	const { fetchSearchResults } = searchStore()


	const handleSearch = async () => {
		console.log("Estoy en el handler");
		
		if(!selectedOption) {
			return
		}
		setData({
			criterion: selectedOption,
			value: input,
		})

		await fetchSearchResults(data.criterion, data.value)
		console.log(data);
		
	}

	// const handleChange = (selectedOption: string, input: string) => {
	// 	let data = {
	// 		selectedOption,
	// 		input,
	// 	}
	// 	setData(data)
	// }

	return (
		<div className="bg-slate-500 p-2 flex items-center">
			<Input
				value={input}
				onChange={(event) => setinput(event.target.value)}
				className="rounded-md text-black mr-2"
				type="text"
				placeholder="Buscar driver..."
			/>
			<Dropdown>
				<Dropdown.Trigger>
					<Button>{selectedOption ?? 'Buscar por'}</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={() => setSelectedOption("city")}>
						Region
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedOption("name")}>
						Nombre
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown>

			<button className="p-2" type="submit" onClick={handleSearch}>
				<MagnifyingGlass size={28} weight="bold" />
			</button>
		</div >
	);
};

export default SearchBar;
