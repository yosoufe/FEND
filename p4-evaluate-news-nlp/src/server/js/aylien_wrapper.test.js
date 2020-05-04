
// for async/await tests
import 'regenerator-runtime/runtime'
// import {sentiment_analysis} from './aylien_wrapper'
const aylien_wrapper =  require('./aylien_wrapper');

function init_aylien_wrapper_test() {
  return require('./aylien_wrapper');
}


test('test aylien_wrapper env variables', () => {
  const aylien_wrapper = init_aylien_wrapper_test();
  expect(process.env.API_ID).not.toBeUndefined();
  expect(process.env.API_KEY).not.toBeUndefined();
});


test('classify_url', function (done) {
  const aylien_wrapper = init_aylien_wrapper_test();
  aylien_wrapper.classify_url('http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile',
    function (error, response) {
      expect(error).toBe(null);
      expect(response).not.toBe(null);
      done(); // jest specific
    });
});

test('classify_text', function (done) {
  const aylien_wrapper = init_aylien_wrapper_test();
  aylien_wrapper.classify_text('You are a good boy!',
    function (error, response) {
      expect(error).toBe(null);
      expect(response).not.toBe(null);
      done(); // jest specific
    });
});

test('sentiment_analysis_text', async () => {
  //const aylien_wrapper = init_aylien_wrapper_test();
  console.log(require('./aylien_wrapper'));
  //var response = await aylien_wrapper.sentiment_analysis('John is a very good football player');
  //expect(response).not.toBe(null);
  //console.log(response);
});