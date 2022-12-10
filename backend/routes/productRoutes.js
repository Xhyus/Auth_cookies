const express = require('express');
const productController = require('../controllers/productController');
const api = express.Router();
const auth = require('../middlewares/auth');

api.post('/product', productController.createProduct);
api.get('/products', auth.auth, productController.getProducts);
api.delete('/product/delete/:id', productController.deleteProduct);
api.get('/product/search/:id', productController.getProduct);

module.exports = api