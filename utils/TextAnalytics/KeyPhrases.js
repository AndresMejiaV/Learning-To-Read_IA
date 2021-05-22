const axios = require("axios");
require('dotenv').config({ path: '/home/nullquasar/Coding/IA-Project/utils/.env' });
const ApiKey = process.env.TEXT_KEY;    

module.exports = async function( langCode, text ) {
    data = 
    {
        "documents": [
            {
                "language": langCode,
                "id": "1",
                "text": text,
            },
        ]    
    };


    const request_url = 'https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/KeyPhrases';

    return axios.post(request_url, data, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': ApiKey,        }
    })
    .then( response => {
        return response.data.documents[0].keyPhrases;
    })
    .catch((err) => {
        return err;
    });
}


