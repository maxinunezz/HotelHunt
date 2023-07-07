import React from 'react';
import create from 'zustand';

type FormState = {
  nombre: string;
  locacion: string;
  capacidad: string;
  descripcion: string;
  imagen: string;
  setNombre: (nombre: string) => void;
  setLocacion: (locacion: string) => void;
  setCapacidad: (capacidad: string) => void;
  setDescripcion: (descripcion: string) => void;
  setImagen: (imagen: string) => void;
};

const useFormStore = create<FormState>((set) => ({
  nombre: '',
  locacion: '',
  capacidad: '',
  descripcion: '',
  imagen: '',
  setNombre: (nombre) => set({ nombre }),
  setLocacion: (locacion) => set({ locacion }),
  setCapacidad: (capacidad) => set({ capacidad }),
  setDescripcion: (descripcion) => set({ descripcion }),
  setImagen: (imagen) => set({ imagen }),
}));


export default function FormPageH() {
  const {
    nombre,
    locacion,
    capacidad,
    descripcion,
    imagen,
    setNombre,
    setLocacion,
    setCapacidad,
    setDescripcion,
    setImagen,
  } = useFormStore();

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleLocacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocacion(event.target.value);
  };

  const handleCapacidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacidad(event.target.value);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(event.target.value);
  };

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
    
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImagen(e.target?.result as string);
      };
    
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
    console.log('Nombre:', nombre);
    console.log('Locacion:', locacion);
    console.log('Capacidad:', capacidad);
    console.log('Descripcion:', descripcion);
    console.log('Imagen:', imagen);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Formulario para hoteles</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="locacion" className="block text-sm font-medium text-gray-700">
            Locacion:
          </label>
          <input
            type="text"
            id="locacion"
            value={locacion}
            onChange={handleLocacionChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
            Capacidad:
          </label>
          <input
            type="number"
            id="capacidad"
            value={capacidad}
            onChange={handleCapacidadChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripcion:
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
            Imagen:
          </label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Registrar
        </button>
      </form>
      {imagen && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Imagen seleccionada:</h3>
          <img src={imagen} alt="Imagen seleccionada" className="max-w-full" />
        </div>

      )}
    </div>
);
      }

