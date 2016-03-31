'use strict';

// import './partner.mock.js#?ENV|mock';
import AbstractResource from '../abstract.resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'PartnerResource'
} )
@Inject( '$http' )
class PartnerResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'partners' );
  }
}

export default PartnerResource;
