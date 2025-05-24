const express = require('express');
const router = express.Router();
const Mensaje = require('../models/mensaje');

router.get('/', async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = new Mensaje({
      usuario: req.body.usuario,
      contenido: req.body.contenido,
      imagenUrl: req.body.imagenUrl,
      fechaHora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    });
    await nuevo.save();
    res.json({ mensaje: 'Guardado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
