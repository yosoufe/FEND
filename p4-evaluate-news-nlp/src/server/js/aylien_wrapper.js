const aylien = require("aylien_textapi");
require('dotenv').config();

// set aylien API credential
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

/**
 * Callback when request is done
 * 
 * @callback aylien_request_done_callback
 * @param {*} error - An error if happened otherwise null
 * @param {*} response - the response
 */

/**
 * @param {string} input_url - A url to classify
 * @param {aylien_request_done_callback} callback 
 */
function classify_url(input_url, callback) {
  textapi.classify({
    url: input_url
  }, callback);
}

/**
 * @param {string} input_text 
 * @param {aylien_request_done_callback} callback 
 */
function classify_text(input_text, callback) {
  textapi.classify({
    text: input_text
  }, callback);
}

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
 * @param {string} input_text The input text
 * @param {string} input_mode mode, `tweet` or `document`
 * @returns {Promise} that the resolve would have the response
 */
function sentiment_analysis(input_text, input_mode = 'tweet') {
  return new Promise((resolve, reject) => {
    textapi.sentiment({
      text: input_text,
      mode: input_mode
    }, (error, response) => {
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
  classify_url: classify_url,
  classify_text: classify_text,
  sentiment_analysis: sentiment_analysis
}