var postDB = require('../model/post.js');
var usuarioBD = require('../model/usuario');
let jwt = require('jsonwebtoken');


module.exports.criarPost = function(req, res) {
    let token = req.headers['token'];
    let usuario_id = jwt.decode(token).usuario._id;

    let post = new postDB({
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: usuario_id
    });

    let promise = postDB.criar(post);

    promise.then(
        function(post) {
            res.status(201).json(post);
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.getPost = function(req, res) {
    let id = req.params.id;
    let promise = postDB.findById(id).exec();

    promise.then(
        function(posts) {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).send("Post não encontrado");
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};

module.exports.pegarTodosPosts = function(req, res) {
    let promise = postDB.find().exec();

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

module.exports.atualizarPost = function(req, res) {
    let token = req.headers['token'];
    let usuario_id = jwt.decode(token).usuario._id;

    let id = req.params.id;

    let post = new postDB({
        texto: req.body.texto,
        likes: req.body.likes,
        usuario: usuario_id,
        _id: req._id
    });

    let promise = postDB.findByIdAndUpdate(id, req.body).exec();

    promise.then(
        function(post) {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).send("Post not found");
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.deletarPost = function(req, res) {
    let token = req.headers['token'];
    let usuario_id = jwt.decode(token).usuario._id;

    let id = req.params.id;
    let promise = postDB.findByIdAndRemove(id).exec();

    promise.then(
        function(post) {
            if (post) {
                if (usuario_id != post.usuario) {
                    res.status(401).send('Not Authenticated for');
                } else {
                    res.status(200).json(post);
                }
            } else {
                res.status(404).send("Post not found")
            }
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};


module.exports.getusuarioPost = function(req, res) {
    let id = req.params.id;
    let promise = usuarioBD.findById(id).exec();

    promise.then(
        function(usuario) {
            res.status(200).json(usuario);
        }
    ).catch(
        function(error) {
            res.status(500).json(error);
        }
    );
};