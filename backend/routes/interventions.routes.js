
const express = require('express');
const router = express.Router();
const interventionsController = require('../controllers/interventions.controller');

// Routes CRUD de base
router.post('/', interventionsController.createIntervention);
router.get('/', interventionsController.getAllInterventions);
router.put('/:id', interventionsController.updateIntervention);
router.delete('/:id', interventionsController.deleteIntervention);
router.get('/:id', interventionsController.getInterventionById);

//envoi d'email
router.post('/email/send', interventionsController.sendEmail);

//par respo
router.get('/responsable/all', interventionsController.getAllResponsables);
router.get('/responsable/:respo', interventionsController.getInterventionByRespo);

//par statut
router.get('/statut/all', interventionsController.getAllStatus);
router.get('/statut/:statut', interventionsController.getInterventionByStatut);

//par se
router.get('/se/:designation', interventionsController.getInterventionBySE);

//par operation
router.get('/operation/:operation', interventionsController.getInterventionByOperationType);

// Routes spécifiques
router.get('/operation/:operationId', interventionsController.getInterventionsByOperation);
router.patch('/:id/statut', interventionsController.updateInterventionStatus);

// Routes statistiques/KPI
router.get('/stats/statut', interventionsController.getInterventionStats);
router.get('/stats/timeline', interventionsController.getInterventionsTimeline);
router.get('/stats/temps-moyen', interventionsController.getAverageCompletionTime);
router.get('/stats/charge-responsables', interventionsController.getResponsibleWorkload);
router.get('/stats/repartition-types', interventionsController.getInterventionTypesDistribution);

module.exports = router;