const { User, Auth, conn } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("dotenv").config();

const { JWT_SECRET } = process.env;

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}

const currentDate = new Date();

// Establece la fecha de expiración en 7 días
const expirationDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));

const authGoogle = async (req, res) => {
    const { email, name, lastName, sub } = userrData;
    const pass_generated = generateRandomPassword(8);
    const hashedpass = await bcrypt.hash(pass_generated, 5);

    try {
        const Authexist = await Auth.findOne({ where: { email: email } });
        if (Authexist) {
            
            const findUserData = await User.findOne({ where: { id: Authexist.userId } });

            if (findUserData.google_id === sub) {
                return res.status(201).redirect('http://localhost:5173/');
            }

            await findUserData.update({ google_id: sub });
        } else {

            const newUser = await User.create({
                name: name,
                lastName: lastName,
                disabled: false,
            });

            await Auth.create({
                userId: newUser.id,
                email: email,
                password: hashedpass,
            });
            const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '6h' });
            console.log(token)
            const userData = { id: newUser.id, email: email, name: name, lastName: lastName };
    
            res.cookie('access', token, {
                expires: expirationDate,
                secure: true,
                httpOnly: true,
            });
    
            res.cookie('json', JSON.stringify(userData));
        }
        
        return res.status(200).redirect('http://localhost:5173/');
       
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    authGoogle,
};
