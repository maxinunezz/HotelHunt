import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import BackButton from '../../components/BackButton/BackButton';
// import { AiOutlineReload } from 'react-icons/ai';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';

interface FormValues {
	name: string;
	description: string;
	country: string;
	city: string;
	photo: string;
	floorNumber: string;
}

const formValidationSchema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.min(2, 'Minimo 2 caracteres')
		.required('El nombre es requerido'),
	description: yup
		.string()
		.trim()
		.min(10, 'Minimo 10 caracteres')
		.required('La descripcion es requerida'),
	country: yup.string().trim().required('El pais es requerido'),
	city: yup.string().trim().required('La ciudad es requerida'),
	photo: yup.string().trim().required('La foto es requerida'),
	floorNumber: yup
		.string()
		.matches(/^[0-9]+$/, 'Solo se admiten numeros')
		.max(2, 'Maximo 2 digitos'),
});

export default function FormPageH() {
	const [isCreated, setIsCreated] = useState(false);

	const handleSubmit = useCallback(
		async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
			try {
				const data = await axios.post('http://localhost:3001/hotel', {
					name: values.name,
					description: values.description,
					country: values.country,
					city: values.city,
					photo: values.photo,
					floorNumber: values.floorNumber,
				});
				setIsCreated(true);
				successToast('Hotel creado correctamente');
				console.log('data', data);
			} catch (error) {
				errorToast('Hubo un error, intenta de nuevo');
			}
			helpers.setSubmitting(false);
		},
		[setIsCreated]
	);

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
					<Formik<FormValues>
						enableReinitialize
						initialValues={{
							name: '',
							description: '',
							country: '',
							city: '',
							photo: '',
							floorNumber: '',
						}}
						onSubmit={handleSubmit}
						validationSchema={formValidationSchema}
					>
						{({ values, errors, setFieldValue, resetForm }) => {
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
											placeholder="Nombre"
											onChange={async (event) => {
												await setFieldValue('name', event.target.value);
											}}
											value={values.name}
											required
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
											placeholder="Descripcion"
											onChange={async (event) => {
												await setFieldValue('description', event.target.value);
											}}
											value={values.description}
											className="h-40"
											required
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
											placeholder="Pais"
											onChange={async (event) => {
												await setFieldValue('country', event.target.value);
											}}
											value={values.country}
											required
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
											placeholder="Ciudad"
											onChange={async (event) => {
												await setFieldValue('city', event.target.value);
											}}
											value={values.city}
											required
										/>
										<FormControl.Text>{errors.city}</FormControl.Text>
									</FormControl>
									{values.photo ? (
										<div className="flex items-center justify-between mb-4">
											<div className="w-10/12">
												<img
													src={values.photo}
													alt="Imagen seleccionada"
													className="max-h-full max-w-full"
												/>
											</div>
											<button
												type="button"
												onClick={async () => {
													await setFieldValue('photo', '');
												}}
												className="text-xl font-semibold text-red-500 hover:text-red-700 hover:underline focus:outline-none"
											>
												Borrar
											</button>
										</div>
									) : (
										<FormControl
											validation={
												values.photo.length === 0
													? 'none'
													: errors.photo
													? 'invalid'
													: 'valid'
											}
											className="mb-4"
										>
											<FormControl.Label className="text-white">
												Foto
											</FormControl.Label>
											<FormControl.Input
												type="file"
												placeholder="Foto"
												accept="image/*"
												onChange={async (event) => {
													const file = event.target.files?.[0];
													if (file) {
														const reader = new FileReader();

														reader.onload = async (
															e: ProgressEvent<FileReader>
														) => {
															await setFieldValue(
																'photo',
																e.target?.result as string
															);
														};

														reader.readAsDataURL(file);
													}
												}}
												value={values.photo}
												required
											/>
											<FormControl.Text>{errors.photo}</FormControl.Text>
										</FormControl>
									)}
									<FormControl
										validation={
											values.floorNumber.length === 0
												? 'none'
												: errors.floorNumber
												? 'invalid'
												: 'valid'
										}
										className="mb-4"
									>
										<FormControl.Label className="text-white">
											Piso
										</FormControl.Label>
										<FormControl.Input
											type="number"
											placeholder="Piso"
											onChange={async (event) => {
												await setFieldValue('floorNumber', event.target.value);
											}}
											value={values.floorNumber}
											required
										/>
										<FormControl.Text>{errors.floorNumber}</FormControl.Text>
									</FormControl>
									<div className="flex items-center justify-center">
										<Button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
											type="submit"
											size="lg"
										>
											Registrar
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
