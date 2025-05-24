# ByteChat-G8

ByteChat-G8 es una aplicación de chat en tiempo real construida con **Node.js**, **MongoDB Atlas** y **HTML/CSS/JavaScript**. Permite a cualquier usuario ingresar con un apodo, enviar mensajes de texto o imágenes, ver mensajes anteriores y visualizar la lista de usuarios actualmente conectados.

---

## 🌐 Tecnologías utilizadas

- Node.js + Express.js
- MongoDB Atlas (con TTL Index)
- Mongoose (ODM para MongoDB)
- HTML5, CSS3, JavaScript (modo oscuro)
- Bootstrap 5
- Render.com (para deploy del backend)
- GitHub (repositorio del código fuente)

---

## 🚀 Funcionalidades

- 📩 Enviar mensajes con texto e imagen (via URL)
- ⏱️ Registro automático de hora de envío (servidor)
- 🧼 Expiración automática de mensajes tras 24h (TTL)
- 👤 Nickname sin login
- 👥 Lista de usuarios conectados en tiempo real
- 🔄 Expiración de usuarios tras 60s sin actividad

---

## 🗃️ Estructura del proyecto

```
bytechat-node/
├── public/              # HTML, CSS, JS del cliente
├── models/              # Mongoose models (Mensaje, Usuario)
├── routes/              # Rutas Express para mensajes y usuarios
├── index.js             # Punto de entrada del backend
├── package.json
├── .env.example
├── .gitignore
└── render.yaml
```

---

## 🧪 Notas adicionales

* Los mensajes se eliminan automáticamente tras 24h por TTL de MongoDB
* Los usuarios conectados desaparecen después de 60s de inactividad
* El frontend usa solo HTML, Bootstrap y JS sin frameworks


---
## 🧠 Estructura y arquitectura del proyecto

El proyecto está organizado siguiendo una estructura modular que separa responsabilidades para facilitar el mantenimiento, escalabilidad y claridad del código.

---

### 📁 `models/` – **Modelos de datos con Mongoose**

Contiene los **esquemas (schemas)** que definen la estructura de los documentos en MongoDB usando **Mongoose**, una librería ODM (Object Data Modeling) que permite trabajar con MongoDB desde Node.js de forma orientada a objetos.

#### Archivos:

* `mensaje.js`: define la estructura de un mensaje de chat. Incluye:

    * `usuario`: nombre del remitente
    * `contenido`: texto del mensaje
    * `imagenUrl`: URL opcional de imagen
    * `fechaHora`: hora legible generada por el backend
    * `fechaCreacion`: fecha en que se guardó, con un **TTL** de 24 horas (Mongo elimina automáticamente el mensaje tras ese tiempo)

* `usuario.js`: define la estructura de los usuarios conectados.

    * `nickname`: identificador del usuario
    * `fechaConexion`: última vez que se “activó” (TTL de 60 segundos)
    * Si el usuario no se actualiza, desaparece automáticamente de la lista (Mongo lo elimina)

---

### 📁 `routes/` – **Rutas de la API**

Contiene las rutas HTTP agrupadas por funcionalidad. Cada archivo se encarga de manejar las operaciones para un recurso específico (`mensajes` o `usuarios`).

#### Archivos:

* `mensajes.js`: maneja las rutas:

    * `GET /api/mensajes`: devuelve todos los mensajes
    * `POST /api/mensajes`: guarda un nuevo mensaje con hora y TTL

* `usuarios.js`: maneja las rutas:

    * `GET /api/usuarios`: devuelve la lista de nicknames activos
    * `POST /api/usuarios`: actualiza o registra un usuario, renovando su “actividad” para que no expire

---

### 📁 `public/` – **Frontend estático**

Esta carpeta contiene el HTML, CSS y JavaScript que se sirve al cliente:

* `index.html`: estructura principal de la interfaz (modal de apodo, lista de usuarios, chat)
* `script.js`: lógica del cliente (fetch para enviar y recibir mensajes, registrar usuarios, actualizar cada 2-5 segundos)
* `style.css`: estilos personalizados (modo oscuro con Bootstrap)

