const { User, Auth, conn } = require("../db");
const bcrypt = require("bcrypt");

const createUserForEmail = async (req, res) => {
  try {
    const { name, lastName, birthDate, phoneNumber, admin, email, password } =
      req.body;
    /* el ID de AUTH deberia apuntar al ID de USER */
    let usercreate;
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
        admin,
      });
      console.log(usercreate.id);
      

      const authcreate = await Auth.create({
        email,
        password: hashedpass,
        id: usercreate.id,
        userId: usercreate.id,
      });
      await usercreate.reload();

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
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const destroyUser = await user.destroy();
    const destroyAuthUser = await Auth.destroy({ where: { id: id } });
    await Promise.all([destroyAuthUser,destroyUser]);
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

module.exports = {
  createUserForEmail,
  deleteUser,
  updateUser,
};
