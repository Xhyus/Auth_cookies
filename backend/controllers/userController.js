const User = require('../models/user');

const createUser = async (req, res) => {

}

const login = (req, res) => {

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
    login
}