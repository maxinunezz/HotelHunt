import { create } from 'zustand';

interface Room {
    key: string;
    id: string;
    name: string;
    description: string;
    services: string[];
    photo: string[];
    pax: number;
    hotelId: string;
    price: string;
    floorNumber: string;
    disabled: boolean;
    hotelCategory: string;
}

type States = {
    roomsFilter: Room[];

};

type Actions = {
    fetchFilterRooms: (arrayToFilter: any, price: {minPrice: string, maxPrice: string}, category: object, capacity: object) => void;
    sortByPrice: (elements: any, sortBy: string) => void;
    reset: (rooms: any) => void;
};

const initialState: States = {
    roomsFilter: [],

};

export const roomsSearchStore = create<States & Actions>((set) => ({
    ...initialState,

    fetchFilterRooms: (allRooms, filters, category, capacity) => {
        let filteredRooms: Room[] = [...allRooms];

        // filtro de minPrice y maxPrice
        if (filters.minPrice && filters.maxPrice) {
            const minPrice = Number(filters.minPrice);
            const maxPrice = Number(filters.maxPrice);
            filteredRooms = filteredRooms.filter(
                (room) => Number(room.price) >= minPrice && Number(room.price) <= maxPrice
            );
        }

        // filtro de category
        const selectedCategories = Object.entries(category)
            .filter(([,value]) => value)
            .map(([key]) => Number(key.replace("checkbox", "")));
        if (selectedCategories.length > 0) {
            filteredRooms = filteredRooms.filter((room) =>
                selectedCategories.includes(Number(room.hotelCategory))
            );
        }

        // filtro de capacity
        const selectedCapacities = Object.entries(capacity)
            .filter(([,value]) => value)
            .map(([key]) => Number(key.replace("checkbox", "")));
        if (selectedCapacities.length > 0) {
            filteredRooms = filteredRooms.filter((room) =>
                selectedCapacities.includes(room.pax)
            );
        }

        set((state) => ({
            ...state,
            roomsFilter: filteredRooms
        }));
    },


    sortByPrice: (elements, sortBy) => {
        switch (sortBy) {
            case "price-asc":
                elements.sort((a:any, b: any) => Number(a.price) - Number(b.price));
                break;
            case "price-desc":
                elements.sort((a:any, b: any) => Number(b.price) - Number(a.price));
                break;
            case "capacity-asc":
                elements.sort((a: any, b:any) => a.pax - b.pax);
                break;
            case "capacity-desc":
                elements.sort((a: any, b: any) => b.pax - a.pax);
                break;
            default:
                break;
        }
        set((state) => ({
            ...state,
            roomsFilter: elements
        }))
    },


    reset: (rooms) => {
        set((state) => ({
            ...state,
            roomsFilter: rooms
        }));
    },
}));