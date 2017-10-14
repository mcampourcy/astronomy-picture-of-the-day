const express = require('express');
const path = require('path');

const app = express();
// load the static folder for resources
app.use(express.static(path.join(__dirname + '/build/')));
// run server, redirect all route on index.html for express router
app.get('*', (req, res) => {
    // and returning the index.html file
    res.sendFile(path.join(__dirname + '/build/index.html'));
}).listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});


// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('Hello Node.js!\n');
//     if ('host' in req.headers) {
//         var host = req.headers['host'];
//         res.write('Vhost is ' + host.split(':')[0] + '\n');
//     } else {
//         res.write('No vhost specified\n');
//     }
//     res.end();
// }).listen(process.env.PORT);