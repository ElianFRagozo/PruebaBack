const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Eliminamos opciones obsoletas
        console.log('✅ MongoDB conectado');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
