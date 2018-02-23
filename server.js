const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./server/router');

// Get environment variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

// Initialize http server
const app = express();
const port = process.env.PORT;

// Static files
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Connect to MongoDB
mongoose.connect(process.env.DB_HOST);

// Get the routes
app.use('/api', router);

// 404 page
app.use((req, res) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// Run server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
