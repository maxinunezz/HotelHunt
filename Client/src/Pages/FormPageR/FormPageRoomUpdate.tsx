import { Button, FormControl } from '@rewind-ui/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import BackButton from '../../components/BackButton/BackButton';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';
import { roomsStore, tokenStore } from '../../Store';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesRoom } from '../../utils/servicesArray';
const url = import.meta.env.VITE_URL;

interface FormValues {
    roomName: string;
    floorNumber: string;
    description: string;
    capacity: string;
    services: string[];
    price: string;
    photo: string[];
    disabled: boolean;
}

const formValidationSchema = yup.object().shape({
    roomName: yup.string().trim().min(2, 'Minimo 2 caracteres'),
    floorNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Solo se admiten números')
        .max(2, 'Máximo 2 dígitos'),
    description: yup.string()
        .trim()
        .min(10, 'Minimo 10 caracteres'),
    capacity: yup
        .string()
        .matches(/^[0-9]+$/, 'Solo se admiten números')
        .max(1, 'Máximo 1 dígito'),
    services: yup.array().min(1, 'Seleccione al menos un servicio'),
    price: yup
        .number()
        .typeError('El precio debe ser un número')
        .min(1, 'El precio debe ser mayor o igual a 1')
        .max(1500, 'El precio debe ser menor o igual a 1500')
});

