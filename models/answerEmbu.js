let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    alias: String,
    answers: [{
        question: String,
        reverse: Boolean,
        selected: Number,
        dimension: String
    }],
    results: [{
        dimension: String,
        score: Number,
        scale: String,
    }]
},
    { timestamps: true }
);

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('AnswerEmbu', schema);