import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '../../Store';

const CheckoutTransitionPage = () => {
    const navigate = useNavigate();
    const sessionStorageInfo = sessionStorage.getItem("token");
    const parsedSessionStorageInfo = sessionStorageInfo ? JSON.parse(sessionStorageInfo) : null;
    const { saveInfo } = tokenStore()
    const token = tokenStore((state) => state.userState)
    
  
    useEffect(() =>{
        saveInfo(parsedSessionStorageInfo)
    }, [])


    window.localStorage.getItem("token")
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-600 to-gray-900">
        <h1 className="text-4xl text-white font-bold mb-4">Quieres ver tus reservas?</h1>
        <button className="text-white font-medium bg-blue-600 px-4 py-2 rounded-lg mb-4" onClick={() => navigate('/profile/reservas')}>
            Llevame a mis reservas
        </button>
        <h1 className="text-4xl text-white font-bold mb-4">Quieres ir al home?</h1>
        <button className="text-white font-medium bg-blue-600 px-4 py-2 rounded-lg mb-4" onClick={() => navigate('/')}>
            Llevame al HOME
        </button>
        <h1 className="text-4xl text-white font-bold mt-4">Buen viaje!</h1>
    </div>
    )
};

export default CheckoutTransitionPage;
