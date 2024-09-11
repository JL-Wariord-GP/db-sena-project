// routes/auth.js

const express = require("express");
const {
  register,
  login,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  getAuthenticatedUser,
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas de autenticación y gestión de usuarios
router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/user/:id", protect, getUser);
router.put("/user/:id", protect, updateUser);
router.delete("/user/:id", protect, deleteUser);

// Ruta protegida para obtener el usuario autenticado
router.get("/me", protect, getAuthenticatedUser);

module.exports = router;
