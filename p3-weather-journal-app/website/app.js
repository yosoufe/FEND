/* Global Variables */
const weather_api_cred = "4fb1238e12154c3f386c0f4f11e5d688";
const base_url = `http://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weather_api_cred}&`

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
      await sleep(1000);
      return json_data;
    } else {
      console.warn('zip code does not exist');
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}


/* Get data from the weather map when `generate` button is clicked*/
generate_button = document.getElementById('generate');
generate_button.addEventListener('click', main);

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
  console.log(data);
  console.log(JSON.stringify(data));

  // try {
  //   const newData = await response.json();
  //   return newData;
  // } catch (err) {
  //   console.warn(err);
  // }
};


async function main(){
  zip_code = document.getElementById('zip').value;
  let weather_data = await fetch_weather_data(zip_code);
  await post_data_to_server(weather_data);
}