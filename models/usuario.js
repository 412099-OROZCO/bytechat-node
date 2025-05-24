// Importamos Schema y model desde Mongoose:
// - Schema: nos permite definir la estructura del documento
// - model: permite crear el modelo para interactuar con la colección de MongoDB
const { Schema, model } = require('mongoose');

// Definimos el esquema para los usuarios conectados
const usuarioSchema = new Schema({
  // Nickname del usuario (se usa como identificador visible en el frontend)
  nickname: String,

  // Fecha de última conexión del usuario (usada para control de sesión activa)
  // Esta propiedad incluye TTL (Time To Live), lo que hace que el documento se elimine automáticamente después de 60 segundos
  fechaConexion: {
    type: Date,
    default: Date.now, // Se asigna automáticamente al momento de crear o actualizar
    expires: 60         // El documento se elimina después de 60 segundos sin actividad
  }
});

// Exportamos el modelo 'Usuario', que usará la colección 'usuarios' en la base de datos
module.exports = model('Usuario', usuarioSchema);

