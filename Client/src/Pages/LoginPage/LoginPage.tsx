import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

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
		<div>
			<div className="bg-orange-400 text-3xl ">Este es el login page</div>
			<div>
				<Link to="/home">Home</Link>
			</div>

			<div>
				<Formik<LoginValues>
					enableReinitialize
					initialValues={{
						email: '',
						password: '',
					}}
					onSubmit={handleSubmit}
					validationSchema={loginValidationSchema}
				>
					{({ values, errors, submitForm, setFieldValue }) => {
						return (
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
									<FormControl.Text>{errors.email}</FormControl.Text>
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
								<Button
									color="blue"
									type="submit"
									onClick={submitForm}
									disabled={errors.email || errors.password ? true : false}
								>
									login
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default LogingPage;
