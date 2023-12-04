const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const PorcoesController = require("../controllers/porcaoController");

router.post("/", upload.single("file"), PorcoesController.create);
router.get("/", PorcoesController.findAll);
router.put("/:id", upload.single("file"), PorcoesController.update);
router.delete("/:id", PorcoesController.remove);

module.exports = router;