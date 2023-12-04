const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.get('/:session_id', carrinhoController.getCarrinhoBySessionId);

router.post('/', carrinhoController.addToCarrinho);
router.delete('/', carrinhoController.deleteCarrinho); 
router.delete('/:Id', carrinhoController.deleteCarrinhoItem); 
router.get('/', carrinhoController.getCarrinho);
router.put('/:carrinhoId/opcao-entrega', async (req, res) => {
    const { carrinhoId } = req.params;
    const { opcaoEntrega } = req.body;
  
    const result = await carrinhoController.updateOpcaoEntrega(carrinhoId, opcaoEntrega);
  
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
  
    return res.json({ message: result.message });
});

router.put('/:carrinhoId/:itemId', async (req, res) => {
    try {
      const { carrinhoId, itemId } = req.params;
      const { quantity } = req.body;
  
      const carrinho = await Carrinho.findById(carrinhoId);
  
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }
  
      const carrinhoItem = carrinho.carrinho.id(itemId);
  
      if (!carrinhoItem) {
        return res.status(404).json({ error: 'Item do carrinho não encontrado.' });
      }
  
      carrinhoItem.quantity = quantity;
  
      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco * item.quantity,
        0
      );
  
      await carrinho.save();
  
      return res.json({ message: 'Quantidade do item atualizada com sucesso.', precoTotal: carrinho.precoTotal });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar a quantidade do item no carrinho.' });
    }
  });
module.exports = router;
