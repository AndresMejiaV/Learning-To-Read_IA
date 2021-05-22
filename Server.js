const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.set('port', 4000);

function logger(req, res, next) {
    console.log(`Received route: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}


app.use(logger);
app.use(express.static(path.join(__dirname, 'WebPage')));


app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
})




















// const server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.readFile('WebPage/Struct/index.html', function(error, data) {
//         if (error) {
//             res.writeHead(404);
//             res.write('Something went wrong when reading the web file!');
//         }
//         else {
//             res.write(data);
//         }
//         res.end()
//     })
// }).listen(port);

