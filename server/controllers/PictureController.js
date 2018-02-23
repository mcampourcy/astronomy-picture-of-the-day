const Picture = require('../models/PictureModel');

const getAllPictures = (req, res) => {
  Picture.find().exec(function(err, pictures) {
    if(err){
      return res.json({'success': false});
    }
    return res.json({'success':true, pictures});
  });
};

const postAllPictures = (req, res) => {
  const picture = new Picture();
  picture.copyright = req.body.copyright;
  picture.date = req.body.date;
  picture.explanation = req.body.explanation;
  picture.hdurl = req.body.hdurl;
  picture.media_type = req.body.media_type;
  picture.title = req.body.title;
  picture.url = req.body.url;
  picture.slug = slugify(req.body.title);

  picture.save((err) => {
    if (err)
      res.send(err);
    res.json({ message: 'Picture successfully added!' });
  });
};

const slugify = (text) => {
    return text.toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/-+/g, '-');
};

module.exports = {getAllPictures, postAllPictures};