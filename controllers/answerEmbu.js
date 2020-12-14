var AnswerEmbu = require('../models/answerEmbu');

exports.find_all = (req, res) => {
    AnswerEmbu.find({})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error retrieving data'
            })
        })
}

exports.find_one = (req, res) => {
    const id = req.params.id;
    AnswerEmbu.findById(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Not found answer with id " + id })
            }
        })
        .catch(err => {
            res.status(500).send({ mmessage: err.message || "Error retrieving answer with id=" + id })
        })
} 


exports.check = (req, res) => {
    const alias = req.params.alias;
    AnswerEmbu.find({alias: alias})
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Not found answer with alias " + alias })
            }
        })
        .catch(err => {
            res.status(500).send({ mmessage: err.message || "Error retrieving answer with alias=" + alias })
        })
} 

exports.create = (req, res) => {
    let newAnswer = new AnswerEmbu({
        alias: req.body.alias,
        answers: req.body.answers,
        results: req.body.results
    })
    newAnswer.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this answer'
            })
        })
}

exports.delete = (req, res) => {
    let id = req.params.id;
    AnswerEmbu.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.status(200).send({ message: 'Answer was deleted successfully' })
            } else {
                res.status(404).send({
                    message: `Cannot delete answer with id=${id}. Probably answer was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete answer with id=" + id })
        })
}

exports.delete_all = (req, res) => {
    AnswerEmbu.deleteMany({})
        .then(data => {
            res.status(200).send({ message: `${data.deletedCount} answers were deleted successfully` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing all answers" })
        })
}