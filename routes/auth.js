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

// Ruta para el registro
router.post("/register", register);

// Ruta para el login
router.post("/login", login);

// Ruta para obtener todos los usuarios
router.get("/users", getUsers);

// Ruta para obtener un usuario por ID
router.get("/user/:id", getUser);

// Ruta para actualizar un usuario por ID
router.put("/user/:id", updateUser);

// Ruta para eliminar un usuario por ID
router.delete("/user/:id", deleteUser);

module.exports = router;
