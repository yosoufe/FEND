// for async/await tests
import 'regenerator-runtime/runtime'

test('sentiment_analysis_get', async function(){
  var formHandler = require('./formHandler');
  await formHandler.sentiment_analysis_get("John is a fantastic engineer.");
});