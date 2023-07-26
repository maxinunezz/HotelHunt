import { Star, User, Users, UsersFour, UsersThree } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { roomsSearchStore, roomsStore, tokenStore } from "../../Store";
import NavbarDetail from "../../components/NavBarDetail/NavBarDetail";
import RoomCard from "../../components/RoomCard/RoomCard";
import { filterResetToast } from "../../components/toast";
import { useFetchRooms } from "../../hooks";
import PaginadoGlobal from "../../components/Pagination/PaginadoGlobal";

const RoomFilter = () => {
  useFetchRooms()
  const { saveInfo } = tokenStore()
  const roomsPerPage = 6;
  const allRooms = roomsStore((state) => state.rooms);
  const roomsFiltered = roomsSearchStore((state) => state.roomsFilter)
  const { fetchFilterRooms, sortByPrice, reset } = roomsSearchStore()

  const currentPage = roomsStore((state) => state.currentPage)


  useEffect(() => {
		const session: string | null = window.sessionStorage.getItem("tokenUser");
		if (session) {
			const parsedSession = JSON.parse(session);
			console.log(parsedSession);
			saveInfo(parsedSession);
		}
	}, []);

  useEffect(() => {
    reset(allRooms)
  }, [allRooms]) // eslint-disable-line

  const initialStates = {
    filters: {
      minPrice: "",
      maxPrice: ""
    },
    category: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false
    },
    capacity: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false
    }
  }

  const [filters, setFilters] = useState(initialStates.filters);
  const [checkboxValuesCategory, setCheckboxValues] = useState(initialStates.category);
  const [checkboxValuesCapacity, setCheckboxCapacity] = useState(initialStates.capacity);
  const sortByRef = useRef<HTMLSelectElement | null>(null)



  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, minPrice: event.target.value });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, maxPrice: event.target.value });
  };

  useEffect(() => {
    applyFilters();
  }, [filters]); // eslint-disable-line

  const applyFilters = () => {
    // Lógica para aplicar los filtros
    const minPrice = Number(filters.minPrice);
    const maxPrice = Number(filters.maxPrice);

    if (minPrice > maxPrice) {
      const maxAux = minPrice;
      const minAux = maxPrice;

      setFilters({
        ...filters,
        minPrice: minAux.toString(),
        maxPrice: maxAux.toString()
      });
    }

    fetchFilterRooms(allRooms, filters, checkboxValuesCategory, checkboxValuesCapacity)
  };


  const handleSortBy = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value;
    roomsFiltered.length ? sortByPrice(roomsFiltered, sortByValue) : sortByPrice(allRooms, sortByValue)
  };

  const handleReset = () => {
    filterResetToast("Filtros reseteados")
    setFilters(initialStates.filters)
    setCheckboxValues(initialStates.category)
    setCheckboxCapacity(initialStates.capacity)
    if (sortByRef.current?.value) {
      sortByRef.current.value = ''
    }
    reset(allRooms)
  }


  const filteredRooms = filters.minPrice === "62" && filters.maxPrice === "62" ? [] : roomsFiltered;
  const totalRooms = filteredRooms?.length;
  const firstIndex = (currentPage - 1) * roomsPerPage;
  const lastIndex = currentPage * roomsPerPage;
  const currentRooms = filteredRooms?.slice(firstIndex, lastIndex);
  const { changeCurrentPage } = roomsStore();

  const handlePaginadoHome = (pageNumbers: any) => {
    //tercer componente del paginado
    changeCurrentPage(pageNumbers);

  };

  return (
    <div className="flex-col bg-slate-600 ">



      {/* Espacio para los filtros y la lista de habitaciones */}
      <div className="flex">
        {/* Filtros */}
        <div className="dark:bg-gray-900 dark:border-gray-700 w-[500px] p-10 text-white mt-[150px] ml-[20px] rounded h-screen ">
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
              ref={sortByRef}
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
        <div className="flex-col ml-[100px] mt-[150px]">
          {totalRooms ? (
            <div className="grid grid-cols-3 justify-center mb-4 gap-5 p-10" >
              {currentRooms.map((room) => (
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

          <PaginadoGlobal
            elementsPerPage={roomsPerPage}
            elementToShow={roomsFiltered}
            pageSet={handlePaginadoHome}
            currentPage={currentPage}
          />
        </div>
      </div>
      <NavbarDetail />
    </div>
  );

};

export default RoomFilter;