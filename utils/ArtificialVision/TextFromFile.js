const axios = require("axios");
require('dotenv').config({ path: '/home/nullquasar/Coding/IA-Project/utils/.env' });
const APIKey = process.env.CV_KEY;

module.exports = async function(fileUrl){


    data = {
        "url": fileUrl
    };

    async function getText(opId) {
        let wholeText = "";

        let headers = {
            'Ocp-Apim-Subscription-Key': APIKey,
        }

        // Get the data or return the error
        try {
            let { response } = await axios.get(opId, { headers });
            response = response.analyzeResult.readResults[0].lines;
        }
        catch (error) {
            return error;
        }

        // Get the text of every sentence
        for (c = 0; c < data.length; c++) {
            wholeText += data[c].text + '\n';
        }


        return wholeText;
    }

    const service = 'https://serviciovisionnorte.cognitiveservices.azure.com/vision/v3.2/read/analyze?language=es&readingOrder=natural';
    return axios.post(service, data, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': APIKey,
        }
    })
    .then( response => {
        // return getText(response.headers.operationId);
        return response.headers.date;
    })
};







// const axios = require('axios');
// const service = 'https://serviciovisionnorte.cognitiveservices.azure.com/vision/v3.2/read/analyze?language=es&readingOrder=natural';

// data = {
//     "url": "https://www.befunky.com/images/prismic/8da559ded89273e3a6988584baeb4790bb767282_landing-text-editor-4.png?auto=webp&format=jpg&width=863&bg-color=F8F8F8"
// };

// function getText(opId) {
//     let wholeText = "";

//     axios.get(opId)
//     .then( response => {
//         let data = response.analyzeResult.readResults[0].lines;
//         for (c = 0; c < data.length; c++) {
//             wholeText += data[c].text + '\n';
//         }
//     });

//     return wholeText;
// }

// function makeRequest() {
    
//     axios.post(service, data, {
//         headers: {
//             'Content-type': 'application/json',
//             'Ocp-Apim-Subscription-Key': '9f8839e9bd4e446c8d1bfad49bd6db72',
//         }
//     })
//     .then( response => {
//         console.log(response.headers);
//         return getText(response.headers.opeationId); // Not operationId :(
//     })
//     .catch((err) => {
//         return err;
//     });
// }


// console.log(makeRequest());
// makeRequest();
