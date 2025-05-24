// Importamos Express y creamos un router para manejar las rutas relacionadas a usuarios
const express = require('express');
const router = express.Router();

// Importamos el modelo de Usuario definido con Mongoose
const Usuario = require('../models/usuario');

/**
 * GET /api/usuarios
 * Devuelve una lista de los nicknames de los usuarios actualmente conectados.
 * MongoDB eliminará automáticamente a los usuarios inactivos gracias al TTL configurado.
 */
router.get('/', async (req, res) => {
  try {
    // Buscamos todos los usuarios conectados en la colección
    const usuarios = await Usuario.find();

    // Extraemos solo el nickname de cada usuario
    res.json(usuarios.map(u => u.nickname));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/usuarios
 * Registra o actualiza la fecha de conexión de un usuario.
 * Este endpoint mantiene al usuario "activo" en la base de datos.
 */
router.post('/', async (req, res) => {
  try {
    const { nickname } = req.body;

    // Si no se envía nickname, devolvemos error 400 (Bad Request)
    if (!nickname) return res.status(400).json({ error: 'nickname requerido' });

    // Buscamos al usuario por nickname y actualizamos su fecha de conexión
    // Si no existe, se crea automáticamente (upsert: true)
    await Usuario.findOneAndUpdate(
        { nickname },                         // Filtro por nickname
        { fechaConexion: new Date() },       // Actualiza la fecha de conexión
        { upsert: true, new: true }          // Crea si no existe, y devuelve el documento nuevo
    );

    res.json({ mensaje: 'Usuario registrado/renovado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exportamos el router para usarlo en index.js
module.exports = router;

