import { roomsStore } from "../../Store";
import RoomCard from "../../components/RoomCard/RoomCard";
import { useFetchRooms } from "../../hooks";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const RoomFilter = () => {
    const navigate = useNavigate()
  useFetchRooms();
  const allRooms = roomsStore((state) => state.rooms);
  const [filters, setFilters] = useState({}); // Estado para almacenar los filtros seleccionados

  // Función para aplicar los filtros
  const applyFilters = () => {
    // Lógica para aplicar los filtros
    console.log("Filtros aplicados:", filters);
  };



  return (
    <div>
      {/* Navbar */}
      <nav>
        {/* Contenido de la navbar */}
      </nav>

      {/* Espacio para los filtros */}
      <div>
        {/* Contenido de los filtros */}
        {/* Aquí puedes agregar los elementos de filtro */}
        {/* Por ejemplo, inputs, selectores, etc. */}
      </div>

      {/* Botón para aplicar filtros */}
      <button onClick={applyFilters}>Aplicar filtros</button>

      {/* Botón para volver */}
      <button onClick={()=>navigate(-1)}>Volver</button>

      {/* Habitaciones */}
      <div className="grid grid-cols-3 justify-center mb-4 gap-5">
				{
					allRooms.map((room) => {
						return (
							<Link to={`/roompage/${room.id}`} key={room.id}>
								<RoomCard
									id={room.id}
									name={room.name}
									description={room.description}
									price={room.price}
									pax={room.pax}
									services={room.services}
									photo={room.photo}
									floorNumber={room.floorNumber}
									disabled={room.disabled}
								/>
							</Link>
						);
					})
			}
			</div>
     
      </div>
   
  );
};

export default RoomFilter;
