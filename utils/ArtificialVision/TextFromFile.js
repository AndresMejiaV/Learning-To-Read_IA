const axios = require("axios");
const parent_dir = require('path').resolve(__dirname, '..');
require('dotenv').config({ path: parent_dir + '/.env' });
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
        return getText(response.headers.operationId);
    })
};
