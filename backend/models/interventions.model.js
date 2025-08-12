const pool = require('../config/db.config');

module.exports = {
    // CRUD Basique
    async create(interventionData) {
        const { operation_id, date_planifiee, statut, type_intervention, responsable, notes } = interventionData;

        const [result] = await pool.query(
            `INSERT INTO intervention 
            (operation_id, date_planifiee, statut, type_intervention, responsable, notes) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [operation_id, date_planifiee, statut, type_intervention, responsable, notes]
        );

        return result;
    },

    async findAll() {
        const [interventions] = await pool.query('SELECT * FROM intervention');
        return interventions;
    },

    async findById(id) {
        const [intervention] = await pool.query(
            'SELECT * FROM intervention i JOIN operation o ON o.operation_id = i.operation_id WHERE intervention_id = ?',
            [id]
        );
        return intervention[0] || null;
    },

    async findByOperationId(operationId) {
        const [interventions] = await pool.query(
            'SELECT * FROM intervention WHERE operation_id = ?',
            [operationId]
        );
        return interventions;
    },

    async findBySousEnsemble(designation) {
        try {
            const [interventions] = await pool.query(`
      SELECT 
        se.designation, 
        o.description, 
        o.atelier, 
        i.date_planifiee, 
        i.statut, 
        i.type_intervention, 
        i.responsable, 
        i.notes
      FROM 
        sous_ensemble se
      JOIN 
        operation o ON se.sous_ensemble_id = o.sous_ensemble_id
      JOIN 
        intervention i ON o.operation_id = i.operation_id
      WHERE 
        se.designation like ?
    `, [designation]);

            return interventions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async findByOperation(operation) {
        try {
            const [interventions] = await pool.query(`
      SELECT 
        o.description, 
        o.atelier, 
        i.date_planifiee, 
        i.statut, 
        i.type_intervention, 
        i.responsable, 
        i.notes
      FROM 
        operation o 
      JOIN 
        intervention i ON o.operation_id = i.operation_id
      WHERE 
        o.type_operation like ?
    `, [operation]);

            return interventions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


    async findByResponsable(respo) {
        const [interventions] = await pool.query('SELECT * FROM intervention WHERE LOWER(TRIM(responsable)) = LOWER(TRIM(?))', [respo]);
        return interventions;
    },

    async findByStatus(statut) {
        const [interventions] = await pool.query('SELECT * FROM intervention WHERE statut = ?', [statut]);
        return interventions;
    },

    async findAllStatus() {
        const [status] = await pool.query('SELECT DISTINCT statut FROM intervention');
        return status;
    },

    async findAllResponsables() {
        const [responsables] = await pool.query('SELECT DISTINCT responsable FROM intervention');
        return responsables;
    },

    async update(id, interventionData) {
        const [result] = await pool.query(
            'UPDATE intervention SET ? WHERE intervention_id = ?',
            [interventionData, id]
        );
        return result;
    },

    async updateStatut(id, statut) {
        const [result] = await pool.query(
            'UPDATE intervention SET statut = ? WHERE intervention_id = ?',
            [statut, id]
        );
        return result;
    },

    async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM intervention WHERE intervention_id = ?',
            [id]
        );
        return result;
    },

    // Méthodes statistiques
    async getStatsByStatus() {
        const [stats] = await pool.query(`
            SELECT statut, COUNT(*) as count 
            FROM intervention 
            GROUP BY statut
            ORDER BY count DESC
        `);
        return stats;
    },

    async getByTimePeriod(period) {
        if (period === 'month') {
            query = `
            SELECT DATE_FORMAT(date_planifiee, '%Y-%m') as period, 
                   COUNT(*) as count
            FROM intervention
            GROUP BY period
            ORDER BY period
        `;
        }

        else if (period === 'week') {
            query = `
                SELECT YEAR(date_planifiee) as year, 
                       WEEK(date_planifiee) as week, 
                       COUNT(*) as count
                FROM intervention
                GROUP BY year, week
                ORDER BY year, week
            `;
        } else if (period === 'year') {
            query = `
                SELECT YEAR(date_planifiee) as year, 
                       COUNT(*) as count
                FROM intervention
                GROUP BY year
                ORDER BY year
            `;
        }

        const [results] = await pool.query(query);
        return results;
    },

    async getAverageCompletionTime() {
        const [result] = await pool.query(`
            SELECT AVG(DATEDIFF(date_livraison, date_planifiee)) as avg_days
            FROM intervention
            WHERE date_livraison IS NOT NULL
        `);
        return { average_completion_days: result[0].avg_days || 0 };
    },

    async getResponsibleWorkload() {
        const [workload] = await pool.query(`
            SELECT responsable, 
                   COUNT(*) as total_interventions,
                   SUM(CASE WHEN statut = 'En cours' THEN 1 ELSE 0 END) as in_progress,
                   SUM(CASE WHEN statut = 'Terminé' THEN 1 ELSE 0 END) as completed
            FROM intervention
            WHERE responsable IS NOT NULL
            GROUP BY responsable
            ORDER BY total_interventions DESC
        `);
        return workload;
    },

    async getTypesDistribution() {
        const [distribution] = await pool.query(`
            SELECT type_intervention, 
                   COUNT(*) as count,
                   ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM intervention), 2) as percentage
            FROM intervention
            WHERE type_intervention IS NOT NULL
            GROUP BY type_intervention
            ORDER BY count DESC
        `);
        return distribution;
    }
};