// models/engin.model.js
const pool = require('../config/db.config');

class Engin {
    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM engins');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM engins WHERE engin_id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(enginData) {
        try {
            const {
                designation,
                type_engin,
                modele,
                date_mise_en_service
            } = enginData;

            const query = `
                INSERT INTO engins (engin_id, designation, type_engin, modele, date_mise_en_service)
                VALUES (?, ?, ?, ?, ?)
            `;

            const [result] = await pool.query(query, [
                modele,
                designation,
                type_engin,
                modele,
                date_mise_en_service
            ]);
            
            return { id: result.insertId, ...enginData };
        } catch (error) {
            throw error;
        }
    }

    static async update(id, enginData) {
        try {
            const { designation, type_engin, modele, date_mise_en_service } = enginData;

            const query = `
                UPDATE engins
                SET designation = ?,
                    type_engin = ?,
                    modele = ?,
                    date_mise_en_service = ?
                WHERE engin_id = ?
            `;

            const [result] = await pool.query(query, [
                designation,
                type_engin,
                modele,
                date_mise_en_service,
                id
            ]);

            if (result.affectedRows === 0) {
                throw new Error('Engin not found');
            }
            
            return { id, ...enginData };
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query('DELETE FROM engins WHERE engin_id = ?', [id]);
            
            if (result.affectedRows === 0) {
                throw new Error('Engin not found');
            }
            
            return { id };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Engin;