const express = require('express');
const { getProjectsController } = require('../controllers/projectController');

const router = express.Router();

router.get('/projects', getProjectsController); 

module.exports = router;

