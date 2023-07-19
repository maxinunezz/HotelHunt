import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';




interface UserCreateValues {
  name: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  admin: boolean;
}

const loginValidationSchema = yup.object().shape({
  name: yup.string().trim().required('El nombre es requerido'),
  lastName: yup.string().trim().required('El apellido es requerido'),
  birthDate: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'El formato de fecha debe ser "yyyy-mm-dd"')
    .required('La fecha de nacimiento es requerida '),
  phoneNumber: yup.string().trim().required('El teléfono es requerido'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar tu contraseña')
});

const FormPageUser = () => {
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate()
  const url = import.meta.env.VITE_URL;

  console.log(import.meta.env.VITE_URL);


  const handleSubmit = useCallback(
    async (values: UserCreateValues, helpers: FormikHelpers<UserCreateValues>) => {
      try {

        const data = await axios.post(
          `${url}/user/signup`,
          {
            name: values.name,
            lastName: values.lastName,
            birthDate: values.birthDate,
            phoneNumber: values.phoneNumber,
            admin: values.admin,
            email: values.email,
            password: values.password,
          }
        );
        setIsCreated(true);
        successToast('Correo de confirmación enviado. Revisa tu email para continuar.');
        console.log('data', data);
        navigate(-1)
      } catch (error) {

        errorToast(error.response.data);
      }

      helpers.setSubmitting(false);
    },
    [setIsCreated]
  );

  return (
    <div className="bg-blue-500 flex items-center h-screen justify-center">
      <div className="flex w-full justify-center">
        <div className="bg-white w-[600px] rounded-md p-8">
          <h1 className="text-5xl text-center text-gray-800 font-bold mt-10">
            Bienvenido al registro de
            <br />
            <span className="text-5xl text-blue-500 font-extrabold tracking-wider">
              HOTELHUNT
            </span>
          </h1>
          <p className="text-lg text-center text-gray-600 mt-10 font-bold">
            Descubre una experiencia única en el mundo de los viajes.
            Regístrate en HOTELHUNT y disfruta de las siguientes ventajas:
          </p>
          <ul className="text-lg text-gray-600 mt-10 list-disc list-inside">
            <li className="mb-2">Acceso exclusivo a ofertas y descuentos especiales.✨</li>
            <li className="mb-2">Posibilidad de publicar y gestionar tu propio hotel.✨</li>
            <li className="mb-2">Reservas sencillas y rápidas.✨</li>
            <li className="mb-2">Recomendaciones personalizadas según tus preferencias.✨</li>
            <li className="mb-2">Soporte y atención al cliente dedicados.✨</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-8 rounded-md w-[500px]">
          <Formik
            initialValues={{
              name: '',
              lastName: '',
              birthDate: '',
              phoneNumber: '',
              email: '',
              password: '',
              confirmPassword: '',
              admin: false
            }}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          >
            {({ values, errors, submitForm, setFieldValue }) => (
              <Form className="space-y-4 h-[530px]">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <FormControl
                      validation={
                        values.name.length === 0
                          ? 'none'
                          : errors.name
                            ? 'invalid'
                            : 'valid'
                      }
                    >
                      <FormControl.Label className="text-white">Nombre</FormControl.Label>
                      <FormControl.Input
                        type="text"
                        placeholder="Nombre"
                        onChange={(event) => {
                          setFieldValue('name', event.target.value);
                        }}
                        value={values.name}
                        className="bg-white rounded-md py-2 px-4"
                      />
                      <FormControl.Text className="text-red-500">
                        {errors.name}
                      </FormControl.Text>
                    </FormControl>
                  </div>

                  <div className="w-1/2">
                    <FormControl>
                      <FormControl.Label className="text-white">
                        Apellido
                      </FormControl.Label>
                      <FormControl.Input
                        type="text"
                        placeholder="Apellido"
                        onChange={(event) => {
                          setFieldValue('lastName', event.target.value);
                        }}
                        value={values.lastName}
                        className="bg-white rounded-md py-2 px-4"
                      />
                      <FormControl.Text className="text-red-500">
                        {errors.lastName}
                      </FormControl.Text>
                    </FormControl>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <FormControl>
                      <FormControl.Label className="text-white">
                        Fecha de nacimiento
                      </FormControl.Label>
                      <FormControl.Input
                        type="date"
                        placeholder="Fecha de nacimiento"
                        onChange={(event) => {
                          setFieldValue('birthDate', event.target.value);
                        }}
                        value={values.birthDate}
                        className="bg-white rounded-md py-2 px-4"
                      />
                      <FormControl.Text className="text-red-500">
                        {errors.birthDate}
                      </FormControl.Text>
                    </FormControl>
                  </div>

                  <div className="w-1/2">
                    <FormControl>
                      <FormControl.Label className="text-white">
                        Telefono de contacto
                      </FormControl.Label>
                      <FormControl.Input
                        type="text"
                        placeholder="Telefono de contacto"
                        onChange={(event) => {
                          setFieldValue('phoneNumber', event.target.value);
                        }}
                        value={values.phoneNumber}
                        className="bg-white rounded-md py-2 px-4"
                      />
                      <FormControl.Text className="text-red-500">
                        {errors.phoneNumber}
                      </FormControl.Text>
                    </FormControl>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <FormControl>
                      <FormControl.Label className="text-white">Email</FormControl.Label>
                      <FormControl.Input
                        type="email"
                        placeholder="Email"
                        onChange={(event) => {
                          setFieldValue('email', event.target.value);
                        }}
                        value={values.email}
                        className="bg-white rounded-md py-2 px-4"
                      />
                      <FormControl.Text className="text-red-500">
                        {errors.email}
                      </FormControl.Text>
                    </FormControl>
                  </div>

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

                <div className="flex justify-center">
                  <FormControl.Label className="text-white items-center">
                    Quiero publicar mi hotel
                  </FormControl.Label>
                  <div className="flex items-center ml-2">
                    <FormControl.Input
                      type="checkbox"
                      onChange={(event) => {
                        setFieldValue('admin', event.target.checked);
                      }}
                      value={values.admin}
                      className="form-checkbox w-6 h-6 text-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    color="blue"
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Registrarse
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

export default FormPageUser;