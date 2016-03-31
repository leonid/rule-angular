'use strict'

// import './availability.mock.js?ENV|mock';
import AbstractResource from '../abstract.resource'
import {Service, Inject} from '../../../decorators/decorators'

if ( NODE_ENV === 'test' ) {
  require( './availability.mock.js' )
}

@Service( {
  serviceName: 'AvailabilityResource'
} )
@Inject( '$http' )
class AvailabilityResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'availabilities' )
  }
}

export default AvailabilityResource
