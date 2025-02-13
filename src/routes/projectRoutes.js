const express = require('express');
const { getProjectsController } = require('../controllers/projectController'); // Asegúrate de que este nombre coincide

const router = express.Router();

router.get('/projects', getProjectsController); // Asegúrate de usar el nombre correcto

module.exports = router;

