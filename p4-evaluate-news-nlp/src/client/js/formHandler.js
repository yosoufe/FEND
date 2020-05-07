async function handleSubmitText(event) {
  event.preventDefault();
  // check what text was put into the form field
  var formTextField = document.getElementById('input_string');
  if (!Client.validate_input_field(formTextField)){
    // wrong text
    return;
  }
  
  var formText = formTextField.value;
  var response = await sentiment_analysis_get(formText, 'text');
  document.getElementById('results').innerHTML = JSON.stringify(response);
}

async function handleSubmitUrl(event) {
  event.preventDefault();

  // check what text was put into the form field
  var formUrlField = document.getElementById('input_url')
  if (!Client.validate_input_field(formUrlField) ){
    // wrong url format
    return;
  }
  var formUrl = formUrlField.value;
  var response = await sentiment_analysis_get(formUrl, 'url');
  document.getElementById('results').innerHTML = JSON.stringify(response);
}


async function sentiment_analysis_get(input_text, input_type) {
  var base_url = "http://localhost:8080/sentiment_analysis";
  var data;
  if (input_type === 'url' || input_type === 'text'){
    data = {};
    data[input_type] = input_text;
  } else {
    throw TypeError("input_type should be url or text.");
  }
  var response;
  try{
    response = await fetch(base_url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    response = await response.json();
  } catch (error){
    console.warn(error);
  }
  return response;
}

export {
  handleSubmitText,
  handleSubmitUrl,
  sentiment_analysis_get
}
