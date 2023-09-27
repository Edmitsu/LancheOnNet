const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');


router.post('/', carrinhoController.addToCarrinho);


router.delete('/:carrinhoId', carrinhoController.removeFromCarrinho);
router.get('/', carrinhoController.getCarrinho);

module.exports = router;






