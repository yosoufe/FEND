test('random test 1', function(){
  var some_object = {
    text: "There is some text"
  };

  expect('text' in some_object).toBe(true);
  expect('mode' in some_object).toBe(false);
})