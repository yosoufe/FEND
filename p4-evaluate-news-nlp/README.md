# Project Goals

The goal of this project is to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

Functionality wise, website does a sentiment analysis on text or a url, using [aylien api](https://aylien.com/) which does NLP on the cloud.

## Instructions

* Clone the repo and `cd` to this directory
* `npm install` to install required packages
* Setting up the API
  * Sign-up for an API key: First, you will need to go [here](https://developer.aylien.com/signup). Signing up will get you an API key. There is a trial version that you can use.
  
  * Create a `.env` file in this folder beside `package.json` file.
    ```
    touch .env
    ```
  * Grab the API ID and API Key from your account and save it in `.env` file like the following. Do not forget to keep these keys by yourself and do not share it with others and do not upload them on github.
    ```
    API_ID=<your api id>
    API_KEY=<your api key>
    ```
    We are using `dotenv` to read this file and use the aylien api.
* To build and run the server you may use the following command
  ```
  reset && npm run build-prod && printf "\n\nBUILD COMPLETE\n\n" && npm run start
  ```
  Now the website should be available on the port number that is shown on terminal.
* We are using `jest` as a unit test platform. You need the `.env` file for tests as well.