import config from '../config'

console.log( config )



// process.exit( 0 );




import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfigDevelopment from '../build/webpack.config.development'
import webpackConfigProduction from '../build/webpack.config.production'

import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'

import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))


console.log('asdsadsadasdasd')
console.log( config.env)



let webpackConfig = webpackConfigDevelopment;
if( config.env === 'production' ){
  console.log('ppppppp');
  
  webpackConfig = webpackConfigProduction;
}


// process.exit(0);

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development' || config.env === 'production')   {
  console.log('aaaaa');
  //process.exit(0);

  
   console.log('-----')
    console.log('-----')

  const compiler = webpack(webpackConfig)

  console.log('aaaaa------1');

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output



  console.log('publicPath ----- ' +publicPath )


  //console.log( compiler )

 
  console.log('aaaaa------2');

  app.use(webpackDevMiddleware(compiler, publicPath))
  console.log('aaaaa------3');
  app.use(webpackHMRMiddleware(compiler))
  console.log('aaaaa------4');

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  //app.use(serve(paths.client('static')))
  app.use(serve('./src/static'))
  console.log('aaaaa------5');
} else {
  console.log('bbbb');
  process.exit(0);
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.dist()))
}

export default app
