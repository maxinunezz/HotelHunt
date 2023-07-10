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
    description,
    price,
    pax,
    services,
    photo,
    floorNumber,
    disabled
}) => {
    return (
        <div className="bg-rose-700 border-2 rounded-md w-[50%]">
            <h2>Habitación: {name}</h2>
            <h2>Descripción: {description}</h2>
            <h2>Pax: {pax}</h2>
            <h2>Servicios: {services}</h2>
            <h2>Foto:</h2>
            <img src={photo} alt="" />
            <h2>N° de Piso: {floorNumber}</h2>
            <h2>Disponibilidad: {disabled ? "No disponible" : "Disponible"}</h2>
            <h2>Precio: {price}</h2>
        </div>
    )
}

export default RoomCard;