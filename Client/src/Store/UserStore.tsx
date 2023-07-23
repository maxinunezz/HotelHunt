import axios from "axios";
import { create } from "zustand";
import { ReserveBooking } from "../Pages/RoomPage/RoomPage";
const url = import.meta.env.VITE_URL;


type States = {
  reserves: ReserveBooking[];
  urlPayment: string | null;
  sessionIdUser: string;
  allSessionData: object;
  favoriteHotel: any[];
};


type Actions = {
  reserveRoomPayment: (data: []) => Promise<void>;
  roomPayment: (data: {}, token:string ) => Promise<void>;
  getFavorite:(userData: any) => Promise<void>
  addFavorite:(hotelId:any ,userData: any) => Promise<void>
  reset: (stateKey: keyof States) => void;
};

const initialState: States = {
  reserves: [],
  urlPayment: null,
  sessionIdUser: "",
  allSessionData:{},
  favoriteHotel: []

};

export const userStore = create<States & Actions>((set) => ({
  ...initialState,

  addFavorite: async (hotelId, userData)=>{

    try {

      const { data } = await axios.post(
        `${url}/user/favorites`,
        hotelId,
        {
          headers: {
            authorization: `Bearer ${userData}`,
          },
        }
      )

      
      
      set((state)=>({...state,
      favoriteHotel:data
    }))
    } catch (error) {
      console.log(error);
    }
    
      },
    
      getFavorite: async (userData)=>{
        try {

          
         const { data } = await axios.get(
          `${url}/user/favorites`,
         {
           headers: {
             authorization: `Bearer ${userData}`,
           },
         })

         

          set(()=>({
          favoriteHotel:data
        }))

        } catch (error) {
          console.log(error);
        }
    
        
      },
    

  reserveRoomPayment: async (data) => {
    try {
      set((state) => ({ ...state, reserves: data }));
    } catch (error) {
      console.log(error);
    }
  },

  reset: (stateKey) => {
    set((state) => ({
      ...state,
      [stateKey]: initialState[stateKey],
    }));
  },

  roomPayment: async (info, token) => {
    try {
      const { data } = await axios.post(
        `${url}/booking/reserva`,
        info,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const urlPago = data.urlpago; // Ajusta esto según la estructura de la respuesta del backend
      
       
      set((state) => ({
		...state,
    allSessionData: data,
		urlPayment: urlPago,
    sessionIdUser: data.sessionId
	}));
    } catch (error) {
      console.log(error);
    }
  },
}));
