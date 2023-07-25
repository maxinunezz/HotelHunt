const { User, Auth, conn } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET, FRONT_URL } = process.env;

const confirmedAccount = async (req, res) => {

    const { token } = req.params;
    console.log(token)
    const decodedToken = jwt.verify(token, JWT_SECRET );
    console.log(decodedToken);


    try {
        const email = decodedToken.email;
        
        const authverify = await Auth.findOne({where: {email}});

        const userVerify = await User.findOne({where: {id: authverify.userId, disabled:true}});

        await userVerify.update({disabled: false})


        const admin = userVerify.admin;
        const token = jwt.sign({id: userVerify.id, admin: userVerify.admin}, JWT_SECRET, { expiresIn: '6h' });
        const data = {id: userVerify.id, name: userVerify.name, lastName: userVerify.lastName, birthDate: userVerify.birthDate, phoneNumber: userVerify.phoneNumber, createdAt: userVerify.createdAt }

        const allInfo = { admin: admin, token: token, data: data }
        res.cookie('json', allInfo)
        return res.status(200).redirect(`${FRONT_URL}`);

    } catch (error) {
        return res.status(401).send(error.message);        
    }
}

module.exports = {
    confirmedAccount,
}