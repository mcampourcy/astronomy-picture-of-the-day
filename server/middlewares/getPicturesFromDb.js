const Picture = require('../models/PictureModel');

/**
 * Find all the recorded pictures in database
 * @param req
 * @param next
 */
const getPicturesFromDb = (req, next) => {

    new Promise(function(resolve, reject) {
        Picture.find().exec(function(err, pictures) {
            if(err) reject(err);
            resolve(pictures);
        });
    })
        .then(response => {
            req.pictures = response;
            next();
        });
};

module.exports = getPicturesFromDb;