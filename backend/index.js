const express = require('express');
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
    origin: ["https://mern-easeshop-ecommerce.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.post('/register', (req, res) =>{
    const (name, email, password) = req.body;
    RegisterModel.findOne({email:email})
    .then(user => {
        if(user){
            res.json("Already have an account!");
        }else{
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => result.json())
            .catch(err => err.json())
        }
    }).catch(err -> err.json())
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
