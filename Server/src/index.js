// Imports 
const Express = require('express');
const Cors = require('cors');
const Port = 9998;
const bodyParser = require('body-parser');
const Routes = require('./routes/routes');
const Application = Express();

// Uses App 
//enables cors
Application.use(Cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
Application.use(bodyParser.json());
Application.use(bodyParser.urlencoded({
	
	extended: true,	
	
}));


// Ejectuar Routes 
Routes(Application);

// Iniciar Servidor 
const Server = Application.listen(Port, (Error) => {
	
	// Si Hay Algun Error 
	if(Error) {
		
		// Retornar Error 
		return console.log(`Error: ${Error}`);
		
	} 
	else 
	{
		
		console.log(`Servidor Escuchando En Puerto ${Server.address().port}`);
		
	}
	
});