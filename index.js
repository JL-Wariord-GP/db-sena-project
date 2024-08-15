const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

// Cargar las variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para el parsing de JSON
app.use(express.json());

// Definir las rutas
app.use("/api/auth", require("./routes/auth"));

// Ruta para el archivo HTML estático
app.use(express.static("public"));

// Escuchar en el puerto definido
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