export default function FormPageRoomUpdate() {
    const { id } = useParams()
    const navigate = useNavigate();
    const hotelsUser = tokenStore((state) => state.hotelsUserById);
    const [isCreated, setIsCreated] = useState(false);
    const token = tokenStore((state) => state.userState);
    const { fetchRoomsDashboard } = roomsStore()
    const allRoomsHotel = roomsStore((state) => state.allRoomsDashboard)
    const currentRoomData = allRoomsHotel.find((room) => room.id === id)

    useEffect(() => {
        fetchRoomsDashboard(String(hotelsUser[0].id), token[1])
    }, [])

    const handleSubmit = useCallback(
        async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
            try {
                console.log('Submitting form data:', values);
                console.log(token[0]);

                const nameToBack = values.roomName !== '' ? values.roomName : currentRoomData?.name
                const floorNumberToBack = values.floorNumber ? values.floorNumber : currentRoomData?.floorNumber
                const descriptionToBack = values.description ? values.description : currentRoomData?.description
                const paxToBack = values.capacity ? values.capacity : currentRoomData?.pax
                const servicesToBack = values.services ? values.services : currentRoomData?.services
                const priceToBack = values.price ? values.price : currentRoomData?.price
                const photoToBack = values.photo ? values.photo : currentRoomData?.photo

                const data = await axios.put(
                    `${url}/dashboard/room/${id}`,
                    {
                        name: nameToBack,
                        floorNumber: floorNumberToBack,
                        description: descriptionToBack,
                        pax: paxToBack,
                        services: servicesToBack,
                        price: priceToBack,
                        photo: photoToBack,
                        disabled: values.disabled
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token[1]}`,
                        },
                    }
                );

                console.log('Response data:', data);

                helpers.resetForm();
                setIsCreated(true);
                successToast('Habitación creada correctamente');
                // navigate(-1);
            } catch (error) {
                console.error('Error submitting form:', error);
                errorToast('Hubo un error, intenta de nuevo');
            }
            helpers.setSubmitting(false);
        },
        [setIsCreated, token]
    );


    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function, values: FormValues) => {
            const files = event.target.files;
            if (files) {
                const promises: Promise<string>[] = [];
                const newPhotos: string[] = [...values.photo];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (i + values.photo.length < 3) {
                        promises.push(upload(file));
                    } else {
                        break;
                    }
                }
                Promise.all(promises)
                    .then((images) => {
                        setFieldValue('photo', [...newPhotos, ...images]);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        []
    );

    const CLOUD_NAME = 'hotelmatimaxi4342';
    const UPLOAD_PRESET = 'hotel_pf';

    const upload = async (file: string | Blob) => {
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('upload_preset', UPLOAD_PRESET);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
            method: 'POST',
            body: formdata,
        });
        const data = await response.json();
        return data.secure_url;
    };

    return (
        <div className="flex h-screen">
            <div className="w-full bg-blue-500 flex flex-col justify-center items-center py-8">
                <h2 className="text-3xl text-white font-bold">Bienvenido a nuestro Hotel</h2>
                <p className="text-lg text-white">¡Crea nuevas habitaciones para tus huéspedes!</p>
            </div>

            <div className="w-full bg-gray-800 shadow-lg p-8 overflow-y-auto">
                <div className="max-h-full">
                    <div className="flex justify-start">
                        <BackButton />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">✨UPDATE DE HABITACIONES✨</h2>
                    {isCreated && <p className="text-green-500">El formulario se creó con éxito.</p>}
                    <p className="text-xl text-white font-bold px-8 text-center">New room for hotel: {hotelsUser[0].name}</p>
                    <Formik<FormValues>
                        enableReinitialize
                        initialValues={{
                            roomName: currentRoomData?.name || '',
                            floorNumber: currentRoomData?.floorNumber || '',
                            description: currentRoomData?.description || '',
                            capacity: currentRoomData?.pax || '',
                            services: currentRoomData?.services || [],
                            price: currentRoomData?.price ? currentRoomData.price.toString() : '',
                            photo: currentRoomData?.photo || [],
                            disabled: false,
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={formValidationSchema}
                    >
                        {({ values, errors, setFieldValue, resetForm }) => {
                            const areServicesSelected = values.services.length > 0;
                            return (
                                <Form>
                                    <FormControl
                                        validation={
                                            values.roomName.length === 0
                                                ? 'none'
                                                : errors.roomName
                                                    ? 'invalid'
                                                    : 'valid'
                                        }
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Nombre de habitación</FormControl.Label>
                                        <FormControl.Input
                                            type="text"
                                            placeholder={`Current name: ${currentRoomData?.name}`}
                                            onChange={async (event) => {
                                                await setFieldValue('roomName', event.target.value);
                                            }}
                                            value={values.roomName}

                                        />
                                        <FormControl.Text>{errors.roomName}</FormControl.Text>
                                    </FormControl>

                                    <FormControl
                                        validation={
                                            values.floorNumber.length === 0
                                                ? 'none'
                                                : errors.floorNumber
                                                    ? 'invalid'
                                                    : 'valid'
                                        }
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Piso</FormControl.Label>
                                        <FormControl.Input
                                            type="number"
                                            min="1"
                                            max="99"
                                            placeholder={`Current floor: ${currentRoomData?.floorNumber}`}
                                            onChange={async (event) => {
                                                await setFieldValue('floorNumber', event.target.value);
                                            }}
                                            onKeyDown={(event) => {
                                                event.preventDefault();
                                            }}
                                            value={values.floorNumber}

                                        />
                                        <FormControl.Text>{errors.floorNumber}</FormControl.Text>
                                    </FormControl>

                                    <FormControl
                                        validation={
                                            values.description.length === 0
                                                ? 'none'
                                                : errors.description
                                                    ? 'invalid'
                                                    : 'valid'
                                        }
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Descripción</FormControl.Label>
                                        <FormControl.Textarea
                                            placeholder={`Current description: ${currentRoomData?.description}`}
                                            onChange={async (event) => {
                                                await setFieldValue('description', event.target.value);
                                            }}
                                            value={values.description}
                                            className="h-40"

                                        />
                                        <FormControl.Text>{errors.description}</FormControl.Text>
                                    </FormControl>

                                    <FormControl
                                        validation={
                                            values.capacity.length === 0
                                                ? 'none'
                                                : errors.capacity
                                                    ? 'invalid'
                                                    : 'valid'
                                        }
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Capacidad</FormControl.Label>
                                        <FormControl.Input
                                            type="number"
                                            min="1"
                                            max="99"
                                            placeholder={`Current capacity: ${currentRoomData?.pax}`}
                                            onChange={async (event) => {
                                                await setFieldValue('capacity', event.target.value);
                                            }}
                                            onKeyDown={(event) => {
                                                event.preventDefault();
                                            }}
                                            value={values.capacity}

                                        />
                                        <FormControl.Text>{errors.capacity}</FormControl.Text>
                                    </FormControl>

                                    <FormControl
                                        validation={errors.services && !areServicesSelected ? 'invalid' : 'valid'}
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Servicios</FormControl.Label>
                                        <FormControl.Select
                                            placeholder="Seleccione un servicio"
                                            onChange={async (event) => {
                                                const selectedService = event.target.value;
                                                if (!values.services.includes(selectedService)) {
                                                    await setFieldValue('services', [...values.services, selectedService]);
                                                }
                                            }}
                                            value={values.services}

                                        >
                                            <option value="">Seleccione un servicio</option>
                                            {servicesRoom.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </FormControl.Select>
                                        <FormControl.Text>{errors.services}</FormControl.Text>
                                    </FormControl>

                                    {values.services.length > 0 && (
                                        <div className="mb-4">
                                            <FormControl.Label className="text-white">Servicios seleccionados</FormControl.Label>
                                            <ul className="list-disc pl-8 text-white">
                                                {values.services.map((service, index) => (
                                                    <li key={index}>{service}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {values.services.length > 0 && (
                                        <div className="mb-4">
                                            <Button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                                onClick={() => {
                                                    const newServices = [...values.services];
                                                    newServices.pop();
                                                    setFieldValue('services', newServices);
                                                }}
                                            >
                                                Eliminar último servicio
                                            </Button>
                                        </div>
                                    )}
                                    <Field name="price">
                                        {({ field, meta }: FieldProps<string>) => (
                                            <FormControl
                                                validation={
                                                    field.value === '' || (field.value && meta.touched && meta.error)
                                                        ? 'invalid'
                                                        : 'valid'
                                                }
                                                className="mb-4"
                                            >
                                                <FormControl.Label className="text-white">Precio</FormControl.Label>
                                                <FormControl.Input
                                                    {...field}
                                                    type="number"
                                                    min="1"
                                                    max="1500"
                                                    placeholder={`Current price: ${currentRoomData?.price}`}

                                                    onChange={(event) => {
                                                        setFieldValue('price', event.target.value.toString());
                                                    }}
                                                />
                                                <FormControl.Text>{meta.error}</FormControl.Text>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <FormControl
                                        validation={
                                            values.photo.length === 0
                                                ? 'none'
                                                : values.photo.length > 3
                                                    ? 'invalid'
                                                    : 'valid'
                                        }
                                        className="mb-4"
                                    >
                                        <FormControl.Label className="text-white">Fotos</FormControl.Label>
                                        <FormControl.Input
                                            type="file"
                                            placeholder="Foto"
                                            accept="image/*"
                                            onChange={(event) => handleFileChange(event, setFieldValue, values)}
                                            value=""
                                            multiple
                                        />
                                        {values.photo.map((photo, index) => (
                                            <div key={index} className="flex items-center justify-between mt-2">
                                                <div className="w-10/12">
                                                    <img
                                                        src={photo}
                                                        alt={`Imagen seleccionada ${index + 1}`}
                                                        className="max-h-full max-w-full"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newPhotos = [...values.photo];
                                                        newPhotos.splice(index, 1);
                                                        setFieldValue('photo', newPhotos);
                                                    }}
                                                    className="text-xl font-semibold text-red-500 hover:text-red-700 hover:underline focus:outline-none"
                                                >
                                                    Borrar
                                                </button>
                                            </div>
                                        ))}
                                        {values.photo.length > 3 && (
                                            <FormControl.Text>Se permiten máximo 3 fotos.</FormControl.Text>
                                        )}
                                    </FormControl>
                                    <div className="flex items-center justify-center">
                                        <FormControl.Label className="text-white items-center">
                                            Disable room
                                        </FormControl.Label>
                                        <div className="flex items-center ml-2">
                                            <FormControl.Input
                                                type="checkbox"
                                                onChange={(event) => {
                                                    setFieldValue('disabled', event.target.checked);
                                                }}
                                                checked={values.disabled}
                                                className="form-checkbox w-6 h-6 text-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <Button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
                                            type="submit"
                                            size="lg"
                                        >
                                            Update Room
                                        </Button>
                                        <Button
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md ml-4"
                                            onClick={() => resetForm()}
                                            size="lg"
                                        >
                                            <ArrowCounterClockwise weight="bold" size={24} />
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
