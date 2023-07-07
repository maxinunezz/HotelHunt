import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

interface UserCreateValues {
    name: string;
    surname: string;
    dob: string;
    phone: string;
    email: string;
    password: string;
}

const loginValidationSchema = yup.object().shape({
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
        .required('El email es requerido'),
    password: yup.string().trim().required('La contraseña es requerida'),
});

const FormPageUser = () => {
    const handleSubmit = useCallback(
        async (values: UserCreateValues, helpers: FormikHelpers<UserCreateValues>) => {
            console.log('values', values);

            helpers.setSubmitting(false);
        },
        []
    );
    return (
        <div className="w-[90%] bg-emerald-600 h-[90%]">
            <Formik
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

            </Formik>
        </div >
    )
}

export default FormPageUser;