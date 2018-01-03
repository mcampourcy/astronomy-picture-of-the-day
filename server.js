const express = require('express');
var cors = require('cors')
const path = require('path');

const app = express();
app.use(cors({credentials: true, origin: true}));
const port = process.env.PORT || 3001;
// load the static folder for resources
app.use(express.static(path.join(__dirname + '/src/public/')));
// run server, redirect all route on index.html for express router
app.get('*', (req, res) => {
    // and returning the index.html file
    res.sendFile(path.join(__dirname + '/src/public/index.html'));
}).listen(port, () => {
    console.log(`Server on port ${port}`);
});
