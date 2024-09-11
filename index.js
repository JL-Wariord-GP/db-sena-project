const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

// Cargar las variables de entorno
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Usa el middleware CORS
app.use(cors());

// Conectar a la base de datos
connectDB();

// Middleware para el parsing de JSON
app.use(express.json());

// Definir las rutas
app.use("/api/auth", require("./routes/auth"));

// Ruta para el archivo HTML estático
app.use(express.static("public"));

// Escuchar en el puerto definido
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
