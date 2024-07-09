const express = require('express');
const UserModel = require('./Models/User');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(cors({
    origin: "https://mern-easeshop-ecommerce.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ message: "Already have an account!" });
            } else {
                UserModel.create({ name: name, email: email, password: password })
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message });
                    });
            }
        }).catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
