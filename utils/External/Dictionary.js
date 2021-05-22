var axios = require("axios");
require('dotenv').config({ path: '/home/nullquasar/Coding/IA-Project/utils/.env' });

const my_app_id = process.env.OXFORD_ID;
const my_app_key = process.env.OXFORD_KEY;

module.exports = async function (lang, word) {

  const headers = {
    app_id: my_app_id,
    app_key: my_app_key
  };
  try {
    const {
    data
    } = await axios.get(
      "https://od-api.oxforddictionaries.com:443/api/v2/entries/" + lang + "/" + word,
      { headers }
    );

  return data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];

  }
  catch (error) {
    return error;
  }
}

