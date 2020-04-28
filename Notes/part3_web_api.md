# Node & Express Environment

## Node

Node.js is open source, cross-platform , java script server-side scripting environment that allows to execute code outside/inside of browser to create dynamic web page content.

* Download Page: https://nodejs.org/en/download/
* How to update: https://www.hostingadvice.com/how-to/update-node-js-latest-version/
* Installation: https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux
* file configuration: https://docs.npmjs.com/files/folders#tldr

to install globally
```
npm install -g package
```

to install in current folder
```
npm install package
```

To include a `body-parser`
```js
var bodyParser = require('body-parser')
```

Node invokes that `require()` function with a local file path as the function’s only argument.

## Express
To install
```
npm install express
```
* Framework for Node.js
* HTTP Requests & Routes
* Middleware


Using Express we set up an instance of our web app like this:
```js
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
```
* Docs: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
* Cross-origin resource sharing (CORS) 
  * https://en.wikipedia.org/wiki/Cross-origin_resource_sharing 
  * https://expressjs.com/en/resources/middleware/cors.html
* URL Encoding: 
  * https://en.wikipedia.org/wiki/Percent-encoding
  * https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
* Javascript Object Notation(JSON):
  * https://en.wikipedia.org/wiki/JSON
  * https://github.com/expressjs/body-parser#bodyparserjsonoptions


## Creating A Local Server With Node & Express
Local Server: Receive requests -> Process them -> Return a response

To create a route to pass data between parts of the app
```js
// Initialize the main project folder.
app.use(express.static('website')); // website is the name of the folder that has index.html

const port = 8000;
const server = app.listen(port, listening)

function listening(){
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
```

another way:
```js
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});
```

to run the server:
```
node <server_file>.js
```

docs:
* https://expressjs.com/
* https://expressjs.com/en/starter/hello-world.html


# HTTP Requests & Routes
* Routes handle requests
  * GET
  * POST


## Get Request
```js
var express = require('express')
var app = express()
var appData = {}

// respond with JS object when a GET request is made to the homepage
// created a route named `/all`
app.get('/all', function (req, res) {
  res.send(appData);
})
```
Routing Guide: https://expressjs.com/en/guide/routing.html

## POST Request
```js
const data = [];
// POST method route
app.post('/flavor', addFlavor);

function addFlavor (req, res) {
  data.push(req.body);
};
```
**using curl**
```
#GET:
curl http://localhost:3000/all

# POST:
curl --data "p1=v1" --data "p2=v2" http://localhost:3000/flavor
```


## Client side (browser):
```js
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

postData('/add', {answer:42});
```
When sending data to a web server, the data has to be a string. We can convert a JavaScript object into a string using the JavaScript method `JSON.stringify()`, which turns JavaScript objects and JSON data into a string for our server to receive the information.

```
{intelligence:100} -> 
let data = request.body; projectData["intelligence"]= data.intelligence;
```

Property accessors: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors


# Asynchronous JavaScript
Wait until time
```js 
setTimeout();
```

## Async Promises
You can think of Promises as a special function that either satisfy (resolve) or fail (reject) to execute a task, and then executes the corresponding actions, usually another task with the returned data in the case of 'resolved' and usually throw an error in the case of 'reject'.

```js
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});
```

### Example of Promises and Async 
Source: https://youtu.be/V_Kr9OSfDeU

```js
function makeRequest(location){
  return new Promise((resolve, request) => {
    console.log(`Making Request to ${location}`);
    if (location === 'Google'){
      resolve('Google says hi');
    } else {
      reject('We can only talk to Google');
    }
  });
}

function processRequest(response){
  return new Promise((resolve, reject) =>{
    console.log('Processing Resonse')
    resolve(`Extra Information + ${response}`);
  });
}
```

Pure Promise
```js
makeRequest('Google').then(response => {
  console.log('Response has been received');
  return processRequest(response);
}).then(processedResponse => {
  console.log(processedResponse);
}).catch(err => {
  console.log(err);
});
```

with async/await:
```js
async function doWork(){ // need to wrapt it in a async function
  try{
    let response = await makeRequest('Google'); // returns the resolved section instead of promise
    console.log('Response has been received');
    const processedResponse = await processRequest(response);
    console.log(processedResponse);
  } catch (err) {
    console.log(err);
  }
}
doWork()
```


```js
const postData = async ( url = '', data = {})=>{
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

postData('/addMovie', {movie:' the matrix', score: 5})
```

`postData` is an async arrow function that is called with parameters on the last line of code.It is asynchronous because of the keyword `async` placed before its parameters. Once you mark a function as `async` you have access to the keywords `await`, `try`, and `catch` which mirror the underlying Promise functionality of resolving or rejecting a condition-- here the condition is successfully making a POST request to the specified route. The await keyword is used in places where the next actions requires data from the current action so we want to tell our program to wait until the data has been received before continuing with the next steps.

More reads: https://developers.google.com/web/fundamentals/primers/promises https://web.dev/promises/

## Fetch in the code:


client code:
```js
let baseURL = 'http://api.animalinfo.org/data/?animal='
let apiKey = '&appid=9f15e45060...';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newAnimal =  document.getElementById('animal').value;
getAnimal(baseURL,newAnimal, apiKey)

}
const getAnimal = async (baseURL, animal, key)=>{

  const res = await fetch(baseURL+animal+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
```

Some More:
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

**Extra and better resource**: https://youtu.be/cuEtnrL9-H0
* Web API to send a GET, POST, DELETE, ... requests
* fetch returns a promise
* fetch does throw error if there is a problem with url, it always succeed expects if it cannot connect to internet
* No Option as second argument means getting data.
* Second argument is required for post, delete and ...
  * needs `method`, `headers`, `body` fields.
  * Data should be string of json as body.
```js
fetch('https://reres.in/api/users/23', {
  method: 'POST',
  headers: 'Content-Type': 'application/json',
  body: JSON.stringify({
    name: 'User 1'
  }
})
  .then(res => {
    if (res.ok){
      console.log('SUCCESS');
      return res.json();
    } else {
      console.lof('FAIL');
    }
  }) // res.json returns another promise
  .then(data => console.log(data))
  .catch(error => console.log('ERROR')); // 404 error NOT catched here
```

## Dynamic UI Updates
Here is what it would look like to use chained GET and POST requests to retrieve information from our animal Web API, and then update DOM elements accordingly:

```html
<label for="animal">Enter the name of your favorite animal</label>
<input id="animal" name="animal">
<textarea id="favorite" placeholder="Enter your favorite thing about your favorite animal" rows="9" cols="50"></textarea>
<button id = "generate">GO</button>
```

```js
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const newAnimal =  document.getElementById('animal').value;
  const favFact =  document.getElementById('favorite').value;

  getAnimal('/animalData',)
  // New Syntax!
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:favFact} );
  })
  .then(
    updateUI()
  )
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('animalName').innerHTML = allData[0].animal;
    document.getElementById('animalFact').innerHTML = allData[0].facts;
    document.getElementById('animalFav').innerHTML = allData[0].fav;

  }catch(error){
    console.log("error", error);
  }
}
```

Some of Server Side:
```js
app.post('/addAnimal', addAnimal);

function addAnimal(req,res){

  newEntry = {
    animal: req.body.animal,
    facts: req.body.fact,
    fav: req.body.fav
  }

  animalData.push(newEntry)
  console.log(animalData)
}
```