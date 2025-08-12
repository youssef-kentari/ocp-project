// models/sousEnsemble.model.js
const pool = require('../config/db.config');

class SousEnsemble {
    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM sous_ensemble');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findAllDesignation() {
        try {
            const [designations] = await pool.query('SELECT DISTINCT designation FROM sous_ensemble');
            return designations;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM sous_ensemble WHERE sous_ensemble_id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByDesignationAndEnginId(designation, enginId) {
        try {
            const [rows] = await pool.query('SELECT * FROM sous_ensemble WHERE designation = ? AND engin_id = ?', [designation, enginId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByEnginId(enginId) {
        try {
            const [rows] = await pool.query('SELECT * FROM sous_ensemble WHERE engin_id = ?', [enginId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(sousEnsembleData) {
        try {
            const query = `
                INSERT INTO sous_ensemble 
                (engin_id, designation, type_sous_ensemble, quantite_installee,
                 sous_ensemble_relais_disponible, sous_ensemble_en_attente_revision,
                 sous_ensemble_encours_revision, corps_sous_ensembles_disponibles, prix_sous_ensemble_neuf_DH,
                 duree_revision_jours, cout_revision_MAD, heures_marche_actuel, heures_marche_cible, heures_marche_annee,
                 nombre_revisions_avant_reforme, fournisseur, delai_livraison_apres_commande_jours,
                 mode_gestion_actuel, besoin_global_annuel)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [result] = await pool.query(query, [
                sousEnsembleData.engin_id,
                sousEnsembleData.designation,
                sousEnsembleData.type_sous_ensemble,
                sousEnsembleData.quantite_installee,
                sousEnsembleData.sous_ensemble_relais_disponible,
                sousEnsembleData.sous_ensemble_en_attente_revision,
                sousEnsembleData.sous_ensemble_encours_revision,
                sousEnsembleData.corps_sous_ensembles_disponibles,
                sousEnsembleData.prix_sous_ensemble_neuf_DH,
                sousEnsembleData.duree_revision_jours,
                sousEnsembleData.cout_revision_MAD,
                sousEnsembleData.heures_marche_actuel,
                sousEnsembleData.heures_marche_cible,
                sousEnsembleData.heures_marche_annee,
                sousEnsembleData.nombre_revisions_avant_reforme,
                sousEnsembleData.fournisseur,
                sousEnsembleData.delai_livraison_apres_commande_jours,
                sousEnsembleData.mode_gestion_actuel,
                sousEnsembleData.besoin_global_annuel
            ]);

            return { id: result.insertId, ...sousEnsembleData };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, sousEnsembleData) {
        try {
            const query = `
                UPDATE sous_ensemble
                SET 
                    engin_id=?,
            designation=?,
            type_sous_ensemble=? ,
            quantite_installee=? ,
            sous_ensemble_relais_disponible=? ,
            sous_ensemble_en_attente_revision=? ,
            sous_ensemble_encours_revision=? ,
            corps_sous_ensembles_disponibles=? ,
            prix_sous_ensemble_neuf_DH=? ,
            duree_revision_jours=? ,
            cout_revision_MAD=? ,
            heures_marche_actuel=? ,
            heures_marche_cible=? ,
            heures_marche_annee=? ,
            nombre_revisions_avant_reforme=? ,
            fournisseur=?,
            delai_livraison_apres_commande_jours=?,
            mode_gestion_actuel=?,
            besoin_global_annuel=?
                WHERE sous_ensemble_id = ?
            `;

            const [result] = await pool.query(query, [
                sousEnsembleData.engin_id,
                sousEnsembleData.designation,
                sousEnsembleData.type_sous_ensemble,
                sousEnsembleData.quantite_installee,
                sousEnsembleData.sous_ensemble_relais_disponible,
                sousEnsembleData.sous_ensemble_en_attente_revision,
                sousEnsembleData.sous_ensemble_encours_revision,
                sousEnsembleData.corps_sous_ensembles_disponibles,
                sousEnsembleData.prix_sous_ensemble_neuf_DH,
                sousEnsembleData.duree_revision_jours,
                sousEnsembleData.cout_revision_MAD,
                sousEnsembleData.heures_marche_actuel,
                sousEnsembleData.heures_marche_cible,
                sousEnsembleData.heures_marche_annee,
                sousEnsembleData.nombre_revisions_avant_reforme,
                sousEnsembleData.fournisseur,
                sousEnsembleData.delai_livraison_apres_commande_jours,
                sousEnsembleData.mode_gestion_actuel,
                sousEnsembleData.besoin_global_annuel,
                id
            ]);

            if (result.affectedRows === 0) {
                throw new Error('Sous-ensemble not found');
            }

            return { id, ...sousEnsembleData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM sous_ensemble WHERE sous_ensemble_id = ?', [id]);

            if (result.affectedRows === 0) {
                throw new Error('Sous-ensemble not found');
            }

            return { id };
        } catch (error) {
            throw error;
        }
    }

    static async calculateDisponibilityRate(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const total = sousEnsemble.quantite_installee;
            const disponible = sousEnsemble.sous_ensemble_relais_disponible;

            if (total === 0) return 0;

            const rate = (disponible / total) * 100;
            return parseFloat(rate.toFixed(2)); // Retourne le taux avec 2 décimales
        } catch (error) {
            throw error;
        }
    }

    // Calcul du taux d'occupation des sous-ensembles en révision
    static async calculateRevisionOccupationRate(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const total = sousEnsemble.quantite_installee;
            const enRevision = sousEnsemble.sous_ensemble_encours_revision + sousEnsemble.sous_ensemble_relais_disponible + sousEnsemble.sous_ensemble_en_attente_revision;

            if (total === 0) return 0;

            const rate = (enRevision / total) * 100;
            return parseFloat(rate.toFixed(2));
        } catch (error) {
            throw error;
        }
    }

    static async getRevisionsPlanifiees() {
        const [rows] = await pool.query(`
    SELECT 
      sous_ensemble_id,
      engin_id,
      designation,
      heures_marche_actuel,
      heures_marche_cible,
      (heures_marche_cible - heures_marche_actuel) AS heures_restantes
    FROM 
      sous_ensemble
    WHERE 
      heures_marche_actuel + heures_marche_annee >= heures_marche_cible
    ORDER BY 
      heures_restantes ASC
  `);
        return rows;
    };

    static async genererPlanning() {
        const revisions = await this.getRevisionsPlanifiees();
        console.log(revisions);
        return revisions.map(rev => ({
            sous_ensemble: rev.designation,
            engin: rev.engin_id,
            date_prevue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +90 jours
            urgence: rev.heures_restantes < 200 ? 'Haute' : 'Moyenne'
        }));
    };

    // Calcul du coût total de maintenance prévisionnelle
    static async calculateTotalMaintenanceCost(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const revisionsAvantReforme = sousEnsemble.nombre_revisions_avant_reforme;
            const coutRevision = sousEnsemble.cout_revision_MAD;

            return revisionsAvantReforme * coutRevision;
        } catch (error) {
            throw error;
        }
    }

    // Calcul de la performance relative (moyenne vs cible)
    static async calculatePerformanceRatio(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const moyenne = sousEnsemble.performance_moyenne_SE_HM;
            const cible = Math.max(...sousEnsemble.performance_cible_HM.match(/\d+/g).map(Number));

            if (cible === 0) return 0;

            const ratio = (moyenne / cible) * 100;
            return parseFloat(ratio.toFixed(2));
        } catch (error) {
            throw error;
        }
    }

    // Estimation du temps avant prochaine révision
    static async estimateTimeToNextRevision(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const dureeRevision = sousEnsemble.duree_revision_jours;

            return {
                jours_revision: dureeRevision
            };
        } catch (error) {
            throw error;
        }
    }

    // Calcul du besoin en stock de sécurité
    static async calculateSafetyStockNeed(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const delaiLivraisonString = sousEnsemble.delai_livraison_apres_commande_jours; // ex: "90 à 180"
            const delaiLivraison = Math.max(...delaiLivraisonString.match(/\d+/g).map(Number));

            const besoinAnnuel = sousEnsemble.besoin_global_annuel;
            const joursOuvres = 250; // Approximation des jours ouvrés dans une année

            const consommationJournaliere = besoinAnnuel / joursOuvres;
            const stockSecurite = consommationJournaliere * delaiLivraison * 1.5; // Coefficient de sécurité de 1.5

            return Math.ceil(stockSecurite);
        } catch (error) {
            throw error;
        }
    }

    // Calcul du ROI (Return on Investment) pour l'achat d'un sous-ensemble neuf
    static async calculateROI(id) {
        try {
            const sousEnsemble = await this.findById(id);
            if (!sousEnsemble) {
                throw new Error('Sous-ensemble not found');
            }

            const prixNeuf = sousEnsemble.prix_sous_ensemble_neuf_DH;
            const dureeVieHeures = sousEnsemble.heures_marche_duree_vie;
            const performanceMoyenne = sousEnsemble.performance_moyenne_SE_HM;

            if (performanceMoyenne === 0) return 0;

            const dureeVieAnnees = dureeVieHeures / (24 * 365); // 2000 heures/an estimées
            const roiParAn = prixNeuf / dureeVieAnnees;

            return parseFloat(roiParAn.toFixed(2));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SousEnsemble;