---

### 📄 `index.js` – **Punto de entrada del backend**

* Configura el servidor Express
* Conecta a MongoDB Atlas mediante Mongoose
* Carga los middlewares necesarios (`CORS`, `JSON`, `archivos estáticos`)
* Usa las rutas definidas en `routes/`
* Levanta el servidor en el puerto 8080 o el que Render asigne

---

### 📄 `.env` y `.env.example` – **Variables de entorno**

Se utiliza un archivo `.env` para almacenar la cadena de conexión segura a MongoDB (`MONGO_URI`), manteniendo los datos sensibles fuera del código fuente. `.env.example` sirve de plantilla para que otros desarrolladores lo configuren fácilmente.

---

### 📄 `render.yaml` – **Configuración para deploy en Render**

Define cómo Render debe construir y ejecutar la app:

* `buildCommand: npm install`
* `startCommand: node index.js`
* Variables de entorno (`MONGO_URI`) definidas en el panel web

---

### 📄 `package.json` – **Gestión de dependencias**

Incluye los scripts para ejecutar la app localmente y las dependencias necesarias:

* `express`: servidor HTTP
* `mongoose`: acceso a MongoDB
* `dotenv`: manejo de `.env`
* `cors`: permite solicitudes desde otros orígenes (frontend)
* `nodemon` (dev): recarga automática del servidor en desarrollo

---

### 🧩 ¿Por qué esta estructura?

* 📦 **Separación de responsabilidades**: cada archivo tiene una función clara.
* 📚 **Escalabilidad**: es fácil agregar más rutas o modelos sin romper lo existente.
* 🧼 **Limpieza y mantenibilidad**: los modelos están aislados, lo que hace el código más legible.
* 🛡️ **Seguridad**: `.env` evita exponer claves directamente.
* ☁️ **Facilidad de deploy**: con `render.yaml`, se puede hacer deploy con 1 click en Render.


---

## 🧩 ¿Por qué usar **Mongoose** en un proyecto Node.js con MongoDB?

Mongoose es una **librería ODM (Object Data Modeling)** para MongoDB y Node.js, que permite trabajar con documentos de base de datos como si fueran objetos JavaScript normales, pero con validación, estructura y lógica integrada.

---

### ✅ Ventajas de usar Mongoose

#### 1. **Definición clara de esquemas (schemas)**

Con Mongoose, podés **definir cómo luce un documento** en tu colección usando `Schema`, como hiciste con `mensajeSchema` o `usuarioSchema`.

> Esto ayuda a evitar errores y mantener consistencia en la base de datos.

---

#### 2. **Validación automática de datos**

Podés agregar validaciones como `required`, `minLength`, `type`, etc., directamente en el esquema. Así evitás guardar datos incompletos o incorrectos.

---

#### 3. **Soporte para TTL (time to live)**

Mongoose permite configurar campos con expiración automática, como hicimos con:

```js
fechaCreacion: {
  type: Date,
  default: Date.now,
  expires: 86400 // se elimina después de 24h
}
```

MongoDB elimina esos documentos sin que tengas que escribir lógica adicional. ¡Es perfecto para mensajes temporales o usuarios activos!

---

#### 4. **Interfaz simple y elegante**

Las operaciones CRUD son simples:

```js
const nuevo = new Mensaje({ ... });
await nuevo.save();

const mensajes = await Mensaje.find();
```

Esto es **más legible y organizado** que usar directamente el driver nativo de MongoDB (`mongodb`).

---

#### 5. **Middleware y métodos personalizados**

Podés usar hooks (`pre`, `post`), validaciones personalizadas y métodos para extender el comportamiento de tus modelos.

---

#### 6. **Facilidad de testing y escalabilidad**

Gracias a la estructura basada en modelos, es muy fácil hacer testing unitario o integrar más funcionalidades sin romper lo anterior.

