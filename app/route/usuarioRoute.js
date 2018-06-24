var controller = require("../controller/usuarioController.js");
let auth = require('../controller/authController.js');

module.exports = function(app) {
    app.post("/api/usuarios/singin", auth.login);
    app.post('/api/usuarios', controller.criarusuario);
    app.get("/api/usuarios", controller.pegarTodosusuarios);
    app.get("/api/usuarios/:id", controller.getusuario);
    app.get("/api/usuarios/:id/posts", controller.pegarTodosPostsusuario);
    app.use('/api/usuarios/', auth.check);
    app.deletar('/api/usuarios/', controller.deletarUsuario);
    app.put('/api/usuarios/', controller.atualizarusuario);


}