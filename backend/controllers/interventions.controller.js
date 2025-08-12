const Intervention = require('../models/interventions.model');
const nodemailer = require('nodemailer');

module.exports = {
    // CRUD Basique
    async createIntervention(req, res) {
        try {
            const { operation_id, date_planifiee, statut, type_intervention, responsable, notes } = req.body;

            // Validation des champs obligatoires
            if (!operation_id || !date_planifiee || !statut) {
                return res.status(400).json({
                    error: "Les champs operation_id, date_planifiee et statut sont obligatoires"
                });
            }

            // Appel à la méthode du modèle
            const result = await Intervention.create({
                operation_id,
                date_planifiee,
                statut,
                type_intervention,
                responsable,
                notes
            });

            res.status(201).json({
                message: "Intervention créée avec succès",
                details: result
            });
        } catch (err) {
            console.error("Erreur création intervention:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    //send email
    async sendEmail(req, res) {
        const { email, message } = req.body;

        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'kentari.youssef@student.emi.ac.ma', 
                pass: 'Otaku2003'          
            }
        });

        let mailOptions = {
            from: 'kentari.youssef@student.emi.ac.ma',
            to: `${email}`,
            subject: `Affectation d'une revision`,
            html: `Bonjour,\n ${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).send({ message: 'Email envoyé !' });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    async getAllInterventions(req, res) {
        try {
            // Utilisation de la méthode du modèle
            const interventions = await Intervention.findAll();
            res.json(interventions);
        } catch (err) {
            console.error("Erreur récupération interventions:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getAllStatus(req, res) {
        try {
            // Utilisation de la méthode du modèle
            const status = await Intervention.findAllStatus();
            res.json(status);
        } catch (err) {
            console.error("Erreur récupération status:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getAllResponsables(req, res) {
        try {
            // Utilisation de la méthode du modèle
            const responsables = await Intervention.findAllResponsables();
            res.json(responsables);
        } catch (err) {
            console.error("Erreur récupération respo:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionById(req, res) {
        try {
            const intervention = await Intervention.findById(req.params.id);

            if (!intervention) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json(intervention);
        } catch (err) {
            console.error(`Erreur récupération intervention ${req.params.id}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionBySE(req, res) {
        try {
            const interventions = await Intervention.findBySousEnsemble(req.params.designation);

            if (!interventions) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json(interventions);
        } catch (err) {
            console.error(`Erreur récupération intervention ${req.params.sous_ensemble_id}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionByStatut(req, res) {
        try {
            const interventions = await Intervention.findByStatus(req.params.statut);

            if (!interventions) {
                return res.status(404).json({
                    error: "Interventions non trouvée"
                });
            }

            res.json(interventions);
        } catch (err) {
            console.error(`Erreur récupération intervention ${req.params.statut}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionByOperationType(req, res) {
        try {
            const interventions = await Intervention.findByOperation(req.params.operation);

            if (!interventions) {
                return res.status(404).json({
                    error: "Interventions non trouvée"
                });
            }

            res.json(interventions);
        } catch (err) {
            console.error(`Erreur récupération intervention ${req.params.statut}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionByRespo(req, res) {
        try {
            const interventions = await Intervention.findByResponsable(req.params.respo);

            if (!interventions) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json(interventions);
        } catch (err) {
            console.error(`Erreur récupération intervention ${req.params.respo}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionsByOperation(req, res) {
        try {
            const interventions = await Intervention.findByOperationId(req.params.operationId);

            if (!interventions || interventions.length === 0) {
                return res.status(404).json({
                    error: "Aucune intervention trouvée pour cette opération"
                });
            }

            res.json(interventions);
        } catch (err) {
            console.error(`Erreur récupération interventions opération ${req.params.operationId}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async updateIntervention(req, res) {
        try {
            const result = await Intervention.update(req.params.id, req.body);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json({
                message: "Intervention mise à jour avec succès",
                details: result
            });
        } catch (err) {
            console.error(`Erreur mise à jour intervention ${req.params.id}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async updateInterventionStatus(req, res) {
        try {
            if (!req.body.statut) {
                return res.status(400).json({
                    error: "Le champ statut est obligatoire"
                });
            }

            const result = await Intervention.updateStatut(req.params.id, req.body.statut);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json({
                message: "Statut mis à jour avec succès",
                newStatus: req.body.statut
            });
        } catch (err) {
            console.error(`Erreur mise à jour statut ${req.params.id}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async deleteIntervention(req, res) {
        try {
            const result = await Intervention.delete(req.params.id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Intervention non trouvée"
                });
            }

            res.json({
                message: "Intervention supprimée avec succès",
                details: result
            });
        } catch (err) {
            console.error(`Erreur suppression intervention ${req.params.id}:`, err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    // Méthodes statistiques
    async getInterventionStats(req, res) {
        try {
            const stats = await Intervention.getStatsByStatus();
            res.json(stats);
        } catch (err) {
            console.error("Erreur récupération stats:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionsTimeline(req, res) {
        try {
            const { period = 'month' } = req.query;
            const timeline = await Intervention.getByTimePeriod(period);
            res.json(timeline);
        } catch (err) {
            console.error("Erreur récupération timeline:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getAverageCompletionTime(req, res) {
        try {
            const avgTime = await Intervention.getAverageCompletionTime();
            res.json(avgTime);
        } catch (err) {
            console.error("Erreur calcul temps moyen:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getResponsibleWorkload(req, res) {
        try {
            const workload = await Intervention.getResponsibleWorkload();
            res.json(workload);
        } catch (err) {
            console.error("Erreur récupération charge travail:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    },

    async getInterventionTypesDistribution(req, res) {
        try {
            const distribution = await Intervention.getTypesDistribution();
            res.json(distribution);
        } catch (err) {
            console.error("Erreur récupération distribution types:", err);
            res.status(500).json({
                error: "Erreur serveur",
                details: err.message
            });
        }
    }
};