'use strict';

// import './position.mock.js#?ENV|mock';
import AbstractResource from '../abstract.resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'PositionResource'
} )
@Inject( '$http' )
class PositionResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'positions' );
  }
}

export default PositionResource;
