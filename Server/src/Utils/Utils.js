const axios = require('axios');
const { Hotel, Room, User, conn } = require('../db');


async function fetchHotelsData() {
  try {
    const response = await axios.get('http://localhost:5000/hotels');
    const hotels = response.data;
    return hotels;
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    return [];
  }
}

async function loadusers() {
    try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;
        return users;
    } catch (error) {
        console.error('Error al cargar usuarios', error);        
    }
}

async function fetchRoomsData() {
    try {
      const response = await axios.get('http://localhost:5000/rooms');
      const rooms = response.data;
      return rooms;
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
      return [];
    }
  }

async function firstload() {
  try {

    const hotels = await fetchHotelsData();
    const rooms = await fetchRoomsData();
    const users = await loadusers();


    for (const hotel of hotels) {
      const { id, name, description, photo, city, maxCapacity, country, users, } = hotel;
      await Hotel.create({        
        id,
        name,
        description,
        users,
        photo,
        city,
        maxCapacity,
        country,
      });
    }

    for (const room of rooms) {
        const { name, description, photo, pax, hotelId, services } = room;
        await Room.create({
            name,
            description,
            hotelId,
            photo,
            pax,
            services,
        })
    }

    for (const user of users){
        const { name, lastName, birthDate, phoneNumber, admin, email, password, id} = user;
        await User.create({
            id,
            name,
            lastName,
            birthDate,
            phoneNumber,
            admin,
            email,
            password,
        })
    }

    console.log('Datos incrustados correctamente');
  } catch (error) {
    console.error('Error al incrustar los datos:', error);
  } 
}

module.exports = {
  firstload,
};
