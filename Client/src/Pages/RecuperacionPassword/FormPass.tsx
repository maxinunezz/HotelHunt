import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';




interface passCreateValues {
    password: string;
    confirmPassword: string;
}

const loginValidationSchema = yup.object().shape({
    password: yup
        .string()
        .required('Por favor, proporciona una contraseña válida')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/\d/, 'La contraseña debe contener al menos un número')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Debes confirmar tu contraseña')
});

const FormPagePass = () => {
    const navigate = useNavigate()
    const url = import.meta.env.VITE_URL;
    const [cookies] = useCookies(["token"]);
    const Token = cookies.token && cookies.token.token;
    console.log(Token);



    const handleSubmit = useCallback(
        async (values: passCreateValues, helpers: FormikHelpers<passCreateValues>) => {
            try {

                const response = await axios.post(
                    `${url}/user/updatePass`,
                    {
                        password: values.password,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${Token}`,
                        },
                    }
                );
                successToast(response.data);
                navigate(-1)
            } catch (error) {

                errorToast(error.response.data);
            }

            helpers.setSubmitting(false);
        },
        []
    );

    return (
        <div className="bg-blue-500 flex items-center h-screen justify-center">
            <div className="flex w-full justify-center">
                <div className="bg-white w-[600px] rounded-md p-8">
                    <h1 className="text-5xl text-center text-gray-800 font-bold mt-10">
                        Recupera tu contraseña de
                        <br />
                        <span className="text-5xl text-blue-500 font-extrabold tracking-wider">
                            HOTELHUNT
                        </span>
                    </h1>
                </div>
                <div className="bg-gray-800 p-8 rounded-md w-[500px]">
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={loginValidationSchema}
                    >
                        {({ values, errors, submitForm, setFieldValue }) => (
                            <Form className="space-y-4 h-[530px]">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <FormControl>
                                            <FormControl.Label className="text-white">
                                                Contraseña
                                            </FormControl.Label>
                                            <FormControl.Input
                                                type="password"
                                                placeholder="Contraseña"
                                                onChange={(event) => {
                                                    setFieldValue('password', event.target.value);
                                                }}
                                                value={values.password}
                                                className="bg-white rounded-md py-2 px-4"
                                            />
                                            <FormControl.Text className="text-red-500">
                                                {errors.password}
                                            </FormControl.Text>
                                        </FormControl>
                                        <FormControl.Label className="text-white">
                                            Confirmar contraseña
                                        </FormControl.Label>
                                        <FormControl.Input
                                            type="password"
                                            placeholder="Confirmar contraseña"
                                            onChange={(event) => {
                                                setFieldValue('confirmPassword', event.target.value);
                                            }}
                                            value={values.confirmPassword}
                                            className="bg-white rounded-md py-2 px-4"
                                        />
                                        <FormControl.Text className="text-red-500">
                                            {errors.confirmPassword}
                                        </FormControl.Text>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button
                                        color="blue"
                                        type="submit"
                                        disabled={Object.keys(errors).length > 0}
                                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Establecer nueva contraseña.
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );




}

export default FormPagePass;