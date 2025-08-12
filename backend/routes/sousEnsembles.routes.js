
const express = require('express');
const router = express.Router();
const sousEnsemblesController = require('../controllers/sousEnsembles.controller');

// Routes CRUD de base
router.get('/', sousEnsemblesController.getAll);
router.get('/:id', sousEnsemblesController.getById);
router.get('/engin/:enginId', sousEnsemblesController.getByEnginId);
router.get('/find/:designation/:enginId', sousEnsemblesController.getByDesignationAndEnginId)
router.post('/', sousEnsemblesController.create);
router.put('/:id', sousEnsemblesController.update);
router.delete('/:id', sousEnsemblesController.delete);

//all designations
router.get('/designation/all', sousEnsemblesController.getAllDesignations);

//planing
router.get('/planing/report', sousEnsemblesController.genererPlaning);

// Nouvelles routes pour les KPI
router.get('/:id/disponibility-rate', sousEnsemblesController.getDisponibilityRate);
router.get('/:id/revision-occupation-rate', sousEnsemblesController.getRevisionOccupationRate);
router.get('/:id/total-maintenance-cost', sousEnsemblesController.getTotalMaintenanceCost);
router.get('/:id/performance-ratio', sousEnsemblesController.getPerformanceRatio);
router.get('/:id/time-to-next-revision', sousEnsemblesController.getTimeToNextRevision);
router.get('/:id/safety-stock-need', sousEnsemblesController.getSafetyStockNeed);
router.get('/:id/roi', sousEnsemblesController.getROI);

module.exports = router;