var controller = require("../controller/postController.js");
let auth = require('../controller/authController.js');

module.exports = function(app) {
    app.get("/api/posts", controller.pegarTodosPosts);
    app.get("/api/posts/:id", controller.getPost);
    app.get("/api/posts/:id/usuario", controller.getusuarioPost);
    app.use('/api/posts/', auth.check);
    app.post('/api/posts', controller.criarPost);
    app.put('/api/posts/:id', controller.atualizarPost);
    app.deletar('/api/posts/:id', controller.deletarPost);
}