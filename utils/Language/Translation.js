const axios = require("axios");
require('dotenv').config({ path: '/home/nullquasar/Coding/IA-Project/utils/.env' });
const APIKey = process.env.LANGKEY;

module.exports = async function(from, to, text) {
    const request_url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`;

    data = [{
        "Text": text
    }];

    return axios.post(request_url, data, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': APIKey,
            'Ocp-Apim-Subscription-Region': 'southcentralus'
        }
    })
    .then( response => {
        return response.data[0].translations[0].text;
    })
    .catch((err) => {
        return err;
    });
}
