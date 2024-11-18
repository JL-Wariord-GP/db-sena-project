// Importar dependencias necesarias
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar configuración de variables de entorno
dotenv.config();

// Registrar un nuevo usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "El usuario con este correo electrónico ya está registrado.",
        });
    }

    const user = new User({ username, email, password });
    await user.save();

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
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Credenciales incorrectas" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
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
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
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
const updateUser = async (req, res) => {
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
const deleteUser = async (req, res) => {
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

// Obtener el usuario autenticado
const getAuthenticatedUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(req.user); // Devuelve los datos del usuario autenticado
  } catch (error) {
    console.error("Error al obtener el usuario autenticado:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAuthenticatedUser,
};
