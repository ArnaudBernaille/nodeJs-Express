const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = "localhost";
const port = "3000";

const app = express(); // permet de permet de parametrer toutes les requetes. Si je requete http://localhost:3000/fichierQuiExiste => va me le renvoyer, sinon va me renvoyer sur la page d'acceuil.
app.use(morgan('dev')); // Un nouveau middleware pour afficher des truc dans la console.
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body> Bonjour je suis un server express. Que puis-je faire pour vous ? </body></html>');
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
	console.log("server running at http://${hostname}:${port}")
});