import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useCallback } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import { tokenStore } from '../../Store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_URL;

    const handleSubmit = useCallback(
        async (values: LoginValues, helpers: FormikHelpers<LoginValues>) => {
            try {
                console.log('values', values);
                const arrayAux: any = [];
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
                    navigate('/SAP')

                }
                )

            } catch (error: any) {
                errorToast(error.response.data);
                console.log(error);

            }

            helpers.setSubmitting(false);
        },
        [saveInfo]
    );



    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
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
              <Form className="bg-white shadow-md rounded-md p-6 w-[400px] h-[380px]">
                <h2 className="text-3xl font-bold text-blue-500 mb-6">
                  ¡Bienvenido al panel de administración!
                </h2>
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
                    className="border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <FormControl.Text className="text-red-500">
                    {errors.email}
                  </FormControl.Text>
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
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Contraseña"
                      onChange={async (event) => {
                        await setFieldValue('password', event.target.value);
                      }}
                      value={values.password}
                      className="border px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword((prevState) => !prevState)}
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
                    disabled={errors.email || errors.password}
                    className={`px-4 py-2 rounded-md ${
                      errors.email || errors.password
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Ingresar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      );
      

}