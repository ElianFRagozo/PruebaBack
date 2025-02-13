const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/create', authMiddleware, movementController.createMovementController);
router.get('/:ProjectID',authMiddleware, movementController.getMovementsController);
router.delete('/', authMiddleware, movementController.deleteMovementsController)

module.exports = router;

