const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const movementRoutes = require('./routes/movementRoutes');
const lineRoutes = require('./routes/lineRoutes');

const http = require('http');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/lines', lineRoutes);

// Solo inicia el servidor si no está en modo de prueba
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}

module.exports = app; // Exportamos `app` para los tests
