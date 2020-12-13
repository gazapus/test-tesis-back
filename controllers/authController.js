const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
//const User = require('../models/user');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save()
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        })
}

exports.signin = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (passwordIsValid) {
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 14400 // 4 hours
                });
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    accessToken: token
                });
            } else {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        })
}

exports.authorizedAccess = (req, res) => {
    res.status(200).send("OK");
};