// Imports 
const Express = require('express');
const Cors = require('cors');
const Port = 9998;
const bodyParser = require('body-parser');
const Routes = require('./routes/routes');
const Application = Express();

// Uses App 
Application.use(Cors());
Application.use(bodyParser.json());
Application.use(bodyParser.urlencoded({
	
	extended: true,	
	
}));

// Add headers
Application.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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