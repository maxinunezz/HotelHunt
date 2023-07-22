import axios from "axios";
import { create } from "zustand";
import { Hotel } from "../models";
const url = import.meta.env.VITE_URL;

type States = {
  hotels: Hotel[];
  currentPage: number;
  pageNumbers: number[];
  favoriteHotel: Hotel[];
};

type Actions = {
  fetchHotels: () => Promise<void>;
  setCurrentPage: (pageNum: number) => void;
  orderByName: (array: Hotel[], event: string) => void;
  orderByCategory: (array: Hotel[], event: string) => void;
  resetHotels: () => void;
  addFavorite: (hotel:any) => void;
  deleteFavorite: (hotel:any) => void;
};

const initialState: States = {
  hotels: [],
  currentPage: 1,
  pageNumbers: [],
  favoriteHotel: [],
};

export const hotelStore = create<States & Actions>((set) => ({
  ...initialState,

  addFavorite: (hotel)=>{
set((state)=>({...state,
  favoriteHotel:[...state.favoriteHotel, hotel]
}))
  },

  deleteFavorite: (hotel)=>{

    set((state)=>({...state,
      favoriteHotel:[...state.favoriteHotel.filter(hotels=> hotels.id !== hotel)]
    }))
  },

  fetchHotels: async () => {
    const { data } = await axios.get<Hotel[]>(`${url}/hotel`);

    set((state) => ({
      ...state,
      hotels: data,
    }));
  },

  setCurrentPage: (pageNum) => {
    set(() => ({
      currentPage: pageNum,
    }));
  },
  orderByName: (array, event) => {
    if (event === "ASC") {
      const arrayAux = array.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      set((state) => ({
        ...state,
        hotels: arrayAux,
      }));
    } else if (event === "DES") {
      const arrayAux = array.sort((a, b) => b.name.localeCompare(a.name));
      set((state) => ({
        ...state,
        hotels: arrayAux,
      }));
    }
  },
  orderByCategory: (array, event) => {
    if (event === "ASC") {
      const arrayAux = array.sort(
        (a, b) => parseInt(a.hotelCategory) - parseInt(b.hotelCategory)
      );
      set((state) => ({
        ...state,
        hotels: arrayAux,
      }));
    } else if (event === "DES") {
      const arrayAux = array.sort(
        (a, b) => parseInt(b.hotelCategory) - parseInt(a.hotelCategory)
      );
      set((state) => ({
        ...state,
        hotels: arrayAux,
      }));
    }
  },

  resetHotels: () => {
    set(initialState);
  },
}));
