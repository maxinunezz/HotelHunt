import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { Dropdown, Button, Input } from '@rewind-ui/core';
import { searchStore } from '../../Store';


const SearchBar = () => {
	type SelectedOption = "country" | "name";

	const [input, setinput] = useState('');
	const [selectedOption, setSelectedOption] = useState<SelectedOption | undefined>();
	const [data, setData] = useState({
		criterion: "",
		value: "",
	})
	const { fetchSearchResults, setCurrentPageSearch } = searchStore()


	useEffect(() => {
		if (data.criterion !== "" && data.value !== "") {
			fetchSearchResults(data);
		}
	}, [data, fetchSearchResults]) // eslint-disable-line

	const handleSearch = async (element: React.MouseEvent<HTMLButtonElement>) => {
		element.preventDefault()

		if (!selectedOption) {
			return
		}
		setData({
			criterion: selectedOption,
			value: input,
		})
		setCurrentPageSearch(1)

	}



	const traduccion = {
		country: 'País',
		name: 'Nombre'
	}

	// const handleChange = (selectedOption: string, input: string) => {
	// 	let data = {
	// 		selectedOption,
	// 		input,
	// 	}
	// 	setData(data)
	// }

	return (
		<div className="bg-slate-500 p-2 rounded-md flex items-center w-[500px]">
			<Input
				value={input}
				onChange={(event) => setinput(event.target.value)}
				className="rounded-md text-black px-3 py-2 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
				type="text"
				placeholder="Buscar hotel..."
			/>
			<Dropdown>
				<Dropdown.Trigger>
					<Button className="w-32 justify-center">
						{selectedOption ? traduccion[selectedOption] : 'Buscar por'}
					</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item className="w-32" onClick={() => setSelectedOption("country")}>
						Buscar por País
					</Dropdown.Item>
					<Dropdown.Item className="w-32" onClick={() => setSelectedOption("name")}>
						Buscar por Nombre
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
