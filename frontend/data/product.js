import axios from 'axios';

const getProducts = async (token) => {
    const response = await axios.get(`${process.env.servidor}/products`, { headers: { cookie: token } });
    return response
}

const createProduct = async (name, price) => {
    const response = await axios.post(`${process.env.servidor}/product`, {
        name,
        price
    });
    return response
}

const getOneProduct = async (id) => {
    const response = await axios.get(`${process.env.servidor}/product/search/${id}`);
    return response
}

module.exports = {
    getProducts,
    createProduct,
    getOneProduct
}