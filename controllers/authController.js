const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Registro de un nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    // Generación del token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar el usuario" });
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generación del token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    // Consulta para obtener todos los usuarios
    const users = await User.find(); // Encuentra todos los documentos en la colección de usuarios

    // Verifica si se encontraron usuarios
    if (users.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    res.json(users); // Envía la lista de usuarios como respuesta
  } catch (error) {
    console.error("Error al obtener los usuarios:", error); // Log del error para depuración
    res.status(400).json({ error: "Error al obtener los usuarios" });
  }
};
 
 // Obtener un usuario por ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el usuario" });
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
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.deleteOne({_id: req.params.id});
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(400).json({ error: "Error al eliminar el usuario" });
  }
};
