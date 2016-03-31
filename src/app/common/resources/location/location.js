'use strict';

// import './location.mock.js#?ENV|mock';
import AbstractResource from '../abstract.resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'LocationResource'
} )
@Inject( '$http' )
class LocationResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'locations' );
  }
}

export default LocationResource;
