const { User, Auth, conn } = require('../db');
const bcrypt = require('bcrypt');


const CreateUserForEmail = async(req, res) => {
    try {
        const { name, lastName, birthDate, phoneNumber, admin, email, password} = req.body;
/* el ID de AUTH deberia apuntar al ID de USER */
        const userexist = await Auth.findOne({
            where: {email},
            raw: true
        });
        if(!userexist){

            const saltrounds = 5;
            const hashedpass = await bcrypt.hash(password, saltrounds);

            const usercreate = await User.create({
                name,
                lastName,
                birthDate,
                phoneNumber,
                admin,
            });

            const authcreate = await Auth.create({
                email,
                password: hashedpass,
                userId: usercreate.id,
            });

            await Promise.all([usercreate, authcreate]);

            return res.status(201).json({
                message: "Successful",
                userId: usercreate.id
              });

        }else{
            return res.status(400).send("Users already exist");
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    CreateUserForEmail,
}