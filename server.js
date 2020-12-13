const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const answerRoute = require('./routes/answer');
const answerEmbuRoute = require('./routes/answerEmbu');
const questionRoute = require('./routes/question');
const authRoutes = require('./routes/auth');
const headerMiddleware = require('./middleware/header');

//let mailRoutes = require('./routes/mail.route');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get('/', function (req, res) {
    res.send('Route test succefful');
});

app.use(headerMiddleware);
app.use('/api/answer', answerRoute);
app.use('/api/question', questionRoute);
app.use('/api/auth', authRoutes);
app.use('/api/answerEmbu', answerEmbuRoute);

app.get('*', function (req, res) {
    res.status(404).send({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});