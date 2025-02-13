const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, lineController.createLineController);
router.get("/movementId", authMiddleware, lineController.getLinesController);
router.put("/:id", authMiddleware, lineController.updateLineController);
router.delete("/", authMiddleware, lineController.deleteLinesController);
// 🔒 Protegido con autenticación

module.exports = router;
