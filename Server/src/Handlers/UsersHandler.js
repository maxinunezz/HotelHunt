const { User, Auth, conn } = require("../db");
const bcrypt = require("bcrypt");

const createUserForEmail = async (req, res) => {
  try {
    const { name, lastName, birthDate, phoneNumber, admin, email, password } =
      req.body;
    /* el ID de AUTH deberia apuntar al ID de USER */
    const userexist = await Auth.findOne({
      where: { email },
      raw: true,
    });
    if (!userexist) {
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
        userId: usercreate.id,
      });
    } else {
      return res.status(400).send("Users already exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    await Auth.destroy({ where: { userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, name, lastName, birthDate, phoneNumber, admin } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    name = user.name;
    lastName = user.lastName;
    birthDate = user.birthDate;
    phoneNumber = user.phoneNumber;
    admin = user.admin;

    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserForEmail,
  deleteUser,
  updateUser,
};
