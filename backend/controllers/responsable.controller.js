const Responsable = require('../models/responsable.model');

module.exports = {

    create: async (req, res) => {
        try {
            const result = await Responsable.create(req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const responsables = await Responsable.findAll();
            res.status(200).json(responsables);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getEmailByNom: async (req, res) => {
        try {
            const email = await Responsable.findEmailByName(req.params.nom);
            res.status(200).json(email);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { nom } = req.params;  // Destructure for clarity
        const updates = req.body;

        // Input validation
        if (!nom) {
            return res.status(400).json({ error: 'Nom parameter is required' });
        }

        if (!updates || (!updates.nom && !updates.email)) {
            return res.status(400).json({
                error: 'At least one update field (nouvNom or nouvEmail) is required'
            });
        }

        try {
            const result = await Responsable.update(nom, updates);

            if (!result) {
                return res.status(404).json({ error: 'Responsable not found' });
            }

            // Success response
            res.status(200).json({
                success: true,
                message: 'Responsable updated successfully',
                data: result
            });

        } catch (error) {
            console.error('Update error:', error);

            // Differentiate between server errors and validation errors
            const statusCode = error.message.includes('Missing') ? 400 : 500;

            res.status(statusCode).json({
                success: false,
                error: error.message || 'Failed to update responsable'
            });
        }
    },

    delete: async (req, res) => {
        const id = req.params.nom;
        try {
            const result = await Responsable.delete(id);
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }

};