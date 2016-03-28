'use strict'

// import './currency.mock.js#?ENV|mock'
if ( NODE_ENV === 'test' ) {
  require( './currency.mock.js' )
}

import AbstractResource from '../abstract-resource'
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'CurrencyResource'
} )
@Inject( '$http' )
class CurrencyResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'currencies' )
  }
}

export default CurrencyResource
