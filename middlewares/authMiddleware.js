const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtiene el token del header
      token = req.headers.authorization.split(" ")[1];

      // Verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Añade el usuario a la solicitud
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ error: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "No autorizado, no se encontró el token" });
  }
};

module.exports = protect;
