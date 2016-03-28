'use strict'

// Modules
var webpack = require( 'webpack' )
var HtmlWebpackPlugin = require( 'html-webpack-plugin' )
var path = require( 'path' )

const PATHS = {
  src: path.join( __dirname, 'src' ),
  dist: path.join( __dirname, 'dist' )
}
var NODE_ENV = process.env.NODE_ENV || 'development'

/**
 *
 *
 * @returns {{}}
 */
function makeWebpackConfig( ) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */

  var DEV = NODE_ENV === 'development'
  var BUILD = NODE_ENV === 'production'
  var TEST = NODE_ENV === 'test'

  // console.log(DEV,BUILD,TEST)
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {}

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if ( TEST ) {
    config.entry = {}
  } else {
    config.entry = {
      build: path.join( PATHS.src, 'app/app' ),
      vendor: [
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap/dist/css/bootstrap-theme.min.css',
        'angular-strap/bower_components/bootstrap-additions/dist/bootstrap-additions.min.css',
        'angular-motion/dist/angular-motion.min.css',

        'd3/d3.min.js',

        'angular',
        'angular-ui-router',
        'angular-animate',

        'angular-strap/dist/angular-strap.min.js',
        'angular-strap/dist/angular-strap.tpl.min.js',
        'angular-schema-form/dist/schema-form.min.js'
        // 'angular-table/dist/angular-table.min.js'
      ]
    }
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if ( TEST ) {
    config.output = {}
  } else {
    config.output = {
      // Absolute output directory
      path: PATHS.dist,

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? '/' : 'http://localhost:8080/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
    }
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if ( TEST ) {
    config.devtool = 'inline-source-map'
  } else if ( BUILD ) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval'
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      include: PATHS.src,
      exclude: /node_modules/,
      loader: 'babel',
      query: {compact: false}
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|json|woff|woff2|ttf|eot)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version'
    }, {
      test: /\.styl$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version!stylus'
    }, {
      test: /\.(ico|jpe?g|gif|svg)$/i,
      loaders: [
        'file?name=[path][name]-[hash:7].[ext]&limit=6144',
        'image-webpack?bypassOnDebug&optimizationLevel=1&interlaced=false'
      ]

    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'html'
    }
    ],
    postLoaders: []
  }
  // if (TEST) {
  //   config.module.preLoaders.push( [
  //       {
  //         test: /\.js$/,
  //         loaders: ['eslint', 'jscs'],
  //         include: PATHS.src
  //       }
  //     ])
  // }

  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  if ( TEST ) {
    config.module.postLoaders.push( {
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'isparta-instrumenter'
    } )
  }
  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [

// Allow use of NODE_ENV and other variables in client code
    new webpack.DefinePlugin( {
      NODE_ENV: JSON.stringify( NODE_ENV ),
      LANG: '"ru"'
    } ),

    // Sort module indices by occurrence frequency
    new webpack.optimize.OccurenceOrderPlugin()
  ]

  // Skip rendering index.html in test mode
  if ( !TEST ) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin( {
        template: './src/index.html',
        inject: 'body',
        minify: {
          removeAttributeQuotes: true
        },
        favicon: 'src/favicon.ico'
      } ),
      new webpack.optimize.CommonsChunkPlugin( 'vendor', 'vendor-[hash:7].js' )
    )
  }

  // Add build specific plugins
  if ( BUILD ) {
    config.plugins.push(

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin( {
        compress: {
          warnings: false,
          unsafe: true
        },
        sourceMap: false
      } )
    )
  }

  config.resolve = {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      src: path.resolve( __dirname, './src' ),

      app: path.resolve( __dirname, './src/app' ),
      assets: path.resolve( __dirname, './src/assets' ),
      styles: path.resolve( __dirname, './src/assets/styles' ),
      images: path.resolve( __dirname, './src/assets/images' ),
      components: path.resolve( __dirname, './src/app/components' )
    }
  }

  config.resolveLoader = {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    root: path.join( __dirname, 'node_modules' )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   * modules: false,
   cached: false,
   colors: true,
   lazy: true,
   chunk: false,
   */
  config.devServer = {
    contentBase: PATHS.src,
    historyApiFallback: true,
    inline: true,
    progress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/classifier/*': 'http://127.0.0.1:18080',
      '/reglament/*': 'http://127.0.0.1:18080'
    },
    stats: {
      colors: true
    }
  }

  return config
}

module.exports = makeWebpackConfig()
