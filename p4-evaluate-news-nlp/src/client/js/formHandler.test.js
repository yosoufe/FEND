// for async/await tests
import 'regenerator-runtime/runtime'

// needed just for tests.
global.fetch = require("node-fetch");


test('sentiment_analysis_get', async function(){
  var formHandler = require('./formHandler');
  var response = await formHandler.sentiment_analysis_get("John is a fantastic engineer.");
  console.log(response);
});