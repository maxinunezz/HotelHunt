const { Router } = require("express");
const { getallhotels } = require("../Handlers/HotelHandler");
const { CreateUserForEmail } = require("../Handlers/UsersHandler");

const router = Router();

router.get("/hotels", getallhotels);
router.post("/singup", CreateUserForEmail);


module.exports = router;