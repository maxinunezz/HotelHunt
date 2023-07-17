import axios from "axios";
import { create } from "zustand";
import { ReserveBooking } from "../Pages/RoomPage/RoomPage";
import { array } from "yup";

type States = {
  reserves: ReserveBooking[];
  urlPayment: string | null;
};

type Actions = {
  reserveRoomPayment: (data: []) => Promise<void>;
  roomPayment: (data: {}) => Promise<void>;
  deleteAccount: (userId: string) => Promise<void>
  reset: () => void;
};

const initialState: States = {
  reserves: [],
  urlPayment: null,
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

  roomPayment: async (info) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/booking/reserva",
        info
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

  deleteAccount: async (userId) => {
    try {
      const {data} = await axios.delete(`http://localhost:3001/user/${userId}`)
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  },
}));
