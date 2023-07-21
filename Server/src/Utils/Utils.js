const axios = require("axios");
const { Hotel, Room, User, Auth, Rating, conn } = require("../db");

async function fetchHotelsData() {
  try {
    const response = await axios.get("http://localhost:5000/hotels");
    const hotels = response.data;
    return hotels;
  } catch (error) {
    console.error("Failed to get data from API:", error);
    return [];
  }
}

async function getAllRating () {
  try {
    const response = await axios.get("http://localhost:5000/ratings");
    const ratings = response.data;
    return ratings;
  } catch (error) {
    
  }
}

async function loadusers() {
  try {
    const response = await axios.get("http://localhost:5000/users");
    const users = response.data;
    return users;
  } catch (error) {
    console.error("Error loading users", error);
  }
}

async function fetchRoomsData() {
  try {
    const response = await axios.get("http://localhost:5000/rooms");
    const rooms = response.data;
    return rooms;
  } catch (error) {
    console.error("Failed to get data from API:", error);
    return [];
  }
}

async function firstload() {
  try {
    const hotels = await fetchHotelsData();
    const rooms = await fetchRoomsData();
    const users = await loadusers();
    const ratings = await getAllRating();

    for (const user of users) {
      const {
        name,
        lastName,
        birthDate,
        phoneNumber,
        admin,
        id,
        email,
        password,
      } = user;
      let adminvalue = ""
      if (admin) {
        adminvalue = "admin";
      }
      if (!admin) {
        adminvalue = "normal";
      }
      if (admin === "super") {
        adminvalue = admin;
      }
      const createdUser = await User.create({
        id,
        name,
        lastName,
        birthDate,
        phoneNumber,
        admin: adminvalue,
      });
      const createdAuth = await Auth.create({
        email,
        password,
        userId: createdUser.id,
      });
      await Promise.all([createdUser, createdAuth]);
    }

    for (const hotel of hotels) {
      const { id, name, description, photo, city, country, userId, hotelCategory, services } = hotel;
      const hotelcreated = await Hotel.create({
        id,
        name,
        description,
        userId,
        photo,
        city,
        country,
        hotelCategory,
        services,
        roomsId: [],
      });
      await Promise.all([hotelcreated]);
    }

    for (const rating of ratings) {
      const { userId, score, comment, hotelId} = rating;
      const ratingcreated = await Rating.create({
        userId,
        score, 
        comment, 
        hotelId,
      });
      await Promise.all([ratingcreated]);
    }

    for (const room of rooms) {
      const { name, description, photo, pax, hotelId, services, floorNumber, price } =
        room;
      const newRoom = await Room.create({
        name,
        description,
        hotelId,
        photo,
        pax,
        services,
        price,
        floorNumber,
      });
      const hotel = await Hotel.findByPk(hotelId);
      const RoomsIds = hotel.roomsId;
      await newRoom.update({
        hotelCategory: hotel.hotelCategory
      })
      RoomsIds.push(newRoom.id);

      await Hotel.update(
        { roomsId: RoomsIds },
        {
          where: {
            id: hotelId,
          },
        }
      );
    }
    console.log("Dates pushing successfully");
  } catch (error) {
    console.error("Error embedding data:", error);
  }
}

module.exports = {
  firstload,
};