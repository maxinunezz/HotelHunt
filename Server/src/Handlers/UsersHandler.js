const { User, Auth, conn } = require("../db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PASSMAIL, COMPANYMAIL, JWT_SECRET,BACK_URL, FRONT_URL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: COMPANYMAIL,
    pass: PASSMAIL,
  },
});

const createUserForEmail = async (req, res) => {
  try {
    const { name, lastName, birthDate, phoneNumber, admin, email, password } =
      req.body;

    let usercreate;
    let adminvalue = "";
    if (admin) {
      adminvalue = "admin";
    }
    if (!admin) {
      adminvalue = "normal";
    }
    if (admin === "super") {
      adminvalue = admin;
    }
    const userexist = await Auth.findOne({
      where: { email },
      raw: true,
    });
    if (!userexist) {
      const saltrounds = 5;
      const hashedpass = await bcrypt.hash(password, saltrounds);

      usercreate = await User.create({
        name,
        lastName,
        birthDate,
        phoneNumber,
        admin: adminvalue,
        disabled: true,
      });

      const authcreate = await Auth.create({
        email,
        password: hashedpass,
        userId: usercreate.id,
      });

      const token = jwt.sign({ email: authcreate.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      const verificationLink = `${BACK_URL}/user/confirmEmail/${token}`;

      await usercreate.reload();

      await Promise.all([usercreate, authcreate]);

      await transporter.sendMail({
        from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
        to: email,
        subject: "CONFIRM YOUR ACCOUNT",
        html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
        
              .container {
                text-align: center;
                max-width: 600px;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
        
              img {
                max-width: 50%;
                height: auto;
                border-radius: 5px;
                margin-bottom: 10px;
                background-color: none;
              }
        
              h1 {
                color: #010101;
                margin-bottom: 10px;
              }
        
              h4 {
                color: #767575;
              }
        
              p {
                line-height: 1.6;
              }
        
              button {
                background-color: #0066cc;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
    <div class="container">
      <div>
        <img src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png" alt="" />
      </div>

      <h1>
        Te damos la bienvenida!!
      </h1>

      <div>
        <p>
          <b>Haga clic en el siguiente enlace para confirmar su cuenta:</b>
        </p>
      </div>
      <div>
        <a href="${verificationLink}">
          <button>Link de acceso</button>
        </a>
        <br>
        <br>
        <b>El enlace caduca en 1 hora</b>
      </div>
    </div>
  </body>
</html>
      `,
      });


      return res.status(201).send("Exitoso");
    } else {
      return res.status(400).send("El usuario ya existe")
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const destroyUser = await user.destroy({force:true});
    await Promise.all([destroyUser]);
    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update(req.body);

    return res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const askForPass = async (req, res) => {
  const { email } = req.params;
  try {
    const authForgot = await Auth.findOne({
      where: {
        email: email,
      },
    });
    if (authForgot) {
      const token = jwt.sign(
        { id: authForgot.id, email: authForgot.email },
        JWT_SECRET,
        { expiresIn: "15m" }
      );
      const verificationLink = `${BACK_URL}/user/validateAsk/${token}`; 

      await transporter.sendMail({
        from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
        to: email,
        subject: "Recupera tu contraseña",
        html: `
      <b>Haga clic en el siguiente enlace para recuperar su contraseña</b>
      <a href="${verificationLink}">${verificationLink}</a>
      <b> Link expira en 15min <b>
      `,
      });

      return res.status(200).send("Por favor revise su correo electrónico");
    } else {
      return res.status(404).send("El usuario no existe");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const validateToken = async (req, res) => {
  const { token } = req.params;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET );
    const emailToken = jwt.sign({id: decodedToken.id}, JWT_SECRET, { expiresIn: '30m' });
    const Token = { token : emailToken}
    if (decodedToken && !isTokenExpired(decodedToken)){
      res.cookie('token', Token)
      return res.status(200).redirect(`${FRONT_URL}/SetNewPass`)
    }else{
      throw Error(message, '')
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const recoveryPass = async (req,res) => {
  
  const { id } = userData;
  const { password } = req.body;
  
  try {
    const auth = await Auth.findOne({where: { id: id}})
    const hashedpass = await bcrypt.hash(password, 5);
    await auth.update({password: hashedpass})
    const userFound = await User.findOne({where: { id: auth.userId }})

    const token = jwt.sign(
      { id: userFound.id, admin: userFound.admin },
      JWT_SECRET,
      { expiresIn: "6h" }
    );

    const admin = userFound.admin;
    const data = {
      id: userFound.id,
      email: auth.email,
      name: userFound.name,
      lastName: userFound.lastName,
      birthDate: userFound.birthDate,
      phoneNumber: userFound.phoneNumber,
      createdAt: userFound.createdAt,
    };
    const allinfo = { token: token, admin: admin, data: data };

    res.cookie('json', allinfo)
    res.cookie('json', allinfo)


    return res.status(200).send('Contraseña actualizada')
  } catch (error) {
    return res.status(500).json(error);
  }
};

const isTokenExpired = (decodedToken) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

const handleFavorite = async (req, res) => {
  const { id } = userData;
  const { hotelId } = req.body;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const currentFavorites = user.favoriteHotel || [];
    const hotelIndex = currentFavorites.indexOf(hotelId);
    if (hotelIndex === -1) {
      const updatedFavorites = [...currentFavorites, hotelId];
      await user.update({ favoriteHotel: updatedFavorites });
      return res.status(200).json(updatedFavorites);
    } else {
      const deletedFavorite = currentFavorites.filter(
        (hotel) => hotel !== hotelId
      );
      await user.update({ favoriteHotel: deletedFavorite });
      return res.status(200).json(deletedFavorite);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  const { id } = userData;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const userFavorites = user.favoriteHotel || [];
    return res.status(200).json(userFavorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async(req,res) =>  {
  let users_array = []
  try {
    const users = await User.findAll();
    if(users.length === 0) {
      return res.status(404).json({ message: "No hay usuarios" });
    }

    users.forEach((user) => {
      const one_user = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber,
        disabled: user.disabled,
      };
      users_array.push(one_user)
    })

    return res.status(200).json(users_array)
  } catch (error) {
    return res.status(500).send("Error del servidor")
  }
};

module.exports = {
  createUserForEmail,
  deleteUser,
  updateUser,
  askForPass,
  recoveryPass,
  validateToken,
  handleFavorite,
  getUserFavorites,
  getAllUsers,
};
