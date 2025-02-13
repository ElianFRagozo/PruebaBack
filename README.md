# Proyecto Backend con Express y MongoDB

Este proyecto es una API desarrollada con **Node.js**, **Express**, y **MongoDB**. Permite gestionar líneas, movimientos y proyectos, con autenticación de usuarios mediante JWT.

## 🚀 Tecnologías Utilizadas
- **Node.js** y **Express** para el backend
- **MongoDB** y **Mongoose** para la base de datos
- **Jest** y **Supertest** para pruebas automatizadas

## 📌 Características Principales
- **Autenticación** con JWT.
- **Gestión de líneas, movimientos y proyectos**.
- **Propagación de cambios** en valores clave a través de las entidades relacionadas.
- **Pruebas automatizadas** con Jest y Supertest.

## 📦 Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/ElianFRagozo/PruebaBack.git
   cd tu-repositorio
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar las variables de entorno en `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/tu_base_de_datos
   JWT_SECRET=tu_secreto
   ```
4. Iniciar la aplicación:
   ```sh
   npm start
   ```

## 🛠️ Pruebas
Para ejecutar las pruebas:
```sh
npm test
```
Las pruebas incluyen:
- **Autenticación**: Verifica la obtención de tokens.
- **Actualización de valores**: Confirma la propagación de cambios en las líneas, movimientos y proyectos.
- **Errores esperados**: Manejo de autenticación y entidades inexistentes.

## 📂 Estructura del Proyecto
```
📦 src
 ┣ 📂 config        # Configuración de la base de datos
 ┣ 📂 models        # Modelos de Mongoose
 ┣ 📂 routes        # Rutas de la API
 ┣ 📂 controllers   # Controladores de la API
 ┣ 📂 middleware    # Middlewares para autenticación
 ┣ 📂 tests         # Pruebas con Jest y Supertest
 ┗ app.js          # Configuración principal de Express
```

## 📜 Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).

