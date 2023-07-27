import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '../../Store';

const CheckoutTransitionPage = () => {
    const navigate = useNavigate();
    const sessionStorageInfo = sessionStorage.getItem("token");
    const parsedSessionStorageInfo = sessionStorageInfo ? JSON.parse(sessionStorageInfo) : null;
    const { saveInfo } = tokenStore()
    const token = tokenStore((state) => state.userState)

    console.log(sessionStorageInfo);
    console.log(token);

    useEffect(() => {
        saveInfo(parsedSessionStorageInfo)
    }, [])


    window.localStorage.getItem("token")
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-600 to-slate-900">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-center transform scale-95 hover:scale-100 transition-transform duration-300">
                <h1 className="text-5xl text-gray-900 font-bold">¡Bienvenido!</h1>
                <h2 className="text-3xl text-gray-700 font-medium">¿Quieres ver tus reservas o ir al Home?</h2>
                <div className="space-y-4">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md"
                        onClick={() => navigate('/profile/reservas')}
                    >
                        ¡Llévame a mis reservas!
                    </button>
                    <div className="my-4">
                        <span className="text-gray-500">o</span>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md"
                        onClick={() => navigate('/')}
                    >
                        Explorar más
                    </button>
                </div>
                <h1 className="text-4xl text-gray-900 font-bold mt-4">¡Buen viaje!</h1>
            </div>
        </div>
    )
};

export default CheckoutTransitionPage;
