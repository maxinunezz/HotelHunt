import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

interface UserCreateValues {
    name: string;
    surname: string;
    dob: string;
    phone: string;
    email: string;
    password: string;
}

const signValidationSchema = yup.object().shape({
    name: yup.string().trim().required('El nombre es requerido'),
    surname: yup.string().trim().required('El apellido es requerido'),
    dob: yup
        .string()
        .trim()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'El formato de fecha debe ser "yyyy-mm-dd"')
        .required('La fecha de nacimiento es requerida en el formato "yyyy-mm-dd"'),
    phone: yup.string().trim().required('El teléfono es requerido'),
    email: yup
        .string()
        .trim()
        .email('El texto ingresado tiene que ser un email')
        .required('El email es requerido')
        .matches(/.com|.net|.org|.gov|.edu|.mil|.int|.io|.co|.us|.uk|.de|.fr|.ca|.au|.jp|.cn|.ru|.br|.it|.cl|.ar/, 'El email debe contener ".com"'),
    password: yup
        .string()
        .required('Por favor, proporciona una contraseña válida')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/\d/, 'La contraseña debe contener al menos un número')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'), 
});

const FormPageUser = () => {
    const [isCreated, setIsCreated] = useState(false);

    const handleSubmit = useCallback(
        async (values: UserCreateValues, helpers: FormikHelpers<UserCreateValues>) => {
            try {
                const data = await axios.post('http://localhost:3001/user/signup', {
                    name: values.name,
                    surname: values.surname,
                    dob: values.dob,
                    phone: values.phone,
                    email: values.email,
                    password: values.password,
                });
                setIsCreated(true);
                console.log('data', data);
            } catch (error) {
                console.log(error);

            }
            helpers.setSubmitting(false);
        },
        [setIsCreated]
    );
    return (
        <div className="w-[90%] bg-emerald-600 h-[90%]">
            {isCreated && (
                <p className="text-green-500">El formulario se creó con éxito.</p>
            )}
            <Formik<UserCreateValues>
                enableReinitialize
                initialValues={{
                    name: '',
                    surname: '',
                    dob: '',
                    phone: '',
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={signValidationSchema}
            >
                {({ values, errors, setFieldValue }) => (
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
                                values.surname.length === 0
                                    ? 'none'
                                    : errors.surname
                                        ? 'invalid'
                                        : 'valid'
                            }
                            className="mb-4"
                        >
                            <FormControl.Label className="text-white">
                                Apellido
                            </FormControl.Label>
                            <FormControl.Input
                                placeholder="Apellido"
                                onChange={async (event) => {
                                    await setFieldValue('surname', event.target.value);
                                }}
                                value={values.surname}
                                className="mb-40"
                                required
                            />
                            <FormControl.Text>{errors.surname}</FormControl.Text>
                        </FormControl>

                        <FormControl
                            validation={
                                values.dob.length === 0
                                    ? 'none'
                                    : errors.dob
                                        ? 'invalid'
                                        : 'valid'
                            }
                            className="mb-4"
                        >
                            <FormControl.Label className="text-white">
                                Fecha de nacimiento
                            </FormControl.Label>
                            <FormControl.Input
                                type="date"
                                placeholder="Fecha de nacimiento"
                                onChange={async (event) => {
                                    await setFieldValue('dob', event.target.value);
                                }}
                                value={values.dob}
                                required
                            />
                            <FormControl.Text>{errors.dob}</FormControl.Text>
                        </FormControl>


                        <FormControl
                            validation={
                                values.phone.length === 0
                                    ? 'none'
                                    : errors.phone
                                        ? 'invalid'
                                        : 'valid'
                            }
                            className="mb-4"
                        >
                            <FormControl.Label className="text-white">
                                Telefono
                            </FormControl.Label>
                            <FormControl.Input
                                type="text"
                                placeholder="Telefono"
                                onChange={async (event) => {
                                    await setFieldValue('phone', event.target.value);
                                }}
                                value={values.phone}
                                required
                            />
                            <FormControl.Text>{errors.phone}</FormControl.Text>
                        </FormControl>


                        <FormControl
                            validation={
                                values.email.length === 0
                                    ? 'none'
                                    : errors.email
                                        ? 'invalid'
                                        : 'valid'
                            }
                            className="mb-4"
                        >
                            <FormControl.Label className="text-white">
                                Email
                            </FormControl.Label>
                            <FormControl.Input
                                type="text"
                                placeholder="Email"
                                onChange={async (event) => {
                                    await setFieldValue('email', event.target.value);
                                }}
                                value={values.email}
                                required
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
                            className="mb-4"
                        >
                            <FormControl.Label className="text-white">
                                Password
                            </FormControl.Label>
                            <FormControl.Input
                                type="password"
                                placeholder="Password"
                                onChange={async (event) => {
                                    await setFieldValue('password', event.target.value);
                                }}
                                value={values.password}
                                required
                            />
                            <FormControl.Text>{errors.password}</FormControl.Text>
                        </FormControl>

                        <div className="flex items-center justify-center">
                            <Button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
                                type="submit"
                                size="lg"
                            >
                                Registrar
                            </Button>

                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
};
{/* <Formik
                initialValues={
                    {
                        name: "",
                        surname: "",
                        dob: "",
                        phone: "",
                        email: "",
                        password: ""
                    }}
                onSubmit={handleSubmit}
                validationSchema={loginValidationSchema}
            >
                {({ values, errors, submitForm, setFieldValue }) => {
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
                            >
                                <FormControl.Label>Nombre</FormControl.Label>
                                <FormControl.Input
                                    type="name"
                                    placeholder="nombre"
                                    onChange={async (event) => {
                                        await setFieldValue('name', event.target.value);
                                    }}
                                    value={values.name}
                                />
                                <FormControl.Text>{errors.name}</FormControl.Text>
                            </FormControl>

                            <FormControl.Label>Apellido</FormControl.Label>
                            <FormControl.Input
                                type="surname"
                                placeholder='apellido'
                                onChange={async (event) => {
                                    await setFieldValue('surname', event.target.value);
                                }}
                                value={values.surname}
                            />
                            <FormControl.Text>{errors.surname}</FormControl.Text>

                            <FormControl.Label>Fecha de nacimiento</FormControl.Label>
                            <FormControl.Input
                                type="dob"
                                placeholder='Fecha de nacimiento'
                                onChange={async (event) => {
                                    await setFieldValue('dob', event.target.value);
                                }}
                                value={values.dob}
                            />
                            <FormControl.Text>{errors.dob}</FormControl.Text>

                            <FormControl.Label>Fono de contacto</FormControl.Label>
                            <FormControl.Input
                                type="phone"
                                placeholder='Fono de contacto'
                                onChange={async (event) => {
                                    await setFieldValue('phone', event.target.value);
                                }}
                                value={values.phone}
                            />
                            <FormControl.Text>{errors.phone}</FormControl.Text>

                            <FormControl.Label>Email</FormControl.Label>
                            <FormControl.Input
                                type="email"
                                placeholder='Email'
                                onChange={async (event) => {
                                    await setFieldValue('email', event.target.value);
                                }}
                                value={values.email}
                            />
                            <FormControl.Text>{errors.email}</FormControl.Text>

                            <FormControl.Label>Email</FormControl.Label>
                            <FormControl.Input
                                type="password"
                                placeholder='password'
                                onChange={async (event) => {
                                    await setFieldValue('password', event.target.value);
                                }}
                                value={values.password}
                            />
                            <FormControl.Text>{errors.password}</FormControl.Text>

                            <Button
                                color="blue"
                                type="submit"
                                onClick={submitForm}
                                disabled={errors.name || errors.surname || errors.dob || errors.phone || errors.email || errors.password ? true : false}
                            >
                                login
                            </Button>
                        </Form>
                    );
                }}

            </Formik> */}


export default FormPageUser;