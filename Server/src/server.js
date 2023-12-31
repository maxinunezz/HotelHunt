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
server.use(cors());

server.use(router);


module.exports = server;