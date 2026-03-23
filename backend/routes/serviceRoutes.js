const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controller/serviceController');

// GET all services
router.get('/', getAllServices);

// GET single service
router.get('/:id', getServiceById);

// POST create service
router.post('/', createService);

// PUT update service
router.put('/:id', updateService);

// DELETE service
router.delete('/:id', deleteService);

module.exports = router;