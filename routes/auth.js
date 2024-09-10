const express = require("express");
const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/authController");

const router = express.Router();

// Rutas de autenticación y gestión de usuarios
router.post("/register", register); // Ruta para registrar un usuario
router.post("/login", login); // Ruta para el inicio de sesión
router.get("/users", getUsers); // Ruta para obtener todos los usuarios
router.get("/user/:id", getUser); // Ruta para obtener un usuario por ID
router.put("/user/:id", updateUser); // Ruta para actualizar un usuario por ID
router.delete("/user/:id", deleteUser); // Ruta para eliminar un usuario por ID

module.exports = router;
