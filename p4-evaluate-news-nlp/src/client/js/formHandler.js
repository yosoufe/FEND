async function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('input_string').value

  // console.log("::: Form Submitted :::")
  // fetch('http://localhost:8081/test')
  //   .then(res => res.json())
  //   .then(function (res) {
  //     document.getElementById('results').innerHTML = res.message
  //   })
  var response = await sentiment_analysis_get(formText);
  document.getElementById('results').innerHTML = JSON.stringify(response);
}

async function sentiment_analysis_get(input_text) {
  var base_url = "http://localhost:8081/sentiment_text";
  var data = {
    text: input_text
  }
  var response = await fetch(base_url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  response = await response.json();
  return response;
}

export {
  handleSubmit,
  sentiment_analysis_get
}
