require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mensajesRoutes = require('./routes/mensajes');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/mensajes', mensajesRoutes);
app.use('/api/usuarios', usuariosRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
}).catch((err) => console.error('❌ Error al conectar:', err));
