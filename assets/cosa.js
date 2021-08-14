const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'timeline',
  password : 'password',
  database : 'timeline'
});

connection.connect();

function prueba() {
	
	
	console.log("hola");
	
	
}