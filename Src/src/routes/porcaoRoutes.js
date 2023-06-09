const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const PorcaoController = require("../controllers/porcaoController");

router.post("/", upload.single("file"), PorcaoController.create);
router.get("/", PorcaoController.findAll);
router.delete("/:id", PorcaoController.remove);

module.exports = router;
