// Importamos Express y creamos un router modular
const express = require('express');
const router = express.Router();

// Importamos el modelo 'Mensaje' definido con Mongoose
const Mensaje = require('../models/mensaje');

/**
 * GET /api/mensajes
 * Obtiene todos los mensajes guardados en la base de datos.
 * Este endpoint se usa para cargar el historial del chat en el frontend.
 */
router.get('/', async (req, res) => {
  try {
    const mensajes = await Mensaje.find(); // Recupera todos los documentos de la colección "mensajes"
    res.json(mensajes); // Devuelve el array de mensajes en formato JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Maneja errores internos del servidor
  }
});

/**
 * POST /api/mensajes
 * Guarda un nuevo mensaje en la base de datos.
 * El frontend debe enviar un objeto JSON con: usuario, contenido, y (opcional) imagenUrl.
 */
router.post('/', async (req, res) => {
  try {
    // Creamos una nueva instancia de mensaje con los datos recibidos del frontend
    const nuevo = new Mensaje({
      usuario: req.body.usuario,
      contenido: req.body.contenido,
      imagenUrl: req.body.imagenUrl,
      fechaHora: new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      fechaCreacion: new Date() // Aseguramos que el TTL se active correctamente
    });

    // Log para verificar el contenido del mensaje
    console.log("📩 Nuevo mensaje recibido:", nuevo);

    // Guardamos el mensaje en MongoDB
    await nuevo.save();

    // Respondemos con un mensaje de éxito
    res.json({ mensaje: 'Guardado con éxito' });
  } catch (err) {
    console.error("❌ Error al guardar mensaje:", err); // Log en caso de error
    res.status(500).json({ error: err.message }); // Enviamos el error al frontend
  }
});

// Exportamos el router para usarlo en el archivo index.js
module.exports = router;


