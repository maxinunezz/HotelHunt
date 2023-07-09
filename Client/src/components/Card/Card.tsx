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
		<div className="bg-white min-h-[340px] rounded-md shadow-md flex">
			<img
				src={photo}
				alt={name}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src =
						'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
				}}
				className="w-1/4 h-auto object-cover rounded-md"
			/>
			<div className="w-3/4 p-4 flex flex-col justify-between">
				<div>
					<h2 className="text-xl font-bold mb-2">{name}</h2>
					<p className="text-gray-600">{description}</p>
					<p className="text-gray-500 mt-2">
						Ubicación: {city}, {country}
					</p>
				</div>
				<div className="flex justify-end items-center">
					<Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
						Reservar
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Card;
