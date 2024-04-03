const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(routes)

mongoose.connect('mongodb://localhost:27017/express-auth').then(() => {
    console.log('Connected to database');
    app.listen(3001, () => {
        console.log('Server is running on port 3000');
    })
}).catch((error) => {
    console.log(error);
})