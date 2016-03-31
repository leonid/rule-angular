import 'angular'
import 'angular-mocks/angular-mocks'

// import * as main from './src/app/app'

let context = require.context('./src', true, /\.spec\.js/)
context.keys().forEach(context)
