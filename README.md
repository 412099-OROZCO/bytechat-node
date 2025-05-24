¡Con gusto, Carlos! Aquí tenés un `README.md` profesional y claro para tu proyecto **ByteChat-G8** ya migrado a Node.js:

---

### 📄 `README.md`

````markdown
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

## 🧑‍💻 Cómo usarlo localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bytechat-node.git
cd bytechat-node
````

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Reemplaza el valor de `MONGO_URI` con tu URI de conexión a MongoDB Atlas.

### 4. Ejecutar la app localmente

```bash
npm run dev
```

Accede desde tu navegador a:

```
http://localhost:8080
```

---

## 🌐 Deploy en Render

1. Subí el proyecto a GitHub
2. Entrá a [https://render.com](https://render.com)
3. Crea un nuevo **Web Service**
4. En “Environment” configurá la variable `MONGO_URI`
5. Render detectará `render.yaml` y hará el deploy automático

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

## 👨‍🏫 Créditos

Proyecto desarrollado por **Grupo - 8**
Trabajo académico para la materia **Bases de Datos II - UTN**


