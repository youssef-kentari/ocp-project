const express = require('express');
const router = express.Router();
const enginsController = require('../controllers/engins.controller');

// Retrieve all Engins
router.get('/', enginsController.getAll);

// Retrieve a single Engin with id
router.get('/:id', enginsController.getById);

// Create a new Engin
router.post('/', enginsController.create);

// Update an Engin with id
router.put('/:id', enginsController.update);

// Delete an Engin with id
router.delete('/:id', enginsController.delete);

module.exports = router;