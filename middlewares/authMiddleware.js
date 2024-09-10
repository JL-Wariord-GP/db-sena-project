const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware de protección de rutas
const protect = async (req, res, next) => {
  let token;

  // Verificar si el token está presente en los headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extraer el token del encabezado

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar el usuario asociado al token y excluir la contraseña
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continuar con la siguiente función de middleware
    } catch (error) {
      res.status(401).json({ error: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "No autorizado, no se encontró el token" });
  }
};

module.exports = protect;
