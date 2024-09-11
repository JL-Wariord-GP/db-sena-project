const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware de protección de rutas
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token recibido:", token); // Añadir para depurar

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Añadir para depurar

      req.user = await User.findById(decoded.id).select("-password");
      console.log("Usuario encontrado:", req.user); // Añadir para depurar

      next();
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      res.status(401).json({ error: "No autorizado, token fallido" });
    }
  } else {
    res.status(401).json({ error: "No autorizado, no se encontró el token" });
  }
};

module.exports = protect;

