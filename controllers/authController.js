// Importar dependencias necesarias
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar configuración de variables de entorno
dotenv.config();

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Crear y guardar nuevo usuario
    const user = new User({ username, email, password });
    await user.save();

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar existencia del usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si la contraseña coincide
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    return res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un usuario por ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    await user.save();
    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.deleteOne();
    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
