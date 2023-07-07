

interface CardProps {
	id: string;
	name: string;
	description: string;
	country: string;
	city: string;
	photo: string;
	maxCapacity: string;
}
const Card: React.FC<CardProps> = ({
	name,
	description,
	country,
	city,
	maxCapacity,
	photo,
}) => {
	return (
		<div className="border-2 border-slate-950 bg-red-800 m-5 p-5">
			<h1>photo: {photo}</h1>
			<h3> name: {name} </h3>
			<h1> description: {description}</h1>
			<h1> country: {country}</h1>
			<h1> city: {city}</h1>
			<h1>Capacity: {maxCapacity}</h1>
		</div>
	);
};
export default Card;