---

## 🧠 En resumen

> Usar Mongoose es como tener una “capa de organización” sobre MongoDB.

Te permite escribir código más limpio, seguro y mantenible — especialmente útil en **proyectos académicos, profesionales o colaborativos**.


## 👨‍🏫 Créditos

Proyecto desarrollado por **Grupo - 8**
Trabajo académico para la materia **Bases de Datos II - UTN**

¡Claro, Carlos! Aquí te muestro el **flujo completo de ejecución** del proyecto `ByteChat-G8` desde que un usuario abre la página hasta que todo funciona en el backend. Vamos paso a paso, visual y claro:

---


## 🔁 Resumen visual del flujo

```
[ index.html ] ⇄ script.js
       ↓
[ Express (index.js) ]
       ↓
/api/usuarios     → routes/usuarios.js     → MongoDB (usuarios)
/api/mensajes     → routes/mensajes.js     → MongoDB (mensajes)
```


---

## 🧩 Estructura e interacciones entre carpetas

```
bytechat-node/
├── public/       → Frontend estático (HTML, CSS, JS)
├── routes/       → Lógica de las rutas (API)
├── models/       → Estructura de los datos (MongoDB)
├── index.js      → Servidor principal
├── .env          → Variables de entorno
```

---

### 🔁 Flujo de interacción entre carpetas

---

### 1. 🧭 `index.js` es el **centro de control**

* Importa **rutas** desde `routes/`
* Conecta con MongoDB usando los **modelos** de `models/`
* Sirve los archivos del **frontend** desde `public/`

```js
const mensajesRoutes = require('./routes/mensajes');
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/mensajes', mensajesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use(express.static('public')); // Sirve HTML, CSS, JS
```

---

### 2. 📁 `routes/` contiene **lógica de la API**

Cada archivo en `routes/` define endpoints para un tipo de recurso (usuarios o mensajes).
👉 Se usan en `index.js` y manejan peticiones HTTP:

```js
// routes/mensajes.js
const Mensaje = require('../models/mensaje'); // ← Importa un modelo
```

➡️ **Importa modelos** de `models/` para guardar o leer de MongoDB
➡️ **Recibe peticiones** desde el frontend

---

### 3. 📁 `models/` define **la forma de los datos**

* `mensaje.js`: cómo se guarda un mensaje
* `usuario.js`: cómo se guarda un usuario

Usado en los archivos de `routes/`:

```js
const Usuario = require('../models/usuario');
```

👉 Los modelos son responsables de guardar, buscar y actualizar documentos en MongoDB.

---

### 4. 📁 `public/` contiene el **frontend**

Contiene:

* `index.html` → Interfaz del chat
* `script.js` → Hace `fetch()` a las rutas (`/api/usuarios`, `/api/mensajes`)
* `style.css` → Estilos visuales

No importa rutas ni modelos, pero **consume la API**.

---

### 🎯 Resumen visual del flujo de carpetas

```
Frontend (public/)
    │
    ▼
script.js        →   fetch() a /api/usuarios y /api/mensajes
    │
    ▼
index.js         →   app.use('/api/usuarios', usuariosRoutes)
                          │
                          ▼
routes/usuarios.js  →   requiere models/usuario.js
                          │
                          ▼
models/usuario.js   →   Accede a MongoDB Atlas
```

---

## 🧠 En resumen

| Carpeta    | Rol principal                        | Quién la usa                            |
| ---------- | ------------------------------------ | --------------------------------------- |
| `index.js` | Punto de entrada / centralizador     | Usa `routes/`, `models/`, `public/`     |
| `routes/`  | Lógica de la API                     | Usa `models/`, llamada desde `index.js` |
| `models/`  | Esquemas de datos para MongoDB       | Usado por `routes/`                     |
| `public/`  | Frontend estático que consume la API | Usado por el navegador                  |

---

¿Querés que esto lo convierta en una sección para tu README o como infografía visual (tipo diagrama de flujo)?

