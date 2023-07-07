import React from 'react';
import create from 'zustand';
import { AiOutlineReload } from 'react-icons/ai';

type FormState = {
  hotel: string;
  roomNumber: string;
  floor: string;
  image: File | null;
  description: string;
  services: string[];
  capacity: string;
  setHotel: (hotel: string) => void;
  setRoomNumber: (roomNumber: string) => void;
  setFloor: (floor: string) => void;
  setImage: (image: File | null) => void;
  setDescription: (description: string) => void;
  setServices: (services: string[]) => void;
  setCapacity: (capacity: string) => void;
  resetForm: () => void;
};

const useFormStore = create<FormState>((set) => ({
  hotel: '',
  roomNumber: '',
  floor: '',
  image: null,
  description: '',
  services: [],
  capacity: '',
  setHotel: (hotel) => set({ hotel }),
  setRoomNumber: (roomNumber) => set({ roomNumber }),
  setFloor: (floor) => set({ floor }),
  setImage: (image) => set({ image }),
  setDescription: (description) => set({ description }),
  setServices: (services) => set({ services }),
  setCapacity: (capacity) => set({ capacity }),
  resetForm: () =>
    set({
      hotel: '',
      roomNumber: '',
      floor: '',
      image: null,
      description: '',
      services: [],
      capacity: '',
    }),
}));

const hotels = ['Hotel 1', 'Hotel 2', 'Hotel 3'];
const capacities = ['1', '2', '3'];

const FormPageR: React.FC = () => {
  const {
    hotel,
    roomNumber,
    floor,
    image,
    description,
    services,
    capacity,
    setHotel,
    setRoomNumber,
    setFloor,
    setImage,
    setDescription,
    setServices,
    setCapacity,
    resetForm,
  } = useFormStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Aquí puedes realizar las acciones necesarias con los datos del formulario
    // Por ejemplo, enviar los datos a una API, guardar en una base de datos, etc.

    console.log('Formulario enviado con éxito.');

    // Reinicia los campos del formulario después de enviarlo
    resetForm();
  };

  const handleServicesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServices = Array.from(event.target.selectedOptions, (option) => option.value);
    setServices(selectedServices);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file || null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500 flex flex-col justify-center">
        <h2 className="text-3xl text-white font-bold px-8 text-center">Título del área azul</h2>
      </div>
      <div className="w-1/2 bg-gray-800 shadow-lg p-8 overflow-y-auto">
        <div className="max-h-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">✨REGISTRO DE HABITACIONES✨</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="hotel" className="block text-sm font-medium text-blue-500">
                Hotel:
              </label>
              <select
                id="hotel"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona un hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel} value={hotel}>
                    {hotel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-blue-500">
                Número / Nombre de habitación:
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="floor" className="block text-sm font-medium text-blue-500">
                Piso:
              </label>
              <input
                type="number"
                id="floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-blue-500">
                Imagen:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-blue-500">
                Descripción:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="services" className="block text-sm font-medium text-blue-500">
                Servicios:
              </label>
              <select
                id="services"
                multiple
                value={services}
                onChange={handleServicesChange}
                className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="servicio1">Servicio 1</option>
                <option value="servicio2">Servicio 2</option>
                <option value="servicio3">Servicio 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-blue-500">
                Capacidad:
              </label>
              <select
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona la capacidad</option>
                {capacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
              >
                Registrar
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md ml-4"
              >
                <AiOutlineReload size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPageR;
