const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const BebidaController = require("../controllers/bebidasController"); 

router.post("/", upload.single("file"), BebidaController.create);
router.get("/", BebidaController.findAll);
router.delete("/:id", BebidaController.remove);

module.exports = router;
