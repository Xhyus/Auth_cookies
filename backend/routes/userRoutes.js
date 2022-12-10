const express = require('express');
const api = express.Router();
const statusController = require('../controllers/userController');
const auth = require('../middlewares/auth');

api.post('/user', statusController.createUser);
api.get('/users', statusController.getUsers);
api.get('/user/search/:id', statusController.getUser);
api.delete('/user/delete/:id', statusController.deleteUser);
api.post('/login', statusController.login);
api.get('/checkToken', auth.auth, statusController.checkToken);
api.get('/logout', auth.auth, statusController.logout);

module.exports = api;