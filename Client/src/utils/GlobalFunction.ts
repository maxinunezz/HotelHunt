import axios from "axios";
import { tokenStore } from "../Store";


const url = import.meta.env.VITE_URL;
const token = tokenStore((state) => state.userState)


export const getHotels = async () => {
    try {
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

