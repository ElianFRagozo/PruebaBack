const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

router.post('/create', movementController.createMovementController);

module.exports = router;

