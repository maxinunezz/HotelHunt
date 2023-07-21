import { Button, FormControl } from '@rewind-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { errorToast, successToast } from '../../components/toast';
import axios from 'axios';


interface PasswordRecoveryValues {
  email: string;
}

const passwordRecoveryValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('El texto ingresado tiene que ser un email válido')
    .required('El email es requerido'),
});

const RecuPassword = () => {
  const url = import.meta.env.VITE_URL
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: PasswordRecoveryValues, helpers: FormikHelpers<PasswordRecoveryValues>) => {
      try {
        const response = await axios.get(`${url}/user/askpass/${values.email}`)
       

        successToast(response.data);
        navigate('/login'); // redirigir a la página de inicio de sesión después de enviar el correo.
      } catch (error) {
        errorToast(error.response.data);
      }

      helpers.setSubmitting(false);
    },
    []
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="w-[35%] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-gray-800 text-2xl font-bold mb-4">Recuperar Contraseña</h1>
        <Formik
          enableReinitialize
          initialValues={{
            email: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={passwordRecoveryValidationSchema}
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
                  placeholder="Email"
                  onChange={async (event) => {
                    await setFieldValue('email', event.target.value);
                  }}
                  value={values.email}
                />
                <FormControl.Text className="text-red-500">
                  {errors.email}
                </FormControl.Text>
              </FormControl>
              <div className="mt-4 flex items-center justify-center">
                <Button
                  color="blue"
                  onClick={submitForm}
                  disabled={errors.email ? true : false}
                >
                  Enviar correo de recuperación
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RecuPassword;
