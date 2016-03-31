'use strict'

// import './setting.mock.js#?ENV|mock'
if ( NODE_ENV === 'test' ) {
  require( './setting.mock.js' )
}

import AbstractResource from '../abstract.resource'
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'SettingResource'
} )
@Inject( '$http' )
class SettingResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'settings' )
  }
}

export default SettingResource
