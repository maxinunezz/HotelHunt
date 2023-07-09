

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
		<div>
			<h1>photo: {photo}</h1>
			<h3> name: {name} </h3>
			<h1> description: {description}</h1>
			<h1> country: {country}</h1>
			<h1> city: {city}</h1>
			
		</div>
	);
};
export default Card;


