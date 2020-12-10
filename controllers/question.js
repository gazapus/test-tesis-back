var Question = require('../models/question');

exports.find_all = (req, res) => {
    Question.find({}).sort({index: 1})
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || 'Error retrieving data'
            })
        })
}