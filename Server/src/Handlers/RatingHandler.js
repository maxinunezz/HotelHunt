const { Hotel, Rating, User } = require("../db");

const getRating = async (req,res) => {
    try {
        const { hotelId } = req.params

        const ratings = await Rating.findAll({where:{
            hotelId: hotelId
        }});

        res.status(200).json(ratings)
    } catch (error) {
        res.status(500).send("Error en el Server")
    }
};



const crearValoracion = async (req, res) => {
  try {
    const { id } = userData;
    const { score, comment, hotelId } = req.body;
    const rating = await Rating.create({ userId: id, score, comment, hotelId });
    res.status(201).json(rating);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  crearValoracion,
  getRating,
};
