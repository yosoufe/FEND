/* Global Variables */
const weather_api_cred = "4fb1238e12154c3f386c0f4f11e5d688";
const base_url = `http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weather_api_cred}&`

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* Fetch data from OpenWeatherMao */
async function fetch_weather_data(zip_code){
  const get_url = base_url + `zip=${zip_code},us`;
  try{
    fetched_data = await fetch(get_url);
    if (fetched_data.ok){
      const json_data = await fetched_data.json();
      res = json_data["main"];
      res["city"] = json_data["name"];
      return res;
    } else {
      console.warn('zip code does not exist');
    }
  } catch (err) {
    console.warn(err);
  }
  return null;
}

/* To POST the weather and user data to server */
const post_data_to_server = async (data = {}) => {
  const post_url = `/addData`;
  const response = await fetch(post_url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.warn(err);
  }
};

/* record user data */
function get_user_data(){
  let d = new Date();
  let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
  let users_feeling = document.getElementById('feelings').value;
  return {'date': newDate, 'user feeling': users_feeling};
}

/* get data from server */
async function retrieve_server_data(data){
  try{
    fetched_data = await fetch('/data');
    if (fetched_data.ok){
      const json_data = await fetched_data.json();
      return json_data;
    } else {
      console.warn('Problem in receiving data from server!');
    }
  } catch (err) {
    console.warn(err);
  }
  return null;
}

/* update the UI */
function update_ui(data){
  date_field = document.getElementById('date');
  temp_field = document.getElementById('temp');
  content_field = document.getElementById('content');

  date_field.textContent = data['date'];
  temp_field.textContent = data['weather data']['temp'];
  content_field.textContent = data['user feeling'];
}

/* Chain of get from OpenWeather and post to server asynchronously */
async function main(){
  zip_code = document.getElementById('zip').value;
  let weather_data = await fetch_weather_data(zip_code);
  if (weather_data != null){
    let user_data = get_user_data();
    let data_to_send_to_server = {
      'date': user_data['date'],
      'zip code': zip_code,
      'user feeling': user_data['user feeling'],
      'weather data': weather_data,
    }
    await post_data_to_server(data_to_send_to_server);
  }
  server_data = await retrieve_server_data();
  update_ui(server_data);
}



/* Get data from the weather map when `generate` button is clicked*/
generate_button = document.getElementById('generate');
generate_button.addEventListener('click', main);