var usuarioBD = require('../model/usuario');
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
//TODO implementar a autenticação dos posts


module.exports.check = function(req, res, next) {
    let token = req.headers['token'];
    jwt.verify(token, 'secret',
        function(error, decoded) {
            if (error) {
                return res.status(401).json({
                    title: 'Não Autenticado',
                    error: error
                });
            }
            next();
        });
}


module.exports.login = function(req, res) {
    function login(usuario) {
        if (!bcrypt.compareSync(req.body.senha, usuario.senha)) {
            fail();

        } else {
            let token = jwt.sign({ usuario: usuario }, 'secret');
            res.status(200).json({
                mensagem: "Vai lá!",
                token: token,
                _id: usuario._id
            })
        }
    }

    function fail() {
        res.status(401).send('Invalid login!');
    }

    usuarioBD.findOne({ email: req.body.email }).exec().then(login, fail);
}