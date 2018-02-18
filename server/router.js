import express from 'express';
import allPictures from './controllers/PictureController';
const router = express.Router();

router.get('/', allPictures);

export default router;