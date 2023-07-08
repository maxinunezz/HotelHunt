interface RoomCardProps {
   id:string;
   name:string;
   description:string;
   pax:number;
   services:string;
   photo:string; 
}

const RoomCard: React.FC<RoomCardProps> = ({
    name,
    description,
    pax,
    services,
    photo
}) => {
    return (
        <div className="bg-rose-700 border-2 rounded-md w-[50%]">
            <h2>Habitación: {name}</h2>
            <h2>Descripción: {description}</h2>
            <h2>Pax: {pax}</h2>
            <h2>Servicios: {services}</h2>
            <h2>Foto: {photo}</h2>
        </div>
    )
}

export default RoomCard;