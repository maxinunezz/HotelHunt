import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import BackButton from '../../components/BackButton/BackButton';
// import { AiOutlineReload } from 'react-icons/ai';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import Hotel from "./Hotel.png"
import { hotelStore, roomsStore, tokenStore } from '../../Store';
import { useNavigate, useParams } from 'react-router-dom';
const url = import.meta.env.VITE_URL;




interface FormValues {
	name: string;
	description: string;
	country: string;
	city: string;
	photo: string[];
	category: string;
	services: string[];
}
const arrayDePrueba = ['Servicio A', 'Servicio B', 'Servicio C'];

const formValidationSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.min(2, 'Minimo 2 caracteres'),

	description: yup
		.string()
		.trim()
		.min(10, 'Minimo 10 caracteres'),

	country: yup.string().trim(),
	city: yup.string().trim(),
	photo: yup
		.array()
		.of(yup.string().trim()) // Aquí validamos que cada elemento sea una cadena y se aplique trim.
		.test('maxPhotos', 'Se permiten máximo 3 fotos', (value) => !value || value.length <= 3),
	floorNumber: yup
		.string()
		.matches(/^[0-9]+$/, 'Solo se admiten numeros')
		.max(2, 'Maximo 2 digitos'),
	services: yup.array().min(1, 'Seleccione al menos un servicio'),
});

