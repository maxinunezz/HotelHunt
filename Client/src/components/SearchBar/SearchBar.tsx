import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';
import { useFetchHotels } from '../../hooks';

import { Dropdown, Button, Input } from '@rewind-ui/core';

const SearchBar = () => {
	useFetchHotels();

	const [input, setinput] = useState('');
	const [selectedOption, setSelectedOption] = useState<string | undefined>();

	console.log('selectedOption', selectedOption);
	return (
		<div className="bg-slate-500 p-2 flex items-center">
			<Input
				value={input}
				onChange={(e) => setinput(e.target.value)}
				className="rounded-md text-black mr-2"
				type="text"
				placeholder="Buscar driver..."
			/>
			<Dropdown>
				<Dropdown.Trigger>
					<Button>{selectedOption ?? 'Buscar por'}</Button>
				</Dropdown.Trigger>
				<Dropdown.Content>
					<Dropdown.Item onClick={() => setSelectedOption('Region')}>
						Region
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedOption('Nombre')}>
						Nombre
					</Dropdown.Item>
				</Dropdown.Content>
			</Dropdown>

			<button className="p-2" type="submit">
				<MagnifyingGlass size={28} weight="bold" />
			</button>
		</div>
	);
};

export default SearchBar;
