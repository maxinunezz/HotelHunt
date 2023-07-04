require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/Hostal_pf`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((modelDefiner) => {
  if (typeof modelDefiner === "function") {
    modelDefiner(sequelize);
  }
});

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Room, Hotel, Booking, User, Auth } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasMany(Booking, { foreignKey: "userId", targetKey: "id" });
Hotel.hasMany(Room, { foreignKey: "hotelId", targetKey: "id" });
Room.hasMany(Booking, { foreignKey: "roomId", targetKey: "id" });
Hotel.belongsTo(Room, { foreignKey: "roomsId", targetKey: "id" });
/*User.hasOne(Auth, {
  foreignKey: "userId",
  targetKey: "id",
  onDelete: "CASCADE",
});*/
/*Auth.belongsTo(User, { foreignKey: "id", targetKey: "id" });*/



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
