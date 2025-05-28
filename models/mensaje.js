// Importamos las herramientas necesarias de Mongoose:
// - Schema: para definir la estructura del documento
// - model: para crear el modelo que se usará para interactuar con la colección en MongoDB
const { Schema, model } = require('mongoose');

// Definimos el esquema del documento de mensaje
const mensajeSchema = new Schema({
  // Nombre del usuario que envía el mensaje
  usuario: String,

  // Contenido textual del mensaje
  contenido: String,

  // Hora en la que se envió el mensaje (formato HH:mm), asignada desde el backend
  fechaHora: String,

  // URL opcional de una imagen que acompaña el mensaje
  imagenUrl: String,

  // Fecha de creación del documento (se guarda como Date)
  // TTL (time to live): el mensaje se eliminará automáticamente después de 24 horas (86400 segundos)
  fechaCreacion: {
    type: Date,
    default: Date.now,
    //expires: 3600 // En segundos
  }
});

// Exportamos el modelo 'Mensaje', que representará la colección 'mensajes' en la base de datos
module.exports = model('Mensaje', mensajeSchema);

