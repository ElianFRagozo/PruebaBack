const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");
const authMiddleware = require("../middlewares/authMiddleware"); // 🔹 Importar middleware de autenticación

router.post("/create", authMiddleware, lineController.createLineController);
router.put("/:id", authMiddleware, lineController.updateLineController); // 🔒 Protegido con autenticación

module.exports = router;
