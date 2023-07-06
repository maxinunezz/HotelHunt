const { Auth, conn } = require('../db')
const bcrypt = require("bcrypt");

const LoginMiddleware = async (req, res, next) => {

    const { email, password } = req.body;

    const result = await Auth.findOne({ where: { email: email } });
    const storedpassword = result.password;

    const access = await bcrypt.compare(password, storedpassword);


    if (access) {
        next();
    }else{
        return "User dont exist or wrong password";
    }


}

module.exports = {
    LoginMiddleware,
}
/*{    // ...
    async authenticateUser(username, password) {
      // Obtener el hash de la contraseña almacenado en la base de datos
      const storedHashedPassword = '...';
  
      // Comparar la contraseña ingresada con el hash almacenado
      const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);
  
      if (isPasswordCorrect) {
        // La contraseña es correcta
        // ...
      } else {
        // La contraseña es incorrecta
        // ...
      }
    },
    // ...
  }; */
