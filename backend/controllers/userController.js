const User = require('../models/user');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/token');

const createUser = async (req, res) => {
    let { name, email } = req.body;
    email = email.toLowerCase();
    let password = await bcrypt.hash(req.body.password, 10);
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al crear el usuario' });
        }
        if (user) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).send({ message: 'Error al crear el usuario' });
            }
            return res.status(201).send(user);
        })
    })
}

const login = (req, res) => {
    console.log(req.body)
    let email = req.body.email
    email = email.toLowerCase();
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al iniciar sesión' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        bcrypt.compare(req.body.password, user.password, (err, check) => {
            if (err) {
                return res.status(400).send({ message: 'Error al iniciar sesión' });
            }
            if (!check) {
                return res.status(400).send({ message: 'La contraseña es incorrecta' });
            }
            res.cookie('token', createToken(user), { httpOnly: true })
            return res.status(200).send({ message: 'Inició sesión correctamente', token: createToken(user), user: user.name });
        })
    })
}

const checkToken = (req, res) => {
    return res.status(200).send({ message: 'Token válido' });
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Cerró sesión correctamente' });
}

const getUsers = async (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los usuarios' });
        }
        return res.status(200).send(user);
    })
}

const getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    User.findOneAndDelete(id, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar el usuario' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    login,
    checkToken,
    logout
}