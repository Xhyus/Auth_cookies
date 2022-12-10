const express = require('express');
const api = express.Router();
const statusController = require('../controllers/userController');

api.post('/user', statusController.createUser);
api.get('/users', statusController.getUsers);
api.get('/user/search/:id', statusController.getUser);
api.delete('/user/delete/:id', statusController.deleteUser);
api.post('/user/login', statusController.login);

module.exports = api;