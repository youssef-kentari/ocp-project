const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'mysql-server',
  port: 3306,
  user: 'root',
  password: '0000',
  database: 'ocp_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création du pool de connexions MySQL
const pool = mysql.createPool(dbConfig);

// Exporter le pool pour une utilisation ailleurs dans votre app
module.exports = pool;
