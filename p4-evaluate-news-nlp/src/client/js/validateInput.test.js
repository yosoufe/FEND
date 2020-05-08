'use strict';

// test code that interact with DOM
// https://jestjs.io/docs/en/tutorial-jquery
test("validate url", function(){

  // prepare a mock DOM and require the function under test.
  document.body.innerHTML =
    `<div>
      <label id="input_url_label" for="input_url"></label>
      <input id="input_url" type="url" name="input" value="" placeholder="Enter URL">
    </div>`;

  const validateInput = require('./validateInput');
  const validate_input_field = validateInput.validate_input_field;
  var url_input_element = document.getElementById('input_url');

  // main test
  url_input_element.value = "https://jestjs.io/docs/en/tutorial-jquery";
  expect(validate_input_field(url_input_element)).toBe(true);
  url_input_element.value = "";
  expect(validate_input_field(url_input_element)).toBe(false);
  url_input_element.value = "Some text that is not url";
  expect(validate_input_field(url_input_element)).toBe(false);
})