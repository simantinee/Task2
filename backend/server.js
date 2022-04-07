const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb://simantinee:8270529350snj@cluster1-shard-00-00.vdcij.mongodb.net:27017,cluster1-shard-00-01.vdcij.mongodb.net:27017,cluster1-shard-00-02.vdcij.mongodb.net:27017/test?ssl=true&replicaSet=atlas-kciems-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});