'use strict';

import {Config, Inject} from '../../decorators/decorators'

class OnConfigDev {
  @Config()
  @Inject( 'localStorageServiceProvider' )
  static configFactory( localStorageServiceProvider ) {
    // use "e-scheduling" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
    localStorageServiceProvider.setPrefix( 'rules-dev' )
  }
}
