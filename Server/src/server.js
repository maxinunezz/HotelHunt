const express = require("express");
const router = require("./Routes");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
const corsOptions = {
    origin: ['http://localhost:5173', 'https://hotelhunt.kerchakpetshop.com.ar', 'https://oauth2.googleapis.com','https://accounts.google.com/'],
    methods: ['GET', 'POST'],
    credentials: true,
  };
server.use(cors(corsOptions));

server.use(router);


module.exports = server;