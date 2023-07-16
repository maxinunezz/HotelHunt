import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokenStore } from '../../Store';
import axios from 'axios';
import { errorToast, successToast } from '../../components/toast';


const ConfirmPage = () => {

    const [countdown, setCountdown] = useState(5)
    const navigate = useNavigate();
    const { saveInfo } = tokenStore();

    const sendConfirm = async () => {
        const arrayAux: [] = [];
        try {
            return await axios.get(`http://localhost:3001/user/confirmEmail/${token}`).then((response) => {
                if (response.data) {
                    const tokenRaw = response.data.token
                    const statusadmin = response.data.admin
                    const logeado = true
                    const userData = response.data.data
                    arrayAux.push(userData)
                    arrayAux.push(tokenRaw)
                    arrayAux.push(statusadmin)
                    arrayAux.push(logeado)
                    saveInfo(arrayAux)
                }
                successToast('Usuario logeado correctamente');
                navigate('/')
            }
            )
        } catch (error) {
            errorToast('Hubo un error, intenta de nuevo');
        }

    }

    useEffect(() => {
        sendConfirm();
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        if(countdown === 0){
            navigate('/')
        }
        
        return clearInterval(interval);
        
       
    }, [countdown]);

    return (
        <div>
            <h1>Confirmation Page</h1>
            <p>You will be redirect in: {countdown} seconds</p>
        </div>
    )

}


export default ConfirmPage;
