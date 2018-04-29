const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const context = path.resolve(__dirname);

module.exports = {
  context,

  entry: {
		all: ['babel-polyfill', 'jquery', './src/js/index.js', './src/scss/app.scss'],
		// pug: './webpack/pug.js',
		// images: './webpack/images.js',
  },
  
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
  },

  resolve: {
		alias: {
			jquery: path.resolve(context, 'node_modules/jquery/src/jquery.js'),
		},
  },
  
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: 'css/[name].css',
						},
					},
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};