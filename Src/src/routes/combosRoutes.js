const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const CombosController = require("../controllers/combosComtroller");

router.post("/", upload.single("file"), CombosController.create);
router.get("/", CombosController.findAll);
router.delete("/:id", CombosController.remove);

module.exports = router;
