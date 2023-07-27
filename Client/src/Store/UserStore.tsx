import axios from "axios";
import { create } from "zustand";
import { ReserveBooking } from "../Pages/RoomPage/RoomPage";
import { array } from "yup";
const url = import.meta.env.VITE_URL;

type States = {
  reserves: ReserveBooking[];
  urlPayment: string | null;
  sessionIdUser: string;
  allSessionData: object;
};

type Actions = {
  reserveRoomPayment: (data: []) => Promise<void>;
  roomPayment: (data: object, token:string) => Promise<void>;
  reset: () => void;
};

const initialState: States = {
  reserves: [],
  urlPayment: null,
  sessionIdUser: "",
  allSessionData:{}
};

export const userStore = create<States & Actions>((set) => ({
  ...initialState,

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

  roomPayment: async (info:object, token:string) => {
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