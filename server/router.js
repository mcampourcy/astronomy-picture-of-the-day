const express = require('express');
const router = express.Router();
const { getPicturesFromApi, getPicturesFromDb, postAllPictures } = require('./middlewares');

/**
 * On load, get the pictures from database
 * If the last Db picture is old, get the new ones from Nasa's Api
 * else, just send the data to the view
 */
router.get('/', function (req, res, next) {

    // First, we get all the pictures stored in the database
    getPicturesFromDb(req, next);

}, function (req, res, next) {

    const pictures  = req.pictures;
    const today     = new Date();
    let start;

    if(pictures.length > 0) {
        // Get the date of the newer picture in database
        const lastDayInDb = new Date(pictures.slice(-1)[0].date);
        // The start date for Nasa's Api will be the picture's date +1
        start = new Date(lastDayInDb.setDate(lastDayInDb.getDate()) +1);
    } else {
        // If the database has no pictures,
        // get all the pictures of the last month
        const date = new Date();
        start = new Date(date.setDate(date.getDate() - 25));
    }

    if(start !== today) {
        // If the last Db picture is old, get the new ones
        getPicturesFromApi(start, today, req, res, next, pictures);
    } else {
        // Else, send data to the view
        res.json({'success':true, pictures})
    }

}, function (req, res) {

    // Finally, if we have some new pictures from Nasa's Api
    // send them in database
    postAllPictures(req, res);

});

module.exports = router;