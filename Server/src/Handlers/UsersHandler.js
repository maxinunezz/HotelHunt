const { User, Auth, conn } = require("../db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const { PASSMAIL, COMPANYMAIL, JWT_SECRET } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: COMPANYMAIL,
    pass: PASSMAIL,
  }
});

const createUserForEmail = async (req, res) => {
  try {
    const { name, lastName, birthDate, phoneNumber, admin, email, password } =
      req.body;

    let usercreate;
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

      const token = jwt.sign({ email: authcreate.email }, JWT_SECRET, { expiresIn: '1h' });
      const verificationLink = `http://localhost:3001/user/confirmEmail/${token}`


      await usercreate.reload();

      await Promise.all([usercreate, authcreate]);

      await transporter.sendMail({
        from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
        to: email,
        subject: "CONFIRM YOUR ACCOUNT",
        html: `
      <b>Please click on the following link to confirm your account:</b>
      ,<a href="${verificationLink}">${verificationLink}</a>
      <b> Link expires in 1 hr <b>
      `,
      });


      return res.status(201).send("Successfull");
    } else {
      return res.status(400).send("Users already exist");
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
      return res.status(404).json({ message: "User not found" });
    }
    const destroyUser = await user.destroy();
    await Promise.all([destroyUser]);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(req.body);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const askForPass = async (req, res) => {
  const { email } = req.params;
  try {
    const authForgot = await Auth.findOne({
      where:
      {
        email: email,
      }
    });
    if (authForgot) {
      const token = jwt.sign({ id: authForgot.id, email: authForgot.email }, JWT_SECRET, { expiresIn: '15m' });
      const verificationLink = `http://localhost:3001/user/validateAsk/${token}`

    await transporter.sendMail({
      from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
      to: email,
      subject: "Recovery your password",
      html: `
      <b>Please click on the following link to recover your password </b>
      ,<a href="${verificationLink}">${verificationLink}</a>
      <b> Link expires in 15m <b>
      `,
    });

    return res.status(200).send('Please check your email');
  }
  else{
    return res.status(404).send("User doesn't exist")
  }

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const validateToken = async ( req, res) => {
  const { token } = req.params;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET );
    const newToken = jwt.sign({decodedToken}, JWT_SECRET, { expiresIn: '15m' });
    if (decodedToken && !isTokenExpired(decodedToken)){
      res.cookie('token', newToken, {
        secure: true,
        httpOnly: true,
      })
      return res.status(200).redirect('http://localhost:5173/')//pagina de recovery
    }else{
      throw Error(message, '')
    }

  } catch (error) {
    return res.status(500).json(error);    
  }
}

const recoveryPass = async (req,res) => {
  const { id } = userData;
  const { password } = req.body
  try {
    const auth = await Auth.findOne({where: { id: id}})
    const hashedpass = await bcrypt.hash(password, 5);
    await auth.update({password: hashedpass})
    const userFound = await User.findOne({where: { id: auth.userId }})

    const token = jwt.sign({id: userFound.id, admin: userFound.admin}, JWT_SECRET, { expiresIn: '6h' });

    const admin = userFound.admin;
    const data = {
      id: userFound.id,
      email: auth.email, 
      name: userFound.name, 
      lastName: userFound.lastName, 
      birthDate: userFound.birthDate, 
      phoneNumber: userFound.phoneNumber, 
      createdAt: userFound.createdAt 
    }
    const allinfo = {token: token,admin: admin, data: data }

    res.cookie('json', allinfo,{
      secure:true,
    }).send('Password Updated')


    return res.status(200).redirect('http://localhost:5173/')
  } catch (error) {
    return res.status(500).json(error);
  }
}

const isTokenExpired = (decodedToken) => {
  const currentTime = Math.floor(Date.now() / 1000); 
  return decodedToken.exp < currentTime;
};


module.exports = {
  createUserForEmail,
  deleteUser,
  updateUser,
  askForPass,
  recoveryPass,
  validateToken,
};

