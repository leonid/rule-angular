'use strict'

import {Config, Inject} from '../../decorators/decorators'

class OnConfigProd {
  @Config()
  @Inject( '$compileProvider', '$httpProvider', 'localStorageServiceProvider' )
  static configFactory( $compileProvider, $httpProvider, localStorageServiceProvider ) {
    // use "rules" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
    localStorageServiceProvider.setPrefix( 'rules' )

    // disabling debug data to get better performance gain in production
    $compileProvider.debugInfoEnabled( false )
    // configure $http service to combine processing of multiple http responses received at
    // around the same time via $rootScope.$applyAsync to get better performance gain in production
    $httpProvider.useApplyAsync( true )
  }
}

export {OnConfigProd}
