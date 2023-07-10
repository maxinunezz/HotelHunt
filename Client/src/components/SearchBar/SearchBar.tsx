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


	const handleSearch = async (element) => {
		element.preventDefault()
		console.log("Estoy en el handler");
		if (!selectedOption) {
			return
		}
		setData({
			criterion: selectedOption,
			value: input,
		})

		await fetchSearchResults(data);

	}

	// const handleChange = (selectedOption: string, input: string) => {
	// 	let data = {
	// 		selectedOption,
	// 		input,
	// 	}
	// 	setData(data)
	// }

	return (
		<div className="bg-slate-500 p-2 rounded-md flex items-center w-[600px]">
			<Input
				value={input}
				onChange={(event) => setinput(event.target.value)}
				className="rounded-md text-black mr-2 flex-grow"
				type="text"
				placeholder="Buscar hotel..."
			/>
			<Dropdown>
				<Dropdown.Trigger>
					<Button className="w-40 justify-center">{selectedOption ?? 'Buscar por'}</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item className='w-20' onClick={() => setSelectedOption("city")}>
						Pais
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedOption("name")}>
						Nombre
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown>

			<button className="p-2" onClick={(element) => handleSearch(element)}>
				<MagnifyingGlass size={28} weight="bold" />
			</button>
		</div>

	);

};

export default SearchBar;
