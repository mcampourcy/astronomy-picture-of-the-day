require('babel-register');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./app/router');
const path = require('path');

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL || 'mongodb://localhost:27017/pictures'}`);

// Initialize http server
const app = express();
const port = process.env.PORT || 3000;

// load the static folder for resources
app.use(express.static(path.join(__dirname + '/public/')));

// API endpoints
// app.use('/', router);

// run server, redirect all route on index.html for express router
app.get('*', (req, res) => {
    // and returning the index.html file
    res.sendFile(path.join(__dirname + '/public/index.html'));
}).listen(port, () => {
    console.log(`Server on port ${port}`);
});
