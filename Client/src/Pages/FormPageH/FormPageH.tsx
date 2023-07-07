import React from 'react';
import create from 'zustand';
import { AiOutlineReload } from 'react-icons/ai';
import BackButton from '../../components/BackButton/BackButton';
import axios from 'axios';

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
	errors: {
		[key: string]: string;
	};
	isCreated: boolean;
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
	errors: {},
	isCreated: false,
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
		errors,
		isCreated,
	} = useFormStore();

	const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();
		setNombre(value);

		if (value === '') {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, nombre: 'El nombre es obligatorio.' },
			}));
		} else {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, nombre: '' },
			}));
		}
	};

	const handleLocacionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();
		setLocacion(value);

		if (value === '') {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, locacion: 'La locación es obligatoria.' },
			}));
		} else {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, locacion: '' },
			}));
		}
	};

	const handleCapacidadChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value.trim();
		setCapacidad(value);

		if (value === '') {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, capacidad: 'La capacidad es obligatoria.' },
			}));
		} else {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, capacidad: '' },
			}));
		}
	};

	const handleDescripcionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const value = event.target.value.trim();
		setDescripcion(value);

		if (value === '') {
			useFormStore.setState((state) => ({
				errors: {
					...state.errors,
					descripcion: 'La descripción es obligatoria.',
				},
			}));
		} else {
			useFormStore.setState((state) => ({
				errors: { ...state.errors, descripcion: '' },
			}));
		}
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

	const handleBorrarImagen = () => {
		setImagen('');
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// Validaciones del formulario
		const errors: { [key: string]: string } = {};

		if (nombre.trim() === '') {
			errors.nombre = 'El nombre es obligatorio.';
		}

		if (locacion.trim() === '') {
			errors.locacion = 'La locación es obligatoria.';
		}

		if (capacidad.trim() === '') {
			errors.capacidad = 'La capacidad es obligatoria.';
		}

		if (descripcion.trim() === '') {
			errors.descripcion = 'La descripción es obligatoria.';
		}

		// Verifica otras condiciones y actualiza el objeto de errores si es necesario

		if (Object.keys(errors).length > 0) {
			// Si existen errores, actualiza el estado de errores en el store
			useFormStore.setState({ errors });
		} else {
			// Si no hay errores, puedes continuar con el envío o realizar otras acciones
			console.log('Formulario enviado con éxito.');

			// Reinicia el estado de errores y marca el formulario como creado
			useFormStore.setState({ errors: {}, isCreated: true });
		}
		try {
			const data = await axios.post('http://localhost:3001/hotel', {
				users: '',
				name: nombre,
				description: descripcion,
				country: 'dasdasd',
				city: 'asdasd',
				photo: 'asdadsadsa',
				floorNumber: 'asdasdasd',
			});

			console.log('data', data);
		} catch (error) {
			console.log('error');
		}
	};

	const handleReset = () => {
		setNombre('');
		setLocacion('');
		setCapacidad('');
		setDescripcion('');
		setImagen('');
		useFormStore.setState({ errors: {}, isCreated: false });
	};

	return (
		<div className="flex h-screen">
			<div className="w-full bg-blue-500 flex flex-col justify-center">
				<h2 className="text-3xl text-white font-bold px-8 text-center">
					Título del área azul
				</h2>
			</div>
			<div className="w-full bg-gray-800 shadow-lg p-8 overflow-y-auto">
				<div className="max-h-full">
					<div className="flex justify-start">
						<BackButton />
					</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">
						✨REGISTRO DE HOTELES✨
					</h2>
					{isCreated && (
						<p className="text-green-500">El formulario se creó con éxito.</p>
					)}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="nombre"
								className="block text-sm font-medium text-blue-500"
							>
								Nombre:
							</label>
							<input
								type="text"
								id="nombre"
								value={nombre}
								onChange={handleNombreChange}
								className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
						</div>
						<div>
							<label
								htmlFor="locacion"
								className="block text-sm font-medium text-blue-500"
							>
								Locacion:
							</label>
							<input
								type="text"
								id="locacion"
								value={locacion}
								onChange={handleLocacionChange}
								className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.locacion && (
								<p className="text-red-500">{errors.locacion}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="capacidad"
								className="block text-sm font-medium text-blue-500"
							>
								Capacidad:
							</label>
							<input
								type="number"
								id="capacidad"
								value={capacidad}
								onChange={handleCapacidadChange}
								className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.capacidad && (
								<p className="text-red-500">{errors.capacidad}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="descripcion"
								className="block text-sm font-medium text-blue-500"
							>
								Descripcion:
							</label>
							<textarea
								id="descripcion"
								value={descripcion}
								onChange={handleDescripcionChange}
								className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
							{errors.descripcion && (
								<p className="text-red-500">{errors.descripcion}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="imagen"
								className="block text-sm font-medium text-blue-500"
							>
								Imagen:
							</label>
							<div className="border border-gray-300 rounded-md px-4 py-3 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 overflow-hidden">
								{imagen ? (
									<div className="flex items-center justify-between">
										<div className="w-10/12">
											<img
												src={imagen}
												alt="Imagen seleccionada"
												className="max-h-full max-w-full"
											/>
										</div>
										<button
											type="button"
											onClick={handleBorrarImagen}
											className="text-red-500 hover:text-red-700 focus:outline-none"
										>
											Borrar
										</button>
									</div>
								) : (
									<input
										type="file"
										id="imagen"
										accept="image/*"
										onChange={handleImagenChange}
										className="w-full"
									/>
								)}
							</div>
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
								onClick={handleReset}
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
}
