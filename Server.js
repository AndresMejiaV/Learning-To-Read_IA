// Server modules
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');

// Azure modules
const translate = require("./utils/Language/Translation.js")
const detect = require("./utils/Language/Detection.js");
const analyze = require("./utils/ArtificialVision/TextFromFile.js");
const dictionary = require("./utils/External/Dictionary.js");
const keyPhrases = require("./utils/TextAnalytics/KeyPhrases.js");


// Other
const helpers = require('./helpers');

// function callModule (func, args) {
//     // console.log(...args);
//     func(...args)
//     .then((value) => {
//         console.log(value);
//     })
//     .catch((err) => console.log(err));   
// }

LANG_CODE = "es";
function getDefaultLangCode() {
    // Code
}


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


// Other middlewares
app.use(logger);
// app.use(express.static(path.join(__dirname, 'utils')));



// Initialize web page
app.use(express.static(path.join(__dirname, 'WebPage')));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
})

// POST routes

// Analyze some img
app.post('/analyze-img', (req, res) => {

    var image = req.file;
    
    // let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('img-File');

    // upload(req, res, function(err) {
        
    //     console.log("Upload file");
    //     console.log("req: ", req);
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any

    //     if (req.fileValidationError) {
    //         console.log("File validation error");
    //         return res.send(req.fileValidationError);
    //     }
    //     else if (!req.file) {
    //         console.log("No file selected");
    //         return res.send('Please select an image to upload');
    //     }
    //     else if (err instanceof multer.MulterError) {
    //         console.log("Multer error");
    //         return res.send(err);
    //     }
    //     else if (err) {
    //         console.log("Something went wrong when uploading image file");
    //         return res.send(err);
    //     }

    //     image = req.file;
    //     // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    // });
    
    // If there is an image then process it with the azure module and send the text
    console.log(image);
    console.log(req);
    if (image != undefined) {

        // Image path to be getted by the img html element
        // res.send(image);

        analyze(image)
            .then((value) => {
                console.log(typeof(value));
                console.log("value: ", value);
                res.status(200).send(value);
            })
            .catch((err) => {
                console.log("POST analyze error: ", err);
                res.status(500);
            });
    }
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

    // TEST

    /* const data = {
        "word": "herramienta",
    };
    
    fetch("/oxford-dictionary", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
        .then(response => console.log("Response: ", response))
            .catch(console.log("Error when requesting /oxford-dictionary")); */

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

    // TEST

    /* const data = {
        "text": "Translation",
    };
    
    fetch("/translate", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
        .then(response => console.log("Response: ", response))
            .catch(console.log("Error when requesting /translate")); */

});





