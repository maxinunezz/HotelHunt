import { Star, User, Users, UsersFour, UsersThree } from "@phosphor-icons/react";
import { roomsSearchStore, roomsStore } from "../../Store";
import NavbarDetail from "../../components/NavBarDetail/NavBarDetail";
import RoomCard from "../../components/RoomCard/RoomCard";
import { useFetchRooms } from "../../hooks";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from "@rewind-ui/core";
import { filterResetToast } from "../../components/toast";

const RoomFilter = () => {
  const navigate = useNavigate();
  useFetchRooms();
  const allRooms = roomsStore((state) => state.rooms);
  const roomsFiltered = roomsSearchStore((state) => state.roomsFilter)
  const { fetchFilterRooms, sortByPrice, reset } = roomsSearchStore()
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: ""
  });
  const [checkboxValuesCategory, setCheckboxValues] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false
  });
  const [checkboxValuesCapacity, setCheckboxCapacity] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false
  });

  const handleMinPriceChange = (e) => {
    setFilters({ ...filters, minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e) => {
    setFilters({ ...filters, maxPrice: e.target.value });
  };

  useEffect(() => {
    applyFilters();
  }, [filters]); // Ejecuta applyFilters cuando filters cambie

  const applyFilters = () => {
    // Lógica para aplicar los filtros
    if (Number(filters.maxPrice) < Number(filters.minPrice)) {
      const maxAux = filters.minPrice;
      const minAux = filters.maxPrice;
      console.log("ctm ctm ctm");
      setFilters({
        minPrice: minAux,
        maxPrice: maxAux
      });
    }

    fetchFilterRooms(allRooms, filters, checkboxValuesCategory, checkboxValuesCapacity)


  };


  const handleSortBy = async (event) => {
    const sortByValue = event.target.value;
    roomsFiltered.length ? sortByPrice(roomsFiltered, sortByValue) : sortByPrice(allRooms, sortByValue)



  };

  const handleReset = () => {
    filterResetToast("Filtros reseteados")
    reset()
  }
  
  const filteredRooms = filters.minPrice === "62" && filters.maxPrice === "62" ? [] : roomsFiltered;

  return (
    <div className="flex-col bg-slate-600">
      {/* Navbar */}
      <NavbarDetail />

      {/* Espacio para los filtros y la lista de habitaciones */}
      <div className="flex">
        {/* Filtros */}
        <div className="dark:bg-gray-900 dark:border-gray-700 w-[500px] h-[700px] p-10 text-white mt-[20px] ml-[20px] rounded h-screen ">
          <div className="flex">
            <div className="mx-2 text-black">
              <div className="text-blue-500 font-bold">
                <label htmlFor="minPrice">Precio mínimo:</label>
              </div>

              <input
                type="number"
                id="minPrice"
                value={filters.minPrice}
                onChange={handleMinPriceChange}
                className="my-3"
              />
              <section className="range-slider container">
                <span className="full-range"></span>
                <span className="incl-range"></span>
                <input
                  name="rangeOne"
                  value={filters.minPrice}
                  min="41"
                  max="500"
                  step="10"
                  type="range"
                  onChange={handleMinPriceChange}
                  className="w-[100%]"
                />
              </section>
            </div>
            <div className="flex-col text-black ml-6">
              <div className="text-blue-500 font-bold">
                <label htmlFor="maxPrice">Precio máximo:</label>
              </div>

              <input
                type="number"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
                className="my-3"
              />
              <section className="range-slider container">
                <span className="full-range"></span>
                <span className="incl-range"></span>
                <input
                  name="rangeTwo"
                  value={filters.maxPrice}
                  min="42"
                  max="500"
                  step="10"
                  type="range"
                  onChange={handleMaxPriceChange}
                  className="w-[100%]"
                />
              </section>
            </div>
          </div>
          <div className="flex mt-4">
            <select
              id="sort-by"
              className="bg-blue-500 rounded"
              onChange={handleSortBy}
            >
              <option value="">Ordenar por</option>
              <option value="price-asc">Precio (ascendente)</option>
              <option value="price-desc">Precio (descendente)</option>
              <option value="capacity-asc">Capacidad (minima)</option>
              <option value="capacity-desc">Capacidad (maxima)</option>
            </select>
          </div>
          {/* Div de categoría */}
          <div className="mt-5">
            <h3 className="text-blue-500 font-bold">Categoría</h3>
            {/* Componente de checkboxes */}
            <div className="flex mt-2 ">
              <input
                type="checkbox"
                id="checkbox5"
                checked={checkboxValuesCategory.checkbox5}
                onChange={() =>
                  setCheckboxValues({
                    ...checkboxValuesCategory,
                    checkbox5: !checkboxValuesCategory.checkbox5
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2">
                5 estrellas{" "}
                &nbsp;
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
              </label>

            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox4"
                checked={checkboxValuesCategory.checkbox4}
                onChange={() =>
                  setCheckboxValues({
                    ...checkboxValuesCategory,
                    checkbox4: !checkboxValuesCategory.checkbox4
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2">
                4 estrellas{" "}
                &nbsp;
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox3"
                checked={checkboxValuesCategory.checkbox3}
                onChange={() =>
                  setCheckboxValues({
                    ...checkboxValuesCategory,
                    checkbox3: !checkboxValuesCategory.checkbox3
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2">
                3 estrellas{" "}
                &nbsp;
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox2"
                checked={checkboxValuesCategory.checkbox2}
                onChange={() =>
                  setCheckboxValues({
                    ...checkboxValuesCategory,
                    checkbox2: !checkboxValuesCategory.checkbox2
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2">
                2 estrellas{" "}
                &nbsp;
                {<Star size={26} color="gold" weight="fill" />}
                {<Star size={26} color="gold" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox1"
                checked={checkboxValuesCategory.checkbox1}
                onChange={() =>
                  setCheckboxValues({
                    ...checkboxValuesCategory,
                    checkbox1: !checkboxValuesCategory.checkbox1
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2">
                1 estrella
                &nbsp;
                {<Star size={26} color="gold" weight="fill" />}
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-blue-500 font-bold">Capacidad</h3>
            {/* Componente de checkboxes */}
            <div className="flex mt-2">


            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox4"
                checked={checkboxValuesCapacity.checkbox4}
                onChange={() =>
                  setCheckboxCapacity({
                    ...checkboxValuesCapacity,
                    checkbox4: !checkboxValuesCapacity.checkbox4
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2 text-white">
                4 personas{" "}
                &nbsp;
                {<UsersFour size={26} color="white" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox3"
                checked={checkboxValuesCapacity.checkbox3}
                onChange={() =>
                  setCheckboxCapacity({
                    ...checkboxValuesCapacity,
                    checkbox3: !checkboxValuesCapacity.checkbox3
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2 text-white">
                3 personas{" "}
                &nbsp;
                {<UsersThree size={26} color="white" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox2"
                checked={checkboxValuesCapacity.checkbox2}
                onChange={() =>
                  setCheckboxCapacity({
                    ...checkboxValuesCapacity,
                    checkbox2: !checkboxValuesCapacity.checkbox2
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2 text-white">
                2 personas
                &nbsp;
                {<Users size={26} color="white" weight="fill" />}
              </label>
            </div>
            <div className="flex mt-2">
              <input
                type="checkbox"
                id="checkbox1"
                checked={checkboxValuesCapacity.checkbox1}
                onChange={() =>
                  setCheckboxCapacity({
                    ...checkboxValuesCapacity,
                    checkbox1: !checkboxValuesCapacity.checkbox1
                  })
                }
              />
              <label htmlFor="checkbox1" className="flex ml-2 text-white">
                1 persona
                &nbsp;
                {<User size={26} color="white" weight="fill" />}
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              onClick={applyFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Aplicar filtros
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Resetear filtros
            </button>
          </div>
        </div>

        {/* Lista de habitaciones */}
        <div className="flex-col ml-[100px] mt-[20px]">
          {filteredRooms.length ? (
            <div className="grid grid-cols-3 justify-center mb-4 gap-5">
              {filteredRooms.map((room) => (
                <Link to={`/roompage/${room.id}`} key={room.id}>
                  <RoomCard
                    id={room.id}
                    key={room.id}
                    name={room.name}
                    description={room.description}
                    price={room.price}
                    pax={room.pax}
                    services={room.services}
                    photo={room.photo}
                    floorNumber={room.floorNumber}
                    disabled={room.disabled}
                    hotelCategory={room.hotelCategory}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-white text-center mt-8">No se encontraron habitaciones con los filtros seleccionados.</p>
          )}
        </div>
      </div>
    </div>
  );

};

export default RoomFilter;
