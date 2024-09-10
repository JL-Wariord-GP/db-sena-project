const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definición del esquema de usuario
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Continuar si la contraseña no ha sido modificada
  const salt = await bcrypt.genSalt(10); // Generar un salt
  this.password = await bcrypt.hash(this.password, salt); // Encriptar la contraseña
  next();
});

// Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compara la contraseña ingresada con la almacenada
};

module.exports = mongoose.model("User", UserSchema);
