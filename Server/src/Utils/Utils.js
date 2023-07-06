const axios = require('axios');
const { Hotel, Room, User, Auth, conn } = require('../db');


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

    for (const user of users) {
      const { name, lastName, birthDate, phoneNumber, admin, id, email, password } = user;
      const createdUser = await User.create({
        id,
        name,
        lastName,
        birthDate,
        phoneNumber,
        admin,
      })
      const createdAuth = await Auth.create({
        email,
        password,
        userId: createdUser.id,
      })
      await Promise.all([createdUser, createdAuth]);
    }




    for (const hotel of hotels) {
      const { id, name, description, photo, city, floorNumber, country, userId, } = hotel;
      const hotelcreated = await Hotel.create({
        id,
        name,
        description,
        userId,
        photo,
        city,
        floorNumber,
        country,
        roomsId: [],
      });
      await Promise.all([hotelcreated]);
    }



    for (const room of rooms) {
      const { name, description, photo, pax, hotelId, services } = room;
      const newRoom = await Room.create({
        name,
        description,
        hotelId,
        photo,
        pax,
        services,
      })
      const hotel = await Hotel.findByPk(hotelId);
      const RoomsIds = hotel.roomsId;

      RoomsIds.push(newRoom.id);
      const objetorooms = { roomsId: RoomsIds}

      console.log(objetorooms);

      await hotel.update(objetorooms);


    }
    console.log('Datos incrustados correctamente');
  } catch (error) {
    console.error('Error al incrustar los datos:', error);
  }
}

module.exports = {
  firstload,
};