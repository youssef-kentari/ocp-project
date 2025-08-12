const Operation = require('../models/operations.model');

module.exports = {
    // Récupérer toutes les opérations
    getAll: async (req, res) => {
        try {
            const operations = await Operation.findAll();
            res.json(operations);
        } catch (err) {
            console.error('Error getting operations:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération des opérations"
            });
        }
    },

    getAllOperationsType: async (req, res) => {
        try {
            const operations = await Operation.findAllOperationsType();
            res.json(operations);
        } catch (err) {
            console.error('Error getting operations:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération des opérations"
            });
        }
    },

    getAllDescription: async (req, res) => {
        try {
            const operations = await Operation.findAllDescription();
            res.json(operations);
        } catch (err) {
            console.error('Error getting operations:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération des opérations"
            });
        }
    },

    // Récupérer une opération par ID
    getById: async (req, res) => {
        try {
            const operation = await Operation.findById(req.params.id);
            if (!operation) {
                return res.status(404).json({
                    message: "Opération non trouvée"
                });
            }
            res.json(operation);
        } catch (err) {
            console.error('Error getting operation:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération de l'opération"
            });
        }
    },


    getSEbyOperation: async (req, res) => {
        try {
            const se = await Operation.findSEbyOperation(req.params.op_id);
            if (!se) {
                return res.status(404).json({
                    message: "Opération non trouvée"
                });
            }
            res.json(se);
        } catch (err) {
            console.error('Error getting operation:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération de l'opération"
            });
        }
    },

    getIdByDescription: async (req, res) => {
        try {
            const id = await Operation.findIdByDescription(req.params.description);
            if (!id) {
                return res.status(404).json({
                    message: "Opération non trouvée"
                });
            }
            res.json(id);
        } catch (err) {
            console.error('Error getting operation:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération de l'opération"
            });
        }
    },

    // Récupérer les opérations par sous-ensemble
    getBySousEnsembleId: async (req, res) => {
        try {
            const operations = await Operation.findBySousEnsembleId(req.params.sousEnsembleId);
            res.json(operations);
        } catch (err) {
            console.error('Error getting operations by sous-ensemble:', err);
            res.status(500).json({
                message: "Erreur lors de la récupération des opérations"
            });
        }
    },

    // Créer une nouvelle opération
    create: async (req, res) => {
        try {
            const requiredFields = ['sous_ensemble_id', 'type_operation'];
            const missingFields = requiredFields.filter(field => !req.body[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: `Champs manquants: ${missingFields.join(', ')}`
                });
            }

            const operationData = {
                sous_ensemble_id: req.body.sous_ensemble_id,
                type_operation: req.body.type_operation,
                description: req.body.description || null,
                atelier: req.body.atelier || null
            };

            const result = await Operation.create(operationData);
            res.status(201).json(result);
        } catch (err) {
            console.error('Error creating operation:', err);
            res.status(500).json({
                message: "Erreur lors de la création de l'opération"
            });
        }
    },

    // Mettre à jour une opération
    update: async (req, res) => {
        try {
            const operationData = {
                sous_ensemble_id: req.body.sous_ensemble_id,
                type_operation: req.body.type_operation,
                description: req.body.description,
                atelier: req.body.atelier
            };

            const result = await Operation.update(req.params.id, operationData);
            res.json(result);
        } catch (err) {
            console.error('Error updating operation:', err);
            if (err.message === 'Operation not found') {
                return res.status(404).json({
                    message: "Opération non trouvée"
                });
            }
            res.status(500).json({
                message: "Erreur lors de la mise à jour de l'opération"
            });
        }
    },

    // Supprimer une opération
    delete: async (req, res) => {
        try {
            const result = await Operation.delete(req.params.id);
            res.json({
                message: "Opération supprimée avec succès"
            });
        } catch (err) {
            console.error('Error deleting operation:', err);
            if (err.message === 'Operation not found') {
                return res.status(404).json({
                    message: "Opération non trouvée"
                });
            }
            res.status(500).json({
                message: "Erreur lors de la suppression de l'opération"
            });
        }
    }

};