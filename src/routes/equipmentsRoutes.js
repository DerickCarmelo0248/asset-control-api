const express = require('express')

const router = express.Router()

const {
  getEquipments,
  createEquipment,
  deleteEquipment
} = require('../controllers/equipmentController')

router.get('/', getEquipments)

router.post('/', createEquipment)

router.delete('/:id', deleteEquipment)

module.exports = router