// for async/await tests
import 'regenerator-runtime/runtime'

// needed just for tests.
global.fetch = require("node-fetch");


test('client sentiment_analysis_get text', async function(){
  var formHandler = require('./formHandler');
  var response = await formHandler.sentiment_analysis_get("John is a fantastic engineer.", 'text');
  expect(Object.keys(response).length).not.toBe(0);
});

test('client sentiment_analysis_get url', async function(){
  var formHandler = require('./formHandler');
  var response = await formHandler.sentiment_analysis_get("https://levelup.gitconnected.com/different-ways-to-check-if-an-object-is-empty-in-javascript-e1252d1c0b34", 'url');
  expect(Object.keys(response).length).not.toBe(0);
});