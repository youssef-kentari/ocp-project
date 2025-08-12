const pool = require('../config/db.config');

class Operation {
    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM operation');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findAllOperationsType() {
        try {
            const [operations] = await pool.query('SELECT DISTINCT type_operation FROM operation');
            return operations;
        } catch (error) {
            throw error;
        }
    }

    static async findAllDescription() {
        try {
            const [operations] = await pool.query('SELECT DISTINCT description FROM operation');
            return operations;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM operation WHERE operation_id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findIdByDescription(description) {
        try {
            const [rows] = await pool.query(
                'SELECT operation_id FROM operation WHERE description = ?',
                [description]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findSEbyOperation(operation_id) {
        try {
            const [rows] = await pool.query(
                'SELECT sous_ensemble_id FROM operation WHERE operation_id = ?',
                [operation_id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }


    static async findBySousEnsembleId(sousEnsembleId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM operation WHERE sous_ensemble_id = ?',
                [sousEnsembleId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async create(operationData) {
        try {
            const { sous_ensemble_id, type_operation, description, atelier } = operationData;

            const [result] = await pool.query(
                `INSERT INTO operation 
                (sous_ensemble_id, type_operation, description, atelier)
                VALUES (?, ?, ?, ?)`,
                [sous_ensemble_id, type_operation, description, atelier]
            );

            return {
                operation_id: result.insertId,
                ...operationData
            };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, operationData) {
        try {
            const { sous_ensemble_id, type_operation, description, atelier } = operationData;

            const [result] = await pool.query(
                `UPDATE operation
                SET sous_ensemble_id = ?,
                    type_operation = ?,
                    description = ?,
                    atelier = ?
                WHERE operation_id = ?`,
                [sous_ensemble_id, type_operation, description, atelier, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Operation not found');
            }

            return { operation_id: id, ...operationData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM operation WHERE operation_id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Operation not found');
            }

            return { operation_id: id };
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Operation;