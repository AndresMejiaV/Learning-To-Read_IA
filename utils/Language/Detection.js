const axios = require("axios");
require('dotenv').config({ path: '/home/nullquasar/Coding/IA-Project/utils/.env' });
const ApiKey = process.env.LANG_KEY;    

module.exports = async function(text) {
    data = [{
        "Text": text
    }];


    const request_url = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';

    return axios.post(request_url, data, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': ApiKey,
            'Ocp-Apim-Subscription-Region': 'southcentralus'
        }
    })
    .then( response => {
        return response.data[0].language;
    })
    .catch((err) => {
        return err;
    });
}


