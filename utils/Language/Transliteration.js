const axios = require("axios");
const parent_dir = require('path').resolve(__dirname, '..');
require('dotenv').config({ path: parent_dir + '/.env' });
const ApiKey = process.env.LANG_KEY;

module.exports = async function(lang, fromScript, toScript, text) {
    const request_url = `https://api.cognitive.microsofttranslator.com/transliterate?api-version=3.0&language=${lang}&fromScript=${fromScript}&toScript=${toScript}`;

    body = [
        {"Text": text}
    ];
    
    
    return axios.post(request_url, body, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': ApiKey,
            'Ocp-Apim-Subscription-Region': 'southcentralus',
            'Content-Length': 1,
        }
    })
    .then( response => {
        return response.data[0].text;
    })
    .catch((err) => {
        console.log(err);
    });
}