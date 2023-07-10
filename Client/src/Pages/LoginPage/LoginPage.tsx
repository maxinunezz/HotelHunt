import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import gif from './gif.gif'
import { tokenStore } from '../../Store';
import { errorToast, successToast } from '../../components/toast';
import axios from 'axios';

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
	const navigate = useNavigate()
	const userInfoState = tokenStore((state) => state.userState)

	const { saveInfo } = tokenStore();
	const handleSubmit = useCallback(
		async (values: LoginValues, helpers: FormikHelpers<LoginValues>) => {
			try {
				console.log('values', values);
				const arrayAux: [] = [];
				return await axios.post('http://localhost:3001/user/auth', values).then((response) => {
					if (response.data) {
						const tokenRaw = response.data.token
						const statusadmin = response.data.admin
						const logeado = true
						arrayAux.push(tokenRaw)
						arrayAux.push(statusadmin)
						arrayAux.push(logeado)
						saveInfo(arrayAux)
					}
					console.log("values",values);
					
					successToast('Usuario logeado correctamente');
					navigate('/')
				}
				)

			} catch (error) {
				errorToast('Hubo un error, intenta de nuevo');
				console.log(error);

			}

			helpers.setSubmitting(false);
		},
		[saveInfo]
	);



	return (
		<div className="flex h-screen">
			<div className="bg-white w-[65%] flex flex-col items-center justify-center">
				<img src={gif} alt="GIF" className="mt-8 max-w-[600px]" />
				<div className="text-blue-500 text-3xl font-bold mt-8">HOTELHUNT</div>
				{
					userInfoState.length === 0 ?
						<div className="bg-green-700 flex m-10 p-5 space-x-1 rounded-md ">
							<h1 className="text-white ">Ingresa como </h1>
							
								<button onClick={() => navigate('/')} className="mr-2">invitado</button>
							
						</div>
						:
						<div className="bg-green-700 flex m-10 p-5 space-x-1 rounded-md ">
							<h1 className="text-white ">Ingresa al </h1>

							<button onClick={() => navigate('/')} className="mr-2">home</button>

						</div>
				}
			</div>
			{
				userInfoState.length === 0 ? (<div className="bg-gray-800 w-[35%] flex flex-col items-center justify-center">
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
						
							<button onClick={()=>navigate('/usercreate')} className="mr-2">aquí</button>
						
					</div>

				</div>)
					:
					(<div className="bg-gray-800 w-[35%] flex flex-col items-center justify-center">Test</div>)

			}


		</div>
	);



};
export default LogingPage;
