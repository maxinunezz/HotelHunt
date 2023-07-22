import axios from "axios";
import { create } from "zustand";
import { ReserveBooking } from "../Pages/RoomPage/RoomPage";
const url = import.meta.env.VITE_URL;


type States = {
  reserves: ReserveBooking[];
  urlPayment: string | null;
  favoriteHotel: any[];
};

type Actions = {
  reserveRoomPayment: (data: []) => Promise<void>;
  roomPayment: (data: {}, token:string) => Promise<void>;
  addFavorite: (hotelId:any, userData:any) => Promise<void>;
  getFavorite: (hotel:any) => Promise<void> ;
  reset: () => void;
};

const initialState: States = {
  reserves: [],
  urlPayment: null,
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
      favoriteHotel:[...state.favoriteHotel, ]
    }))
    } catch (error) {
      
    }
    
      },
    
      getFavorite: async (hotel)=>{
    
    
        try {
          set((state)=>({...state,
          favoriteHotel:[...state.favoriteHotel.filter(hotels=> hotels.id !== hotel)]
        }))
        } catch (error) {
          
        }
    
        
      },
    

  reserveRoomPayment: async (data) => {
    try {
      set((state) => ({ ...state, reserves: data }));
    } catch (error) {
      console.log(error);
    }
  },

  reset: () => {
    set(initialState);
  },

  roomPayment: async (info:any, token:any) => {
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
		urlPayment: urlPago,
	}));
    } catch (error) {
      console.log(error);
    }
  },
}));
