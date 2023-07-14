import { Button } from '@rewind-ui/core';

interface CardProps {
	id: string;
	name: string;
	description: string;
	country: string;
	city: string;
	photo: string;
}
const Card: React.FC<CardProps> = ({
	name,
	description,
	country,
	city,
	photo,
}) => {
	return (
		<div className="bg-white h-80 max-w-5xl rounded-md shadow-md flex mx-auto transform hover:scale-105 transition duration-300">
			<img
				src={photo}
				alt={name}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src =
						'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
				}}
				className="w-1/3 h-full object-cover rounded-l-md"
			/>
			<div className="w-2/3 p-4 flex flex-col justify-between">
				<div className="h-full flex flex-col justify-between">
					<div>
						<h2 className="text-lg font-bold mb-1">{name}</h2>
						<p className="text-gray-600 text-sm overflow-hidden overflow-ellipsis">
							{description}
						</p>
						<p className="text-gray-500 mt-1 text-sm">
							Ubicación: {city}, {country}
						</p>
					</div>
					<div className="flex justify-end">
						<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
							Reservar
						</button>
					</div>
				</div>
			</div>
		</div>
	);



};
export default Card;
