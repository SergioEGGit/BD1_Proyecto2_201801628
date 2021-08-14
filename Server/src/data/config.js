// Imports 
const MySql = require('mysql');

// Crear Credenciales Dd Conexión 
const Config = {
	
	host: 'host-ip',
	user: 'user',
	password: 'password',
	database: 'Databasename',
	multipleStatements: true,
	
};

// Crear La Conexion 
const Pool = MySql.createPool(Config);


// Exportar Modulo 
module.exports = Pool;