export default function FormPageHotelUpdate() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [isCreated, setIsCreated] = useState(false);
	const token = tokenStore((state) => state.userState)
	const { fetchHotels } = hotelStore()
	const allHotels = hotelStore((state) => state.hotels)
	const currentHotelData = allHotels.find((hotel) => hotel.id === id);

	console.log(currentHotelData);
	console.log(allHotels);


	useEffect(() => {
		fetchHotels()
	}, [])

	const CLOUD_NAME = "hotelmatimaxi4342";
	const UPLOAD_PRESET = "hotel_pf";

	const upload = async (file: string | Blob) => {
		const formdata = new FormData();
		formdata.append("file", file);
		formdata.append("upload_preset", UPLOAD_PRESET);
		const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
			{ method: "POST", body: formdata })
		const data = await response.json()
		return data.secure_url
	};

	const handleSubmit = useCallback(
		async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
			try {
				console.log(token[0]);
				const nameToBack = values.name ? values.name : currentHotelData?.name
				const descriptionToBack = values.description ? values.description : currentHotelData?.description
				const countryToBack = values.country ? values.country : currentHotelData?.country
				const cityToBack = values.city ? values.city : currentHotelData?.city
				const photoToBack = values.photo ? values.photo : currentHotelData?.photo
				const hotelCategoryToBack = values.category ? values.category : currentHotelData?.hotelCategory
				const servicesToBack = values.services ? values.services : currentHotelData?.services

				const data = await axios.put(
					`${url}/dashboard/hotel/${id}`,
					{
						name: nameToBack,
						description: descriptionToBack,
						country: countryToBack,
						city: cityToBack,
						photo: photoToBack,
						hotelCategory: hotelCategoryToBack,
						services: servicesToBack,
					},
					{
						headers: {
							authorization: `Bearer ${token[1]}`,
						},
					}
				);

				helpers.resetForm()
				setIsCreated(true);
				successToast('Hotel actualizado correctamente');
				console.log('data', data);
				navigate(-1)
			} catch (error) {

				errorToast('Hubo un error, intenta de nuevo');
			}
			helpers.setSubmitting(false);
		},
		[setIsCreated, token]
	);

	return (
		<div className="flex h-screen">
			<div className="w-full bg-blue-500 flex flex-col justify-center">
				<img src={Hotel} alt="Imagen" className="mx-auto max-w-full" />
				<h2 className="text-3xl text-white font-bold px-8 text-center">Actualiza tu info</h2>
			</div>
			<div className="w-full bg-gray-800 shadow-lg p-8 overflow-y-auto">
				<div className="max-h-full">
					<div className="flex justify-start">
						<BackButton />
					</div>
					<h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">
						✨HOTEL UPDATE✨
					</h2>
					{isCreated && (
						<p className="text-green-500">El formulario se creó con éxito.</p>
					)}
					<Formik<FormValues>
						enableReinitialize
						initialValues={{
							name: '',
							description: '',
							country: '',
							city: '',
							photo: currentHotelData?.photo || [],
							category: '',
							services: []
						}}
						onSubmit={handleSubmit}
						validationSchema={formValidationSchema}
					>
						{({ values, errors, setFieldValue, resetForm }) => {
							const areServicesSelected = values.services.length > 0;
							return (
								<Form>
									<FormControl
										validation={
											values.name.length === 0
												? 'none'
												: errors.name
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Nombre
										</FormControl.Label>
										<FormControl.Input
											type="text"
											placeholder={`Current name: ${currentHotelData?.name}`}
											onChange={async (event) => {
												await setFieldValue('name', event.target.value);
											}}
											value={values.name}

										/>
										<FormControl.Text>{errors.name}</FormControl.Text>
									</FormControl>
									<FormControl
										validation={
											values.description.length === 0
												? 'none'
												: errors.description
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Descripcion
										</FormControl.Label>
										<FormControl.Textarea
											placeholder={`Current description: ${currentHotelData?.description}`}
											onChange={async (event) => {
												await setFieldValue('description', event.target.value);
											}}
											value={values.description}
											className="h-40"

										/>
										<FormControl.Text>{errors.description}</FormControl.Text>
									</FormControl>
									<FormControl
										validation={
											values.country.length === 0
												? 'none'
												: errors.country
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Pais
										</FormControl.Label>
										<FormControl.Input
											type="text"
											placeholder={`Current country: ${currentHotelData?.country}`}
											onChange={async (event) => {
												await setFieldValue('country', event.target.value);
											}}
											value={values.country}

										/>
										<FormControl.Text>{errors.country}</FormControl.Text>
									</FormControl>

									<FormControl
										validation={
											values.city.length === 0
												? 'none'
												: errors.city
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Ciudad
										</FormControl.Label>
										<FormControl.Input
											type="text"
											placeholder={`Current city: ${currentHotelData?.city}`}
											onChange={async (event) => {
												await setFieldValue('city', event.target.value);
											}}
											value={values.city}

										/>
										<FormControl.Text>{errors.city}</FormControl.Text>
									</FormControl>
									<FormControl
										validation={
											values.photo.length === 0
												? 'none'
												: values.photo.length > 3
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">Fotos</FormControl.Label>
										<FormControl.Input
											type="file"
											placeholder="Foto"
											accept="image/*"
											onChange={(event) => {
												const files = event.target.files;
												if (files) {
													const promises: Promise<string>[] = [];
													const newPhotos: string[] = [...values.photo];
													for (let i = 0; i < files.length; i++) {
														const file = files[i];
														if (i + values.photo.length < 3) {
															promises.push(upload(file));
														} else {
															break;
														}
													}
													Promise.all(promises)
														.then((images) => {
															setFieldValue('photo', [...newPhotos, ...images]);
														})
														.catch((error) => {
															console.error(error);
														});
												}
											}}
											value=""
											multiple
										/>
										{values.photo.map((photo, index) => (
											<div key={index} className="flex items-center justify-between mt-2">
												<div className="w-10/12">
													<img
														src={photo}
														alt={`Imagen seleccionada ${index + 1}`}
														className="max-h-full max-w-full"
													/>
												</div>
												<button
													type="button"
													onClick={() => {
														const newPhotos = [...values.photo];
														newPhotos.splice(index, 1);
														setFieldValue('photo', newPhotos);
													}}
													className="text-xl font-semibold text-red-500 hover:text-red-700 hover:underline focus:outline-none"
												>
													Borrar
												</button>
											</div>
										))}
										{values.photo.length > 3 && (
											<FormControl.Text>Se permiten máximo 3 fotos.</FormControl.Text>
										)}
									</FormControl>
									<FormControl
										validation={
											values.category.length === 0
												? 'none'
												: errors.category
													? 'invalid'
													: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Categoria
										</FormControl.Label>
										<FormControl.Input
											type="number"
											min="1"
											max="5"
											placeholder={`Current category: ${currentHotelData?.hotelCategory}`}
											onChange={async (event) => {
												await setFieldValue('category', event.target.value);
											}}
											value={values.category}

										/>
										<FormControl.Text>{errors.category}</FormControl.Text>
									</FormControl>

									<FormControl
										validation={errors.services && !areServicesSelected ? 'invalid' : 'valid'}
										className="mb-4"
									>
										<FormControl.Label className="text-white">Servicios</FormControl.Label>
										<FormControl.Select
											placeholder="Seleccione un servicio"
											onChange={async (event) => {
												const selectedService = event.target.value;
												if (!values.services.includes(selectedService)) {
													await setFieldValue('services', [...values.services, selectedService]);
												}
											}}
											value={values.services}

										>
											<option value="">Seleccione un servicio</option>
											{arrayDePrueba.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</FormControl.Select>
										<FormControl.Text>{errors.services}</FormControl.Text>
									</FormControl>

									{values.services.length > 0 && (
										<div className="mb-4">
											<FormControl.Label className="text-white">Servicios seleccionados</FormControl.Label>
											<ul className="list-disc pl-8 text-white">
												{values.services.map((service, index) => (
													<li key={index}>{service}</li>
												))}
											</ul>
										</div>
									)}

									{values.services.length > 0 && (
										<div className="mb-4">
											<Button
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
												onClick={() => {
													const newServices = [...values.services];
													newServices.pop();
													setFieldValue('services', newServices);
												}}
											>
												Eliminar último servicio
											</Button>
										</div>
									)}

									<div className="flex items-center justify-center">
										<Button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
											type="submit"
											size="lg"
										>
											Actualizar
										</Button>
										<Button
											className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md ml-4"
											onClick={() => resetForm()}
											size="lg"
										>
											<ArrowCounterClockwise weight="bold" size={24} />
										</Button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	);
}
