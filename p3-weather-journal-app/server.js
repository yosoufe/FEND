// Setup empty JS object to act as endpoint for all routes
var projectData = [];


// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening(){
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

app.get('/data', function(req,res){
  res.send(projectData);
  console.log(`GET Received, resp: ${JSON.stringify(projectData)}.`);
});

app.post('/addData', function(req, res){
  projectData.push(req.body);
  console.log(projectData);
  // res.send("Hi there\n");
});