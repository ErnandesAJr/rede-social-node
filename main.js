var http = require('http');
var app = require('./config/express.js')();
var db = require('./config/database.js');

http.criarServer(app).listen(app.get('port'), function() {
    console.log('Servidor rodando lindamente');
});

db('mongodb://localhost:27017/GameOver');