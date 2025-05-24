const { Schema, model } = require('mongoose');
const mensajeSchema = new Schema({
  usuario: String,
  contenido: String,
  fechaHora: String,
  imagenUrl: String,
  fechaCreacion: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24h TTL
  }
});
module.exports = model('Mensaje', mensajeSchema);
