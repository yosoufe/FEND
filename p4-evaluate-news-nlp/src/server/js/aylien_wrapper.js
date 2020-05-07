const aylien = require("aylien_textapi");
require('dotenv').config();

// set aylien API credential
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});


/**
 * Sentiment analyse.
 * 
 * Example response:
 * {
 *   polarity: 'positive',
 *   subjectivity: 'subjective',
 *   text: 'John is a very good football player',
 *   polarity_confidence: 0.9824022650718689,
 *   subjectivity_confidence: 0.9963778207617525
 * }
 * 
 * input data should look in one of these forms
 * {
 *  text: "some text",
 *  mode: "tweet" or "document" // This is optional field, default is tweet
 * }
 * 
 * or
 * {
 *  url: "https://docs.aylien.com/textapi/endpoints/#traversing-taxonomies"
 * }
 * 
 * @param {object} data The input data
 * @returns {Promise} that the resolve would have the response
 */
function sentiment_analysis(data) {
  return new Promise((resolve, reject) => {
    textapi.sentiment(data, (error, response) => {
      if (error === null) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  })
}

// https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
module.exports = {
  textapi: textapi,
  sentiment_analysis: sentiment_analysis
}