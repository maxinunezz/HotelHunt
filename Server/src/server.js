const express = require("express");
const router = require("./Routes");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(router);

module.exports = server;