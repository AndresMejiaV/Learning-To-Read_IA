const axios = require("axios");
const parent_dir = require('path').resolve(__dirname, '..');
require('dotenv').config({ path: parent_dir + '/.env' });
const APIKey = process.env.CV_KEY;

module.exports = async function(fileUrl){


    data = {
        "url": fileUrl
    };

    function getText(opId) {
        let wholeText = "";
        let data;

        let headers = {
            'Ocp-Apim-Subscription-Key': APIKey,
        }

        // Get the data or return the error
        axios.get(opId, { headers })
        .then(response => {
            data = response.data.analyzeResult.readResults[0].lines;

            // Get the text of every sentence
            for (c = 0; c < data.length; c++) {
                // console.log(data[c]);
                wholeText += data[c].text + '\n';
            }

        })
       .catch(err => {
           console.log("Error when extracting text from file...");
       });

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
        return getText(response.headers['operation-location']);
    })
};
