import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './server/router';

// Initialize http server
const app = express();
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'bundle', 'public')));

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL || 'mongodb://localhost:27017/pictures'}`);

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
