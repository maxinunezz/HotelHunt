import { Person } from '@phosphor-icons/react';



interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: string
  pax: number;
  services: string;
  photo: string[];
  floorNumber: string;
  disabled: boolean;
}


const RoomCard: React.FC<RoomCardProps> = ({
  name,
  price,
  pax,
  services,
  photo,
  disabled
}) => {
  const mainPhoto = photo[0];
  return (
    <div className="bg-white border-2 w-[300px] h-[450px] relative flex flex-col justify-end rounded-lg">
      <div className="w-full h-[60%] rounded-t-lg overflow-hidden">
        <div className="image-gallery inline-block">
          <img src={mainPhoto} alt="Foto de la habitación" className="w-full h-full object-cover" style={{ objectFit: 'cover' }} />
        </div>
      </div>
  
      <div className="p-[15px]">
        <h2 className="text-[20px] font-bold h-[40px] overflow-hidden">{name}</h2>
  
        <div className="mb-[30px]">
          <p className="mb-[10px]">Servicios: {services}</p>
          <p className="mb-[10px] text-green-400 font-bold">{disabled ? "No disponible" : "Disponible"}</p>
        </div>
  
        <div className="flex justify-end">
          <div className="text-right">
            <h2 className="font-bold text-lg">Precio: $ {price}</h2>
          </div>
          <div className="flex items-center ml-[125px]">
            <Person size={20} color="#317ba0" weight="fill" />
            <p className="mb-0">{pax}</p>
          </div>
        </div>
      </div>
    </div>
  );
  


}

export default RoomCard;