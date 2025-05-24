// Cargamos las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Importamos las librerías necesarias
const express = require('express');      // Framework para crear el servidor HTTP
const mongoose = require('mongoose');    // ODM para interactuar con MongoDB
const cors = require('cors');            // Middleware para habilitar CORS (permite peticiones desde el frontend)

// Importamos los routers para manejar rutas de la API
const mensajesRoutes = require('./routes/mensajes');
const usuariosRoutes = require('./routes/usuarios');

// Creamos una instancia de la aplicación Express
const app = express();

// Puerto en el que se ejecutará el servidor (por defecto 8080 si no hay otro en el entorno)
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());                       // Habilita CORS para todas las rutas
app.use(express.json());               // Permite recibir y procesar datos en formato JSON
app.use(express.static('public'));     // Sirve archivos estáticos desde la carpeta "public" (index.html, CSS, JS)

// Definimos rutas base para los endpoints de mensajes y usuarios
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conectamos a MongoDB usando Mongoose y la URI guardada en .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => {
      console.log('✅ Conectado a MongoDB Atlas');
      // Iniciamos el servidor web una vez conectados exitosamente a MongoDB
      app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
    })
    .catch((err) => console.error('❌ Error al conectar:', err));

