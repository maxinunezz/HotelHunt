const jwt = require('jsonwebtoken');
require("dotenv").config();
const { Auth, User, conn } = require('../db')
const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

const AuthHandler = async (req, res) => {

    try {
        const { email, password } = req.body;

        const results = await Auth.findOne({ where: { email: email } });

        if(!results){
            return res.status(401).send("El usuario no existe");
        }
        
        if(results){
            await User.restore({ where: { id: results.userId } });
        }
        const storedpassword = results.password;

        const access = await bcrypt.compare(password, storedpassword);

        if(!access){
            return res.status(401).send("Contraseña incorrecta");
        }
        const user = await User.findOne({ where: { id: results.userId, disabled: false } })
        
        if(!user){
            return res.status(401).send("El usuario no existe");
        }

        const token = jwt.sign({id: user.id, admin: user.admin}, JWT_SECRET, { expiresIn: '6h' });

        const admin = user.admin;
        const data = {id: user.id, email: email, name: user.name, lastName: user.lastName, birthDate: user.birthDate, phoneNumber: user.phoneNumber, createdAt: user.createdAt }

        return res.status(200).json({token, admin, data});

    } catch (error) {
        return res.status(401).send(error.message);

    }

}

module.exports = {
    AuthHandler
}