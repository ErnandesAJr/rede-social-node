var mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conected in ' + uri);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Disconected in ' + uri);
    });
    mongoose.connection.on('error', function(erro) {
        console.log('Mongoose! Conection error: ' + erro);
    });
    mongoose.set('debug', true);
}