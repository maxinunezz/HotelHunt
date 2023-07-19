import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../Store/UserStore';

const CheckoutTransitionPage = () => {
    const navigate = useNavigate();
    const session = JSON.parse(window.localStorage.getItem("session"))
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(session, token);

    
    
    window.localStorage.getItem("token")
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
