// import mongoose from 'mongoose';
import Picture from '../models/PictureModel';

const allPictures = (req, res) => {
    Picture.find().exec((err, pictures) => {
        if(err){
            return res.json({'success': false, 'message':'No pictures'});
        }
        return res.json({'success':true, 'message':'Lot of pictures !', pictures});
    });
};

export default allPictures;