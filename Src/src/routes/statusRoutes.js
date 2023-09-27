const express = require('express');
const router = express.Router();
const Status = require('../models/status');


router.get('/', async (req, res) => {
  try {
    const status = await Status.find();
    res.json({ status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const status = new Status({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newStatus = await status.save();
    res.status(201).json({ message: 'Status adicionado com sucesso!', status: newStatus });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Rota para atualizar um status
// router.put('/:id', async (req, res) => {
//   try {
//     const status = await Status.findById(req.params.id);
//     if (!status) throw new Error('Status não encontrado.');

//     status.name = req.body.name || status.name;
//     status.description = req.body.description || status.description;

//     const updatedStatus = await status.save();
//     res.json({ message: 'Status atualizado com sucesso!', status: updatedStatus });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Rota para deletar um status
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedStatus = await Status.findByIdAndRemove(req.params.id);
//     if (!deletedStatus) throw new Error('Status não encontrado.');
    
//     res.json({ message: 'Status deletado com sucesso!', status: deletedStatus });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
