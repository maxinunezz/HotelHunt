const { Hotel, Rating, User } = require("../db");

const getRating = async (req, res) => {
  try {
    const { hotelId } = req.params

    const ratings = await Rating.findAll({
      where: {
        hotelId: hotelId
      }
    });

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

const eliminarValoracion = async (req, res) => {
  try {
    const { commentId, } = req.params;
    const { id, admin } = userData;
    let comentario = {}

    comentario = await Rating.findOne({
      where: {
        id: commentId,
        userId: id,
      }
    });
    if (!comentario && admin === 'super') {
      comentario = await Rating.findOne({
        where: {
          id: commentId,
        }
      });
    }

    if (!comentario) {
      return res.status(404).send("Comentario no encontrado")
    }

    await comentario.destroy();

    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
};

const getAllRating = async (req, res) => {
  try {
    let rating = []
    const ratings = await Rating.findAll();
    for (const comentario of ratings) {
      const user = await User.findOne({
        where: {
          id: comentario.userId
        }
      })
      const hotel = await Hotel.findOne({
        where:
        {
          id: comentario.hotelId,
        }
      })
      const one_coment = {
        id: comentario.id,
        score: comentario.score,
        comment: comentario.comment,
        userName: user.name,
        hotelName: hotel.name,
      }
      rating.push(one_coment);

    }

    return res.status(200).json(rating)
  } catch (error) {
    return res.status(500).send("Error en el Server")
  }
};

module.exports = {
  crearValoracion,
  getRating,
  eliminarValoracion,
  getAllRating,
};

