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

# Install webpack
```
npm i webpack webpack-cli
```