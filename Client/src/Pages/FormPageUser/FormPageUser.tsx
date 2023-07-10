import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import * as yup from 'yup';

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
  const handleSubmit = useCallback(
    async (values: UserCreateValues, helpers: FormikHelpers<UserCreateValues>) => {
      console.log('values', values);

      helpers.setSubmitting(false);
    },
    []
  );
  return (
    <div className="h-screen bg-slate-600 flex items-center justify-center ">
      <div className="bg-gray-800 p-8 rounded-md">
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
            <Form className="space-y-4">
              <div className="flex flex-col">
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

              <div className="flex flex-col">
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

              <div className="flex flex-col">
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

              <div className="flex flex-col">
                <FormControl>
                  <FormControl.Label className="text-white">
                    Fono de contacto
                  </FormControl.Label>
                  <FormControl.Input
                    type="text"
                    placeholder="Fono de contacto"
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

              <div className="flex flex-col">
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

              <div className="flex flex-col">
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



              <div className="flex flex-col">
                <FormControl>
                  <FormControl.Label className="text-white">
                    Quiero publicar mi hotel
                  </FormControl.Label>
                  <FormControl.Input
                    type="checkbox"
                    onChange={(event) => {
                      setFieldValue('admin', event.target.checked);
                    }}
                    value={values.admin}
                    className="bg-white rounded-md py-2 px-4"
                  />
                  <FormControl.Text className="text-red-500">
                    {errors.admin}
                  </FormControl.Text>
                </FormControl>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  color="blue"
                  type="submit"
                  onClick={submitForm}
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
  );

}

export default FormPageUser;