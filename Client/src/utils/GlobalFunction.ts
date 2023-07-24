import axios from "axios";
import { tokenStore } from "../Store";


const url = import.meta.env.VITE_URL;



export const getHotels = async () => {
    try {
        const token = tokenStore((state) => state.userState)
        const response = await axios.get(
            `${url}/dashboard`,
            {
                headers:
                {
                    authorization:
                        `Bearer ${token[1]}`,
                },
            },
        )
        if (response.data) {
            return response.data            
        }
    } catch (error) {
        console.log(error);//aca va un toast

    }
}

