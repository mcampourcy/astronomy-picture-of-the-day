import Picture from '../models/PictureModel';

const getAllPictures = (req, res) => {
    Picture.find().exec((err, pictures) => {
        if(err){
            return res.json({'success': false, 'message':'No pictures'});
        }
        return res.json({'success':true, 'message':'Lot of pictures !', pictures});
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
    picture.save((err) => {
        if (err)
            res.send(err);
        res.json({ message: 'Picture successfully added!' });
    });
};

export { getAllPictures, postAllPictures };