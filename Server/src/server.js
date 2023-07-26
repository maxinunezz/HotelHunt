const express = require("express");
const router = require("./Routes");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['http://localhost:5173/', 'https://hotelhunt.kerchakpetshop.com.ar/', 'https://oauth2.googleapis.com/'],
    methods: ['GET', 'POST'],
    credentials: true,
  };
server.use(cors(corsOptions));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(router);


module.exports = server;