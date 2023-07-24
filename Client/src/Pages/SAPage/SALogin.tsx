import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useCallback } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import { tokenStore } from '../../Store';
import { useState } from 'react';



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


export default function SALogin() {
    const [showPassword, setShowPassword] = useState(false);
    const { saveInfo } = tokenStore();
    const URL = import.meta.env.VITE_URL;

    const handleSubmit = useCallback(
        async (values: LoginValues, helpers: FormikHelpers<LoginValues>) => {
            try {
                console.log('values', values);
                const arrayAux: [] = [];
                return await axios.post(`${URL}/user/auth`, values).then((response) => {
                    if (response.data) {
                        const tokenRaw = response.data.token
                        const statusadmin = response.data.admin
                        const logeado = true
                        const userData = response.data.data
                        arrayAux.push(userData)
                        arrayAux.push(tokenRaw)
                        arrayAux.push(statusadmin)
                        arrayAux.push(logeado)
                        saveInfo(arrayAux)
                    }
                    successToast('Usuario logeado correctamente');

                }
                )

            } catch (error) {
                errorToast(error.response.data);
                console.log(error);

            }

            helpers.setSubmitting(false);
        },
        [saveInfo]
    );



    return (
        <div>
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
                            <FormControl.Label>Contraseña</FormControl.Label>
                            <div className="relative">
                                <FormControl.Input
                                    type={showPassword ? 'text' : 'password'} // Mostrar contraseña o no según el estado
                                    placeholder="Contraseña"
                                    onChange={async (event) => {
                                        await setFieldValue('password', event.target.value);
                                    }}
                                    value={values.password}
                                />
                                <div
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword((prevState) => !prevState)} // Alternar el estado para mostrar/ocultar contraseña
                                >

                                    {showPassword ? (
                                        <Eye size={24} color="#1d6bb4" />
                                    ) : (
                                        <EyeClosed size={24} color="#1d6bb4" />
                                    )}
                                </div>
                            </div>
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


    )
}