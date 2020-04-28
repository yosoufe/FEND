# Intro
BUILD TOOLS allow developers to automate their process for handling `website assets`, saving them lots of time and headache.

Examples:
* Webpack
* Grunt and Gulp
* npm scripts
* ...

We create a set of rules for the build tool to follow, telling BUILD TOOL specifically how we want each type of asset handled, and then it follows our rules, takes all the assets and bundles them into a single large file, which has everything loading in the correct order and is much easier for us to deal with. Typically, files with names like bundle or main are the result of a build tool combining many assets into one.

Example of Webpack config file:
```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
       rules: [
          {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
          },
          {
                test: /\.html$/,
                use: [{ loader: "html-loader"}],
                },
                {
                    test: /\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                }
       ]
 },
  plugins: [
    new HtmlWebPackPlugin({
           template: "./src/html/index.html",
           filename: "./index.html",
    })
  ]
}
```

## Install webpack
```
npm i webpack webpack-cli
```

A webpack config file allows us to override default settings.

## To use webpack
add webpack script to `package.json` file in sections `"scripts"`: `"build":"webpack"`

## WebPack config file:
The first section is the entry:
* Webpack is going to make a map of our app assets and all of their dependencies, but it needs somewhere to start. The default location for the webpack entry point is `./src/index.js`
```js
const path = require(‘path’) 
const webpack = require('webpack')

module.exports = {
  // changing the default folder of entry
  // from here webpack starts to build the dependency tree
  entry: `./src/client/index.js`, 
};
```

## build now:
```
npm run build
```

`npm i -D @babel/core @babel/preset-env babel-loader` to install babel to make importing possible in client side (browser). `-D` stands for development dependency.

`.babelrc` file is needed as babel configuration. like:  `{ ‘presets’: ['@babel/preset-env'] }`

Now `import { checkForName } from './js/nameChecker'` cab be used to import es6 code as normal js. `checkForName` should have
been already exported like
```js
function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName }
```

`babel loader` needs to be added to `webpack.config.js` as a rule to get webpack to use babel like this:
```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // changing the default folder of entry
  // from here webpack starts to build the dependency tree
  entry: `./src/client/index.js`, 
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
```

To use the built code in scripts rather than source code:
```html
<script type="text/javascript" src="../../../dist/main.js"></script>
```

## About loaders
Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application.

Different Loaders: https://webpack.js.org/loaders/

We will visit a few more loaders later, but for now, just notice how they work. The `rules` array will contain all of our loaders, each loader specifies what types of files it will run on by running a regex matcher - in the case above we are looking for all .js files - the `$` at the end simply means that nothing comes after that.

## Plugins
While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

First the pluging needs to be installed via terminal
```
npm i -D html-webpack-plugin
```
and then the plugin needs to be added to webpack config file
```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // reference to plugin

module.exports = {
  // changing the default folder of entry
  // from here webpack starts to build the dependency tree
  entry: `./src/client/index.js`, 
  module: {
    rules: [
      {
        // loader to be able to use es6 in browser side
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins:[
    // plugin to copy html files into dist folder
    // it also adds the js file into the html file in the dis folder
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    })
  ]
};
```

## Build Mode:
One of the awesome features of webpack, is that it lets us apply configurations to our code based on the environment we are running. We can create a development environment (MODE in webpack) and run totally different loaders and plugins than we do for production mode.

Two way of setting mode:
* with CLI
* in config file by adding the `mode` section
```js
module.exports = {
  mode: 'production', // development, testing , ...
  // changing the default folder of entry
  // from here webpack starts to build the dependency tree
  entry: `./src/client/index.js`, 
  module: { ...
```

Second config file for separating development and production is easier.??

Now two different build commands are needed to use two separate config files in the `package.json` file like:
```json 
  "scripts": {
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack  --config webpack.dev.js"
  },
```

## Webpack dev server:
To create server for development only and it allows to run files and updates immediately. It is detecting and watching the changes on files. It can be executed by adding `--watch` to the cli like:
```
webpack --config webpack.dev.js --watch --info-verbosity verbose
```
Now webpack never exits and watches the files.

Cool but still need to refresh the browser to see the changes. To avoid that `webpack-dev-server` is coming to help.

First to install
```
npm i -D  webpack-dev-server
```

then adding to `package.json` file like this
```json 
  "scripts": {
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack-dev-server  --config webpack.dev.js --open"
  },
```
`--open` causes to open the webpage on browser by running the command.

## Clean plugin
By default, this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

```
npm i -D clean-webpack-plugin
```

to add to webpack config file
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```
and the following in the plugin section
```js
        new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })
```

## bundle analyzer
```
npm install --save-dev webpack-bundle-analyzer
```


# Sass
Sass is a better css.

Browser does not know Sass.

Sass docs: https://sass-lang.com/guide

## Sass Nesting
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

## Variables
css variables: https://css-tricks.com/css-custom-properties-theming/

sass variables:
```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

it becomes the following in css
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

## Ampersand
```scss
button.cta{
  &:hover{ //hovered button

  }
  &:visited{ // visited buttom

  }

  &.custom_class{ // button that is also custom class

  }
}
```

## WebPack and Sass
installing loader
```
npm i -D style-loader node-sass css-loader sass-loader
```

loader rule:
```js
{
  test: /\.scss$/,
  use: [ 'style-loader', 'css-loader', 'sass-loader' ]
}
```

`use` means there are bunch of loaders that are chained and input of one is the going to be passed to the other as input. **They run from right to left**.



There are three things you have to do to use webpack loaders. You have to:

1. install the loader
2. call the loader in the webpack config while targeting the correct file extensions
3. require the files in index.js

So, to fix that, let’s go to client/index.js.

Because of css-loader, we can add some lines like this:

```js
import './styles/resets.scss'
```

# Final Touches
About IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE

To fix we need to add `output` to webpack config file
```js
module.exports = {
  output: {
    libraryTarget: `var`,
    library: `Client`
  }
};
```
Now are js code is going to become a library called `Client`.

We need to export js file into client library by adding the following to `client/index.js`:
```js
export {
  checkForName,
  handleSubmit
}
```

Now the webserver works but `npm run starts` does not. Why? webpack-dev-server does not rebuild the `main.js` 