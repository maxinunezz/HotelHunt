interface RoomCardProps {
   id:string;
   name:string;
   description:string;
   price:string
   pax:number;
   services:string;
   photo:string; 
   floorNumber:string;
   disabled:boolean;
}


const RoomCard: React.FC<RoomCardProps> = ({
    name,
    price,
    pax,
    services,
    photo,
    disabled
}) => {
    return (
        <div className="bg-white border-2  border-blue-500 w-[300px] h-[250px]">
            <h2>Habitación: {name}</h2>
            <h2>Pax: {pax}</h2>
            <h2>Servicios: {services}</h2>
            <h2>Foto:</h2>
            <img src={photo} alt="" />
            <h2>Disponibilidad: {disabled ? "No disponible" : "Disponible"}</h2>
            <h2>Precio: {price}</h2>
        </div>
    )
}

export default RoomCard;