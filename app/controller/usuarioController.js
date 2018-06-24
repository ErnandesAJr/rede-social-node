 var usuarioBD = require('../model/usuario');
 var postDB = require('../model/post.js');
 var bcrypt = require('bcrypt');
 let jwt = require('jsonwebtoken');

 module.exports.pegarTodosusuarios = function(req, res) {
     let promise = usuarioBD.find().exec();

     promise.then(
         function(usuarios) {
             res.status(200).json(usuarios);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };

 module.exports.getusuario = function(req, res) {
     let id = req.params.id;
     let promise = usuarioBD.findById(id).exec();

     promise.then(
         function(usuario) {
             if (usuario) {
                 res.status(200).json(usuario);
             } else {
                 res.status(404).send("usuario not found");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };

 module.exports.criarusuario = function(req, res) {

     let usuario = new usuarioBD({
         name: req.body.name,
         email: req.body.email,
         senha: bcrypt.hashSync(req.body.senha, 10)
     });

     let promise = usuarioBD.criar(usuario);

     promise.then(
         function(usuario) {

             res.status(201).json(usuario._id);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.atualizarusuario = function(req, res) {
     let token = req.headers['token'];
     let id = jwt.decode(token).usuario._id;

     let usuario = new usuarioBD({
         name: req.body.name,
         email: req.body.email,
         senha: bcrypt.hashSync(req.body.senha, 10),
         _id: req._id
     });

     let promise = usuarioBD.findByIdAndatualizar(id, req.body).exec();

     promise.then(
         function(usuario) {
             if (usuario) {
                 res.status(200).json(usuario.email);
             } else {
                 res.status(404).send("usuario not found");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.deletarUsuario = function(req, res) {
     let token = req.headers['token'];
     let id = jwt.decode(token).usuario._id;

     let promise = usuarioBD.findByIdAndRemove(id).exec();
     promise.then(
         function(usuario) {
             if (usuario) {
                 res.status(200).json(usuario.email);
             } else {
                 res.status(404).send("Usuario não encontrado");
             }
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };


 module.exports.pegarTodosPostsusuario = function(req, res) {
     let id = req.params.id;
     let promise = postDB.find({ "usuario": id }).exec();

     promise.then(
         function(posts) {
             res.status(200).json(posts);
         }
     ).catch(
         function(error) {
             res.status(500).json(error);
         }
     );
 };