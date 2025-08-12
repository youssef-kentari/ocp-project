const pool = require('../config/db.config');

class Responsable {

    static async create(respo) {
        const { nom, email } = respo;
        try {
            const [rows] = await pool.query('INSERT INTO responsables (nom,email) VALUES (?,?)', [nom, email]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM responsables');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findEmailByName(name) {
        try {
            const [row] = await pool.query('SELECT email FROM responsables where nom =?', [name]);
            return row[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(name, respo) {
        const { nom, email } = respo;

        // Validate inputs
        if (!name || !nom || !email) {
            throw new Error('Missing required fields');
        }

        try {
            // Execute the update query
            const [result] = await pool.query(
                'UPDATE responsables SET email = ?, nom = ? WHERE nom = ?',
                [email, nom, name]
            );

            // Return whether the update was successful (affected rows > 0)
            return result.affectedRows > 0;

            // Alternatively, if you need the updated record:
            // const [rows] = await pool.query('SELECT * FROM responsables WHERE nom = ?', [nouvNom]);
            // return rows[0];
        } catch (error) {
            // Log the error for debugging
            console.error('Error updating responsable:', error);
            throw new Error('Failed to update responsable');
        }
    }

    static async delete(name) {
        try {
            const [row] = await pool.query('DELETE FROM responsables where nom =?', [name]);
            return row[0];
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Responsable;