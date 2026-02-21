const express = require('express');
const router = express.Router();

const { getEquipments, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');

router.get('/', getEquipments);
router.post('/', createEquipment);
router.put('/:id', updateEquipment);
router.delete('/:id', deleteEquipment);
module.exports = router;