const jwt = require('jsonwebtoken');
require("dotenv").config();

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  
  const { authorization } = req.headers;

  if (authorization) {
    try {
      const token = authorization.split(" ")[1].replace(/"/g, '');
      const decodedToken = jwt.verify(token, JWT_SECRET );
            

      if (decodedToken && !isTokenExpired(decodedToken)) {
        userData = decodedToken;
        next();
      } 
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirando' });
    }
  } else {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }
};


const isTokenExpired = (decodedToken) => {
  const currentTime = Math.floor(Date.now() / 1000); 
  return decodedToken.exp < currentTime;
};

module.exports = {
    authMiddleware
}


