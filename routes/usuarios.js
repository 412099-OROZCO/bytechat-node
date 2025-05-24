const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios.map(u => u.nickname));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nickname } = req.body;
    if (!nickname) return res.status(400).json({ error: 'nickname requerido' });
    await Usuario.findOneAndUpdate(
      { nickname },
      { fechaConexion: new Date() },
      { upsert: true, new: true }
    );
    res.json({ mensaje: 'Usuario registrado/renovado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
