
import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import gif from './gif.gif'

interface LoginValues {
	email: string;
	password: string;
}

const loginValidationSchema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email('El texto ingresado tiene que ser un email')
		.required('El email es requerido'),
	password: yup.string().trim().required('La contraseña es requerida'),
});

const LogingPage = () => {
	const handleSubmit = useCallback(
		async (values: LoginValues, helpers: FormikHelpers<LoginValues>) => {
			console.log('values', values);

			helpers.setSubmitting(false);
		},
		[]
	);

	return (
		<div className="flex h-screen">
			<div className="bg-white w-[65%] flex flex-col items-center justify-center">
				<img src={gif} alt="GIF" className="mt-8 max-w-[600px]" />
				<div className="text-blue-500 text-3xl font-bold mt-8">HOTELHUNT</div>
				<div className="text-blue-500 text-lg">Ingresa tus credenciales para iniciar sesión</div>
			</div>

			<div className="bg-gray-800 w-[35%] flex flex-col items-center justify-center">
				<h1 className="text-white text-2xl font-bold mb-4">✨Bienvenido✨</h1>
				<div className="w-10/12 bg-gray-800 p-8 rounded-md">
					<Formik
						enableReinitialize
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={handleSubmit}
						validationSchema={loginValidationSchema}
					>
						{({ values, errors, submitForm, setFieldValue }) => (
							<Form>
								<FormControl
									validation={
										values.email.length === 0
											? 'none'
											: errors.email
												? 'invalid'
												: 'valid'
									}
								>
									<FormControl.Label>Email</FormControl.Label>
									<FormControl.Input
										type="email"
										placeholder="email"
										onChange={async (event) => {
											await setFieldValue('email', event.target.value);
										}}
										value={values.email}
									/>
									<FormControl.Text className="text-red-500">{errors.email}</FormControl.Text>
								</FormControl>
								<FormControl
									validation={
										values.password.length === 0
											? 'none'
											: errors.password
												? 'invalid'
												: 'valid'
									}
								>
									<FormControl.Label>Contrasena</FormControl.Label>
									<FormControl.Input
										type="password"
										placeholder="Contraseña"
										onChange={async (event) => {
											await setFieldValue('password', event.target.value);
										}}
										value={values.password}
									/>
									<FormControl.Text className="text-red-500">
										{errors.password}
									</FormControl.Text>
								</FormControl>
								<div className="mt-4 flex items-center justify-center">
									<Button
										color="blue"
										type="submit"
										onClick={submitForm}
										disabled={errors.email || errors.password ? true : false}
									>
										login
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>

				<div className="bg-slate-400 flex m-10 p-5 space-x-1 rounded-md ">
					<h1 className="text-white ">No tienes cuenta? Registrate</h1>
					<Link to="/usercreate">
						<button className="mr-2">aquí</button>
					</Link>
				</div>
			</div>
		</div>
	);



};
export default LogingPage;

