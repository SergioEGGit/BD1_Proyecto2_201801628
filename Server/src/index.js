// Imports 
const Express = require('express');
const Cors = require('cors');
const Port = 9998;
const bodyParser = require('body-parser');
const Routes = require('./routes/routes');
const Application = Express();

// Uses App 
//enables cors
Application.use(bodyParser.json());
Application.use(bodyParser.urlencoded({
	
	extended: true,	
	
}));


const server = require('http').createServer(Application);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
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