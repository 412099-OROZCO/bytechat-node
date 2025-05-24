const { Schema, model } = require('mongoose');
const usuarioSchema = new Schema({
  nickname: String,
  fechaConexion: {
    type: Date,
    default: Date.now,
    expires: 60 // TTL: 60s
  }
});
module.exports = model('Usuario', usuarioSchema);
