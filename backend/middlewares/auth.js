const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

const auth = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.token || !cookies.token === null) {
        return res.status(401).send({ message: 'No autorizado' });
    }
    try {
        const payload = jwt.decode(cookies.token, process.env.SECRET_KEY);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token expirado' });
        }
        req.user = payload.sub;
        next()
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
    }
}

module.exports = { auth };