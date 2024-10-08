const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Carga las variables de entorno
dotenv.config();

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION); 
    console.log("MongoDB connected");
  } catch (error) {
    process.exit(1); // Sale de la aplicación en caso de error
  }
};

module.exports = connectDB;
