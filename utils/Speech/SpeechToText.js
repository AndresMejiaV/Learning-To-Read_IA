const axios = require("axios");
// require('dotenv').config({ path: `../${__dirname}/.env` });
// const ApiKey = process.env.TEXT_KEY;    


const request_url = 'https://southcentralus.tts.speech.microsoft.com/cognitiveservices/voices/list';

axios.get(request_url, {
    headers: {
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': "9f8839e9bd4e446c8d1bfad49bd6db72", 
    }
})
.then( response => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});



