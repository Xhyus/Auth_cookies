import axios from 'axios';

const login = async (email, password) => {
    const response = await axios.post(`${process.env.servidor}/login`, {
        email,
        password
    });
    return response
}

const logout = async () => {
    const response = await axios.get(`${process.env.servidor}/logout`);
    return response
}

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.servidor}/checkToken`, { headers: { cookie: token } });
    return response
}

module.exports = {
    login,
    logout,
    checkToken
}