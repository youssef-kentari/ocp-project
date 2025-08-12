
const express = require('express');
const router = express.Router();
const operationsController = require('../controllers/operations.controller');

// Routes CRUD de base
router.get('/', operationsController.getAll);
router.get('/:id', operationsController.getById);
router.get('/type/all', operationsController.getAllOperationsType);
router.get('/sous-ensemble/:sousEnsembleId', operationsController.getBySousEnsembleId);
router.get('/se-by-operation/:op_id', operationsController.getSEbyOperation);
router.get('/description/:description', operationsController.getIdByDescription);
router.get('/descriptions/all', operationsController.getAllDescription);
router.post('/', operationsController.create);
router.put('/:id', operationsController.update);
router.delete('/:id', operationsController.delete);

module.exports = router;