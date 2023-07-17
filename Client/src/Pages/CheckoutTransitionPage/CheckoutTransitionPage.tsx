import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../Store/UserStore';

const CheckoutTransitionPage = () => {
    const navigate = useNavigate();
    const urlPayment= userStore((state)=>state.urlPayment)

    useEffect(() => {
        const redirectPay = () => {
            window.open(urlPayment, '_blank'); // Ruta de la página de pago
        };

        // Duración del gif en milisegundos
        const gifDuration = 3000; // Cambia este valor según la duración de tu gif en milisegundos

        // Redirigir a la página Home después de la duración del gif
        const timeoutId = setTimeout(redirectPay, gifDuration);

        // Limpiar el timeout al desmontar el componente
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-600 to-gray-900"
        >
            <h1 className="text-4xl text-white font-bold mb-4">Seras redirigido!</h1>
            
            <h1 className="text-4xl text-white font-bold mt-4">Buen viaje!</h1>
            
        </div>
    )
};

export default CheckoutTransitionPage;
