// Server modules
const fs = require('fs');
const express = require('express');
const path = require('path');
var busboy = require('connect-busboy'); //middleware for form/file upload

// Azure modules
const translate = require("./utils/Language/Translation.js")
const detect = require("./utils/Language/Detection.js");
const analyze = require("./utils/ArtificialVision/TextFromFile.js");
const dictionary = require("./utils/External/Dictionary.js");
const keyPhrases = require("./utils/TextAnalytics/KeyPhrases.js");


// Default language: spanish
LANG_CODE = 'es';

// App
const app = express();

// Default web app port
app.set('port', 4000);


// Log every route visited by the client
function logger(req, res, next) {
    console.log(`Received route: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}


// Middlewares http requests
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(busboy());


// Other middlewares
app.use(logger);
// app.use(express.static(path.join(__dirname, 'utils')));



// Initialize web page
app.use(express.static(path.join(__dirname, 'WebPage')));


// Init server
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
})

// POST routes


// Analyze some img
app.post('/analyze-img-local', (req, res) => {

    var fstream;
    var image;
    var fileName;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        fileName = filename;

        //Path where image will be uploaded
        fstream = fs.createWriteStream(path.join(__dirname, '/WebPage/uploads', filename ) );
        file.pipe(fstream);
        fstream.on('close', function () {    
            console.log("Upload Finished of " + filename);        
            // res.redirect('back');
        });

        fileName = path.join(__dirname, '/WebPage/uploads', fileName );
        console.log("File path: ", fileName);

        // image = fs.readFile(path.join(__dirname, '/WebPage/uploads', fileName ), function (err, data) {
        //     if (err) throw err;
        //     // return data;
        //     analyze(data)
        //     .then((value) => {
        //         console.log(typeof(value));
        //         console.log("value: ", value);
        //         res.status(200).send(value);
        //     })
        //     .catch((err) => {
        //         console.log("POST analyze error: ", err);
        //         res.status(500);
        //     });

        analyze(fileName)
            .then((value) => {
                console.log(typeof(value));
                console.log("value: ", value);
                res.status(200).send(value);
            })
            .catch((err) => {
                console.log("POST analyze error: ", err);
                res.status(500);
            });

        });
});

app.post('/analyze-img-remote', (req, res) => {

    let data = req.body;
    console.log("Data: ", data);
    
    analyze(data.url)
        .then((value) => {
            console.log(typeof(value));
            console.log("value: ", value);
            res.status(200).send(value);
        })
        .catch((err) => {
            console.log("POST analyze error: ", err);
            res.status(500);
        });
});


// Extract key phrases from paragraph
app.post('/key-phrases', (req, res) => {
    let data = req.body

    console.log(data);
    keyPhrases("es", data.text)
    .then((value) => {
        // Send processed data to front end
        console.log("Response: ", value);
        res.status(200).send(value);

    })
    .catch((err) => {
        console.log("Error: ", err);
        res.status(500);
    });

});


// Search and define words
app.post('/oxford-dictionary', (req, res) => {
    let data = req.body
    console.log("Data: ", data);
    
    dictionary(LANG_CODE, data.word)
    .then(response => {
        console.log("Response: ", response);
        res.status(200).send(response);
    })
    .catch( res.status(500) );

});


// // Detect language
// app.post('/detect-lang', (req, res) => {
//     let data = req.body



//     console.log(data);
//     // res.send(response_from_azure)
//     res.sendStatus(200);
// });


// Translate text
app.post('/translate', (req, res) => {
    let data = req.body
    console.log("Data: ", data);

    // Detect text, translate it and send the result
    detect(data.text)
    .then(response => {
        console.log("Detect response: ", response)
        translate(response, LANG_CODE, data.text)
        .then(result => {
            console.log("Translate response: ", result);
            res.status(200).send(result);
        })
    })
    .catch(err => res.status(500));

});





