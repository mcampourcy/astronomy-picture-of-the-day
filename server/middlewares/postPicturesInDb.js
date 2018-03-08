const Picture = require('../models/PictureModel');

const slugify = (text) => {
    return text.toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/-+/g, '-');
};

/**
 * Post the given pictures in database
 * @param req
 * @param res
 */
const postPicturesInDb = (req, res) => {
    const pictures = req.pictures;

    Promise.all(pictures.map(pic => {
        return new Promise((resolve, reject) => {
            pic.slug = slugify(pic.title);
            const picture = new Picture(pic);

            picture.save((error) => {
                if(error) {
                    reject(error);
                }
                resolve(picture);
            });
        })
    }))
    .then(res.json({'success':true, pictures}))
    .catch(error => console.log(error))
};

module.exports = postPicturesInDb;