import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FarewellPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectHome = () => {
            navigate('/'); // Ruta de la página Home
        };

        // Duración del gif en milisegundos

        // Redirigir a la página Home después de la duración del gif
        const timeoutId = setTimeout(redirectHome,2000);

        // Limpiar el timeout al desmontar el componente
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-600 to-gray-900"
        >
            <h1 className="text-4xl text-white font-bold mb-4">Gracias por elegirnos!</h1>
            <h1 className="text-4xl text-white font-bold mt-4">Buen viaje!</h1>
            <h2 className="text-2xl text-white font-bold mt-4">Serás redirigido al home</h2>
        </div>
    )
};

export default FarewellPage;
