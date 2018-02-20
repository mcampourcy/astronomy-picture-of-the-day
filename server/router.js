import express from 'express';
import bodyParser from 'body-parser';
import { getAllPictures, postAllPictures } from './controllers/PictureController';
const router = express.Router();

let jsonParser = bodyParser.json();

router
    .get('/', getAllPictures)
    .post('/post/all/', jsonParser, postAllPictures);

export default router;