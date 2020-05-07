
// for async/await tests
import 'regenerator-runtime/runtime'

function init_aylien_wrapper_test() {
  return require('./aylien_wrapper');
}

test('test aylien_wrapper env variables', () => {
  const aylien_wrapper = init_aylien_wrapper_test();
  expect(process.env.API_ID).not.toBeUndefined();
  expect(process.env.API_KEY).not.toBeUndefined();
});

test('server sentiment_analysis text', async () => {
  const aylien_wrapper = init_aylien_wrapper_test();
  var data = {
    text: "some text",
    mode: "tweet" 
  }
  var response = await aylien_wrapper.sentiment_analysis(data);
  expect(response).not.toBe(null);
  console.log(response);
});

test('server sentiment_analysis url', async () => {
  const aylien_wrapper = init_aylien_wrapper_test();
  var data = {
    url: "https://docs.aylien.com/textapi/endpoints/#traversing-taxonomies"
  }
  var response = await aylien_wrapper.sentiment_analysis(data);
  expect(response).not.toBe(null);
  console.log(response);
});