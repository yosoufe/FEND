var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./js/mockAPI.js');
const aylien_wrapper = require('./js/aylien_wrapper');

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
 * Expects a request body of like:
 * {
 *  text: "You are fantastic",
 *  mode: "tweet"
 * }
 */
app.post('/sentiment_text', async function (req, res) {
  // Create information for sending request to NLP API
  var input_text = req.body.text;
  var input_mode;
  if ("mode" in req.body) {
    input_mode = req.body.mode;
  } else {
    input_mode = 'tweet';
  };

  var response2 = {
    "polarity": 'negative',
    "subjectivity": 'subjective',
    "text": 'This nanodegree is not describing everything very well. I am getting headache as a totally beginner',
    "polarity_confidence": 0.9668886661529541,
    "subjectivity_confidence": 1
  }

  // request from the NLP API
  try {
    var response = await aylien_wrapper.sentiment_analysis(input_text, input_mode);
    console.log(response);
    res.send(JSON.stringify(response));
  } catch (error) {
    // console.log(error);
    res.send(JSON.stringify(error));
  }
});
