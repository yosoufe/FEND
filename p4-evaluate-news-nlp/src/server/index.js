var path = require('path');
const express = require('express');
const mockAPIResponse = require('./js/mockAPI.js');
const aylien_wrapper = require('./js/aylien_wrapper');

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
})


/**
 * Expects a request like:
 * {
 *  text: "You are fantastic",
 *  mode: "tweet"
 * }
 */
app.get('/sentiment_text', async function (req, res) {
  // Create information for sending request to NLP API
  var input_text = req.text;
  var input_mode;
  if (mode in req) {
    input_mode = req.mode;
  } else {
    input_mode = 'tweet';
  };

  // request from the NLP API
  try {
    response = await aylien_wrapper.sentiment_analysis(input_text, input_mode);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
