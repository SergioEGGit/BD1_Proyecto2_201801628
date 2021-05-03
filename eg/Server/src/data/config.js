// Imports 
const MySql = require('mysql');

// Crear Credenciales Dd Conexión 
const Config = {
	
	host: '34.68.27.29',
	user: 'root',
	password: 'Intercan3',
	database: 'Proyecto_2',
	multipleStatements: true,
	
};

// Crear La Conexion 
const Pool = MySql.createPool(Config);


// Exportar Modulo 
module.exports = Pool;