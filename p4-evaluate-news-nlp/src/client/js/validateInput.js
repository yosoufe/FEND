function validate_input_field(input_text_element){
  var isValid = (input_text_element.validity.valid && input_text_element.value != "");
  if (!isValid){
    show_input_error(input_text_element);
  }
  return isValid;
}

function show_input_error(input_text_element){
  var selector_text = `${input_text_element.id}_label`;
  var label_element = document.getElementById(selector_text);
  if (input_text_element.id == 'input_string'){
    label_element.innerHTML = "* Invalid Text";
  }else if (input_text_element.id == 'input_url'){
    label_element.innerHTML = "* Invalid URL";
  } 
  setTimeout(function(){ label_element.innerHTML=""; }, 1000);
}

export {
  validate_input_field
}