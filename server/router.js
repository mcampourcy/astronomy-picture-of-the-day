const express = require('express');
const bodyParser = require('body-parser');
const {getAllPictures, postAllPictures} = require('./controllers/PictureController');
const router = express.Router();

let jsonParser = bodyParser.json();

router
  .get('/', getAllPictures)
  .post('/post/all/', jsonParser, postAllPictures);

module.exports = router;