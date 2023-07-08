import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
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
        .required('La fecha de nacimiento es requerida '),
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
        <div className="h-screen bg-white flex items-center justify-center ">
        <div className="bg-gray-800 p-8 rounded-md">
          <Formik
            initialValues={{
              name: '',
              surname: '',
              dob: '',
              phone: '',
              email: '',
              password: '',
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
                        setFieldValue('surname', event.target.value);
                      }}
                      value={values.surname}
                      className="bg-white rounded-md py-2 px-4"
                    />
                    <FormControl.Text className="text-red-500">
                      {errors.surname}
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
                        setFieldValue('dob', event.target.value);
                      }}
                      value={values.dob}
                      className="bg-white rounded-md py-2 px-4"
                    />
                    <FormControl.Text className="text-red-500">
                      {errors.dob}
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
                        setFieldValue('phone', event.target.value);
                      }}
                      value={values.phone}
                      className="bg-white rounded-md py-2 px-4"
                    />
                    <FormControl.Text className="text-red-500">
                      {errors.phone}
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