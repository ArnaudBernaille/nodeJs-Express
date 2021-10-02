const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = "localhost";
const port = "3000";

const app = express(); // permet de permet de parametrer toutes les requetes. Si je requete http://localhost:3000/fichierQuiExiste => va me le renvoyer, sinon va me renvoyer sur la page d'acceuil.
app.use(morgan('dev')); // Un nouveau middleware pour afficher des truc dans la console.
app.use(bodyParser.json()); // grace à cela req.body va contenir les données.


// Le .all nous sert a faire une généralité : peut importe la méthode on va pouvoir faire les trucs marqué dedans.
app.all('/dishes', (req,res,next)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next(); // On met next pour pouvoir passer d'autre fonction, par exemple pour get et post se sont celles que nous avons mis en dessous. 
}); // Lorsque l'on met un all, peut importe la méthode (get, post, put, delete) c'est ce code qui va être executé si on appel dishes.

app.get('/dishes', (req, res, next) => {
	res.end('We will send all the dished to you');
}); // Si on a une requete get, le all va d'abord être appelé puis celle là. C'est dû au next de la fonction all d'en haut mais je comprend pas bien. 

app.post('/dishes', (req, res, next) => {
	res.end('We will add informations to the dishes: ' + req.body.name + " with details : " + req.body.description + "et j'ai marqué un truc dans : " + req.body.tralala);
});

app.put('/dishes', (req, res, next) => {
	res.statusCode = 403;
	res.end('Put not supported in dishes');
});

app.delete('/dishes', (req, res, next) => {
	res.end('Deleting all the dishes');
});

app.get('/dishes/:dishId', (req, res, next) => {
	res.end('We will send details of the dish ' + req.params.dishId + ' to you');
}); // Si on a une requete get, le all va d'abord être appelé puis celle là. C'est dû au next de la fonction all d'en haut mais je comprend pas bien. 

app.post('/dishes/:dishId', (req, res, next) => {
	res.statusCode = 403;
	res.end('Post not supported in dishes on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
	res.write('Updating the dish ' + req.params.dishId);
	res.end('We will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
	res.end('Deleting dishes' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body> Bonjour je suis un server express. Que puis-je faire pour vous ? </body></html>');
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
	console.log("server running at http://${hostname}:${port}");
});











