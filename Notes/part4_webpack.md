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

